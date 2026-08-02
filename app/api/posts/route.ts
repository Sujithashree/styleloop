import { z } from "zod";
import { currentUser } from "@/app/lib/auth";
import { badRequest, serverError } from "@/app/lib/api";
import { id, mutate, query } from "@/app/lib/store";

const schema = z.object({ caption: z.string().trim().min(3).max(600), image: z.string().max(3_000_000).optional(), tags: z.array(z.string().trim().min(1).max(30)).max(8).default([]) });
const format = (post: Awaited<ReturnType<typeof query>> extends never ? never : any, users: any[], viewerId?: string) => ({
  ...post,
  author: users.find((user) => user.id === post.authorId),
  comments: post.comments.map((comment: any) => ({ ...comment, author: users.find((user) => user.id === comment.authorId) })),
  likeCount: post.likes.length,
  commentCount: post.comments.length,
  saved: viewerId ? false : false,
});
export async function GET(request: Request) {
  const viewer = await currentUser();
  const following = new URL(request.url).searchParams.get("feed") === "following";
  const data = await query((store) => {
    const followed = store.follows[viewer?.id ?? ""] ?? [];
    const posts = store.posts.filter((post) => !following || (viewer && (post.authorId === viewer.id || followed.includes(post.authorId))));
    return posts.slice().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((post) => ({ ...format(post, store.users, viewer?.id), saved: (store.savedPosts[viewer?.id ?? ""] ?? []).includes(post.id) }));
  });
  return Response.json({ posts: data, authenticated: Boolean(viewer) });
}
export async function POST(request: Request) {
  try { const user = await currentUser(); if (!user) return badRequest("Please log in to post.", 401); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return badRequest(parsed.error.issues[0]?.message ?? "Invalid post");
    const post = await mutate((store) => { const value = { id: id("post"), authorId: user.id, ...parsed.data, createdAt: new Date().toISOString(), likes: [], comments: [] }; store.posts.push(value); return format(value, store.users); }); return Response.json({ post }, { status: 201 });
  } catch { return serverError(); }
}
