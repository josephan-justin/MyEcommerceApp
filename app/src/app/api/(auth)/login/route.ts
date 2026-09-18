import { comparePassword } from "@/servers/helpers/bcrypt";
import { CustomError } from "@/servers/helpers/customError";
import {
  BadRequestError,
  UnauthorizedError,
} from "@/servers/helpers/errorHandler";
import { signToken } from "@/servers/helpers/jwt";
import User from "@/servers/models/User";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email) throw new BadRequestError("email is required");
    if (!body.password) throw new BadRequestError("password is required");
    const user = await User.where("email", body.email).first();
    if (!user) throw new UnauthorizedError("Invalid email or password");

    const isPasswordValid = comparePassword(body.password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedError("Invalid email or password");

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = signToken(payload);
    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: token,
    });

    return Response.json({ message: "Login success" }, { status: 200 });
  } catch (error: unknown) {
    const { message, status } = CustomError(error);

    return Response.json({ message }, { status });
  }
}
