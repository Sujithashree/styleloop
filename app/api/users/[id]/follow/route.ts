import { currentUser } from "@/app/lib/auth";
import { badRequest } from "@/app/lib/api";
import { mutate } from "@/app/lib/store";

export async function POST(_request: Request, context: RouteContext<"/api/users/[id]/follow">) {
  const user = await currentUser();
  if (!user) return badRequest("Please log in to follow creators.", 401);
  const { id } = await context.params;
  if (id === user.id) return badRequest("You cannot follow yourself.");
  const following = await mutate((store) => {
    if (!store.users.some((item) => item.id === id)) return null;
    const entries = store.follows[user.id] ?? [];
    store.follows[user.id] = entries.includes(id) ? entries.filter((userId) => userId !== id) : [...entries, id];
    return store.follows[user.id].includes(id);
  });
  return following === null ? badRequest("Creator not found.", 404) : Response.json({ following });
}
