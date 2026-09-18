import { CustomError } from "@/servers/helpers/customError";
import Product from "@/servers/models/Product";

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url)
    const search = searchParams.get("search")
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 10

    let product;
    if(search){
        product = await Product.where("name", "like", search).paginate(page, limit)
    } else{
        product = await Product.paginate(page, limit)
    }

    return Response.json(product);
  } catch (error: unknown) {
    const { message, status } = CustomError(error);

    return Response.json({ message }, { status });
  }
}
