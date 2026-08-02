import { z } from "zod";
import { currentUser } from "@/app/lib/auth";
import { badRequest, serverError } from "@/app/lib/api";
import { id, mutate, query } from "@/app/lib/store";
const schema = z.object({ title: z.string().trim().min(3).max(80), description: z.string().trim().min(8).max(500), price: z.coerce.number().positive().max(999999), category: z.string().trim().min(2).max(40), image: z.string().max(3_000_000).optional() });
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const search = params.get("q")?.trim().toLowerCase() ?? "";
  const category = params.get("category")?.trim().toLowerCase() ?? "";
  const maxPrice = Number(params.get("maxPrice"));
  const sort = params.get("sort") ?? "newest";
  const products = await query((store) => store.products
    .filter((product) => !search || `${product.title} ${product.description}`.toLowerCase().includes(search))
    .filter((product) => !category || product.category.toLowerCase() === category)
    .filter((product) => !Number.isFinite(maxPrice) || maxPrice <= 0 || product.price <= maxPrice)
    .sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : b.createdAt.localeCompare(a.createdAt))
    .map((product) => ({ ...product, seller: store.users.find((user) => user.id === product.sellerId && { id: user.id, name: user.name, avatar: user.avatar }) })));
  return Response.json({ products });
}
export async function POST(request: Request) { try { const user = await currentUser(); if (!user) return badRequest("Please log in to sell.", 401); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return badRequest(parsed.error.issues[0]?.message ?? "Invalid product"); const product = await mutate((store) => { const value = { id: id("product"), sellerId: user.id, ...parsed.data, createdAt: new Date().toISOString() }; store.products.push(value); return value; }); return Response.json({ product }, { status: 201 }); } catch { return serverError(); } }
