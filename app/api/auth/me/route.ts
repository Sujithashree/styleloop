import { currentUser } from "@/app/lib/auth";
import { publicUser } from "@/app/lib/store";
export async function GET() { const user = await currentUser(); return Response.json({ user: user ? publicUser(user) : null }); }
