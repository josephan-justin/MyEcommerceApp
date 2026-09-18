import { CustomError } from "@/servers/helpers/customError";
import { NotFoundError } from "@/servers/helpers/errorHandler";
import Product from "@/servers/models/Product";

interface ICtx {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, ctx: ICtx) {
  try {
    const { slug } = await ctx.params;
    const product = await Product.where("slug", slug).first();

    if (!product) throw new NotFoundError("Product not found");

    return Response.json(product);
  } catch (error: unknown) {
    const { message, status } = CustomError(error);

    return Response.json({ message }, { status });
  }
}
