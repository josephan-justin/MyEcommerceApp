import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies()

    cookieStore.delete("access_token")
    return Response.json(
        {message: "Logout Success"},
        {status: 200}
    )
}