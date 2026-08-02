import { z } from "zod";
import { createSession } from "@/app/lib/auth";
import { badRequest, serverError } from "@/app/lib/api";
import { hashPassword, id, mutate, publicUser } from "@/app/lib/store";

const schema = z.object({ name: z.string().trim().min(2).max(50), email: z.email().trim().toLowerCase(), password: z.string().min(8).max(100) });
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json()); if (!parsed.success) return badRequest(parsed.error.issues[0]?.message ?? "Invalid details");
    const { name, email, password } = parsed.data;
    const result = await mutate(async (store) => {
      if (store.users.some((user) => user.email === email)) return null;
      const user = { id: id("user"), name, email, passwordHash: await hashPassword(password), bio: "Fashion enthusiast and StyleLoop creator.", createdAt: new Date().toISOString() };
      store.users.push(user); return user;
    });
    if (!result) return badRequest("An account with this email already exists.", 409);
    await createSession(result.id); return Response.json({ user: publicUser(result) }, { status: 201 });
  } catch { return serverError(); }
}
