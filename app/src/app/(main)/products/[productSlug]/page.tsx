import Link from "next/link";
import ProductDetailClient from "@/components/productDetail";
import { Metadata } from "next";

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
}

interface ProductDetailPageProps {
  params: Promise<{
    productSlug: string;
  }>;
}

async function getProduct(slug: string): Promise<IProduct | null> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const product: IProduct = await response.json();

  return product;
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { productSlug } = await params;

  const product = await getProduct(productSlug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.excerpt,
    openGraph: {
      title: product.name,
      description: product.excerpt,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { productSlug } = await params;

  const product = await getProduct(productSlug);

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h1>

          <Link
            href="/products"
            className="mt-5 inline-block rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/products"
          className="mb-6 inline-block text-sm text-gray-500 transition hover:text-black"
        >
          ← Back to Products
        </Link>

        <ProductDetailClient product={product} />
      </div>
    </main>
  );
}
