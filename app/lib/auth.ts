import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { id, mutate, query, type User } from "./store";

const cookieName = "styleloop_session";
export async function currentUser(): Promise<User | null> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  return query((store) => store.users.find((user) => user.id === store.sessions[token]) ?? null);
}
export async function requireUser() { const user = await currentUser(); if (!user) redirect("/login"); return user; }
export async function createSession(userId: string) {
  const token = id("session");
  await mutate((store) => { store.sessions[token] = userId; });
  (await cookies()).set(cookieName, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 30, path: "/" });
}
export async function destroySession() {
  const jar = await cookies(); const token = jar.get(cookieName)?.value;
  if (token) await mutate((store) => { delete store.sessions[token]; });
  jar.delete(cookieName);
}
