import { currentUser } from "@/app/lib/auth";
import { badRequest } from "@/app/lib/api";
import { mutate } from "@/app/lib/store";

export async function POST(_request: Request, context: RouteContext<"/api/posts/[id]/save">) {
  const user = await currentUser();
  if (!user) return badRequest("Please log in to save looks.", 401);
  const { id } = await context.params;
  const saved = await mutate((store) => {
    if (!store.posts.some((post) => post.id === id)) return null;
    const entries = store.savedPosts[user.id] ?? [];
    store.savedPosts[user.id] = entries.includes(id) ? entries.filter((postId) => postId !== id) : [...entries, id];
    return store.savedPosts[user.id].includes(id);
  });
  return saved === null ? badRequest("Post not found.", 404) : Response.json({ saved });
}
