import { CustomError } from "@/servers/helpers/customError";
import { BadRequestError, UnauthorizedError } from "@/servers/helpers/errorHandler";
import { verifyToken } from "@/servers/helpers/jwt";
import Wishlist from "@/servers/models/Wishlist";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

interface ICtx {
  params: Promise<{productId: string}>
}

export async function DELETE(request: Request, ctx: ICtx) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) throw new UnauthorizedError("Please login first");
    const payload = verifyToken(token) as {
      _id: string;
      email: string;
    };

    const {productId } = await ctx.params
    if(!ObjectId.isValid(productId)) throw new BadRequestError("Invalid productId")
        
    const userId = new ObjectId(String(payload._id));
    const productObjectId = new ObjectId(productId)

    const deleteWishlist = await Wishlist.where("userId", userId).where("productId", productObjectId).delete()
    
    if(!deleteWishlist) throw new BadRequestError("Wishlist not found")

    return Response.json(
      {
        message: "Success remove from wishlist",
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    const { message, status } = CustomError(error);

    return Response.json({ message }, { status });
  }
}