import { z } from "zod";
import { currentUser } from "@/app/lib/auth";
import { badRequest } from "@/app/lib/api";
import { id, mutate } from "@/app/lib/store";
const schema = z.object({ body: z.string().trim().min(1).max(300) });
export async function POST(request: Request, context: RouteContext<"/api/posts/[id]/comments">) { const user = await currentUser(); if (!user) return badRequest("Please log in to comment.", 401); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return badRequest("Comment cannot be empty."); const { id: postId } = await context.params; const comment = await mutate((store) => { const post = store.posts.find((value) => value.id === postId); if (!post) return null; const value = { id: id("comment"), authorId: user.id, body: parsed.data.body, createdAt: new Date().toISOString() }; post.comments.push(value); return { ...value, author: { id: user.id, name: user.name } }; }); return comment ? Response.json({ comment }, { status: 201 }) : badRequest("Post not found.", 404); }
