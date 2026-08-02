import { currentUser } from "@/app/lib/auth";
import { badRequest } from "@/app/lib/api";
import { mutate } from "@/app/lib/store";
export async function POST(_request: Request, context: RouteContext<"/api/posts/[id]/like">) { const user = await currentUser(); if (!user) return badRequest("Please log in to like posts.", 401); const { id } = await context.params; const post = await mutate((store) => { const item = store.posts.find((value) => value.id === id); if (!item) return null; item.likes = item.likes.includes(user.id) ? item.likes.filter((value) => value !== user.id) : [...item.likes, user.id]; return item; }); return post ? Response.json({ likes: post.likes.length, liked: post.likes.includes(user.id) }) : badRequest("Post not found.", 404); }
