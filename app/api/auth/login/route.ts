import { z } from "zod";
import { createSession } from "@/app/lib/auth";
import { badRequest, serverError } from "@/app/lib/api";
import { publicUser, query, verifyPassword } from "@/app/lib/store";

const schema = z.object({ email: z.email().trim().toLowerCase(), password: z.string().min(1) });
export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json()); if (!parsed.success) return badRequest("Enter a valid email and password.");
    const user = await query((store) => store.users.find((item) => item.email === parsed.data.email));
    if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) return badRequest("Incorrect email or password.", 401);
    await createSession(user.id); return Response.json({ user: publicUser(user) });
  } catch { return serverError(); }
}
