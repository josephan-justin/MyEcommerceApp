import { CustomError } from "@/servers/helpers/customError";
import {
  BadRequestError,
  UnauthorizedError,
} from "@/servers/helpers/errorHandler";
import { verifyToken } from "@/servers/helpers/jwt";
import Product from "@/servers/models/Product";
import Wishlist from "@/servers/models/Wishlist";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) throw new UnauthorizedError("Please login first");
    const payload = verifyToken(token) as {
      _id: string;
      email: string;
    };

    const { productId } = await request.json();
    if (!productId) throw new BadRequestError("ProductId required");

    if (!ObjectId.isValid(productId))
      throw new BadRequestError("Invalid productId");

    const userId = new ObjectId(String(payload._id));
    const product = await Product.find(productId);

    if (!product) throw new BadRequestError("Product not found");

    const existingWishlist = await Wishlist.where("userId", userId)
      .where("productId", new ObjectId(productId))
      .first();
    if (existingWishlist)
      throw new BadRequestError("Product already in wishlist");

    const wishlist = await Wishlist.create({
      userId,
      productId: new ObjectId(productId),
    });

    return Response.json(wishlist, { status: 201 });
  } catch (error: unknown) {
    const { message, status } = CustomError(error);

    return Response.json({ message }, { status });
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) throw new UnauthorizedError("Please login first");
    const payload = verifyToken(token) as {
      _id: string;
      email: string;
    };

    const userId = new ObjectId(String(payload._id));

    const wishlists = await Wishlist.where("userId", userId).get();
    const result = await Promise.all(
      wishlists.map(async (wishlist) => {
        const product = await Product.find(wishlist.productId)
        return {
          ...wishlist, product: product?.getOriginal()
        }
      })
    )

    return Response.json(result);
  } catch (error: unknown) {
    const { message, status } = CustomError(error);

    return Response.json({ message }, { status });
  }
}
