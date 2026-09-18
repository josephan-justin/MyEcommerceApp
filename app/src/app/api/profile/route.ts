import { cookies } from "next/headers";
import { verifyToken } from "@/servers/helpers/jwt";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("access_token")?.value;

    if (!token) {
      return Response.json({ authenticated: false }, { status: 401 });
    }

    const payload = verifyToken(token);

    return Response.json({
      authenticated: true,
      user: payload,
    });
  } catch (error) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
}
