import "server-only";

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
export type User = { id: string; name: string; email: string; passwordHash: string; bio: string; avatar?: string; createdAt: string };
export type Post = { id: string; authorId: string; caption: string; image?: string; tags: string[]; createdAt: string; likes: string[]; comments: { id: string; authorId: string; body: string; createdAt: string }[] };
export type Product = { id: string; sellerId: string; title: string; description: string; price: number; image?: string; category: string; createdAt: string };
export type CartItem = { productId: string; quantity: number };
export type Order = { id: string; userId: string; items: CartItem[]; total: number; status: "paid" | "pending"; createdAt: string };

type Store = { users: User[]; posts: Post[]; products: Product[]; carts: Record<string, CartItem[]>; orders: Order[]; sessions: Record<string, string>; follows: Record<string, string[]>; savedPosts: Record<string, string[]> };

const seed: Store = {
  users: [
    { id: "maya", name: "Maya Chen", email: "maya@styleloop.local", passwordHash: "", bio: "Minimal looks, maximal confidence.", createdAt: "2026-01-10T00:00:00.000Z" },
    { id: "arjun", name: "Arjun Rao", email: "arjun@styleloop.local", passwordHash: "", bio: "Tailoring and everyday essentials.", createdAt: "2026-01-12T00:00:00.000Z" },
  ],
  posts: [
    { id: "post-maya", authorId: "maya", caption: "Weekend coffee look: warm neutrals and a soft oversized layer.", tags: ["neutral", "weekend", "women"], createdAt: "2026-07-20T09:00:00.000Z", likes: [], comments: [] },
    { id: "post-arjun", authorId: "arjun", caption: "Modern formal essentials that work from meetings to evenings.", tags: ["formal", "men", "minimal"], createdAt: "2026-07-19T09:00:00.000Z", likes: [], comments: [] },
  ],
  products: [
    { id: "product-1", sellerId: "maya", title: "Linen blend blazer", description: "A relaxed, breathable blazer for everyday layering.", price: 2899, category: "Outerwear", createdAt: "2026-07-18T00:00:00.000Z" },
    { id: "product-2", sellerId: "arjun", title: "Classic pleated trousers", description: "A versatile high-waist tailored trouser.", price: 2199, category: "Bottoms", createdAt: "2026-07-18T00:00:00.000Z" },
  ],
  carts: {}, orders: [], sessions: {}, follows: {}, savedPosts: {},
};

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.");
  return { url: url.replace(/\/$/, ""), key };
}

async function supabase(pathname: string, init?: RequestInit) {
  const { url, key } = config();
  const response = await fetch(`${url}${pathname}`, { ...init, headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...init?.headers }, cache: "no-store" });
  if (!response.ok) throw new Error(`Supabase request failed (${response.status}): ${await response.text()}`);
  return response;
}

async function readStore(): Promise<Store> {
  const response = await supabase("/rest/v1/styleloop_state?id=eq.true&select=state&limit=1");
  const rows = (await response.json()) as { state: Store }[];
  if (rows[0]?.state) return rows[0].state;
  await writeStore(structuredClone(seed));
  return structuredClone(seed);
}

async function writeStore(store: Store) {
  await supabase("/rest/v1/rpc/replace_styleloop_state", { method: "POST", body: JSON.stringify({ next_state: store }) });
}

export async function query<T>(fn: (store: Store) => T | Promise<T>) { return fn(await readStore()); }
export async function mutate<T>(fn: (store: Store) => T | Promise<T>) { const store = await readStore(); const result = await fn(store); await writeStore(store); return result; }
export const id = (prefix: string) => `${prefix}_${randomBytes(10).toString("hex")}`;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}
export async function verifyPassword(password: string, saved: string) {
  if (!saved.includes(":")) return false;
  const [salt, hex] = saved.split(":"); const expected = Buffer.from(hex, "hex");
  const actual = (await scrypt(password, salt, 64)) as Buffer;
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
export const publicUser = (user: User) => ({ id: user.id, name: user.name, email: user.email, bio: user.bio, avatar: user.avatar, createdAt: user.createdAt });
