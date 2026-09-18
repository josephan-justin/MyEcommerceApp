import { hashPassword } from "@/servers/helpers/bcrypt";
import { CustomError } from "@/servers/helpers/customError";
import { BadRequestError } from "@/servers/helpers/errorHandler";
import User, { userSchema } from "@/servers/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    userSchema.parse(body);
    const foundEmail = await User.where("email", body.email).first();
    if (foundEmail) throw new BadRequestError("Email already exist");

    const foundUsername = await User.where("username", body.username).first();
    if (foundUsername) throw new BadRequestError("Uername has been taken");

    body.password = hashPassword(body.password);
    const user = await User.insert(body);

    return Response.json(user, { status: 201 });
  } catch (error: unknown) {
    const { message, status } = CustomError(error);
    return Response.json({ message }, { status });
  }
}
