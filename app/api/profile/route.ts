import { z } from "zod";
import { currentUser } from "@/app/lib/auth";
import { badRequest } from "@/app/lib/api";
import { mutate, publicUser, query } from "@/app/lib/store";
const schema = z.object({ name: z.string().trim().min(2).max(50), bio: z.string().trim().max(180), avatar: z.string().max(3_000_000).optional() });
export async function GET() { const user = await currentUser(); if (!user) return badRequest("Please log in.", 401); const profile = await query((store) => ({ user: publicUser(user), posts: store.posts.filter((post) => post.authorId === user.id), savedPostIds: store.savedPosts[user.id] ?? [], orders: store.orders.filter((order) => order.userId === user.id), products: store.products.filter((product) => product.sellerId === user.id) })); return Response.json(profile); }
export async function PATCH(request: Request) { const user = await currentUser(); if (!user) return badRequest("Please log in.", 401); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return badRequest(parsed.error.issues[0]?.message ?? "Invalid profile"); const updated = await mutate((store) => { const item = store.users.find((value) => value.id === user.id)!; Object.assign(item, parsed.data); return publicUser(item); }); return Response.json({ user: updated }); }
