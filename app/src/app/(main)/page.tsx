import Link from "next/link";
import ProductCard from "../../components/productCard";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface IProductResponse {
  data: IProduct[];
  meta: {
    lastPage: number;
    limit: number;
    page: number;
    total: number;
  };
}

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?page=1&limit=10`,
    {
      cache: "no-store",
    },
  );

  const result: IProductResponse = await response.json();

  return (
    <main className="min-h-screen bg-white">
      {/* ================= HERO / BANNER ================= */}
      <section
        className="relative h-[480px] bg-cover bg-center"
        style={{
          backgroundImage: "url('/banner.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">
          <div className="max-w-xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-200">
              New Collection
            </p>

            <h1 className="text-5xl font-black uppercase leading-tight tracking-tight md:text-7xl">
              Move Your Way
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-200 md:text-lg">
              Discover quality products designed for your everyday style,
              comfort, and lifestyle.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-block bg-white px-7 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gray-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Our Collection
            </p>

            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-gray-900 md:text-4xl">
              Featured Items
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-sm font-semibold uppercase tracking-wide text-gray-900 underline underline-offset-4 transition hover:text-gray-500 sm:block"
          >
            See All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Mobile See All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="text-sm font-semibold uppercase tracking-wide text-gray-900 underline underline-offset-4"
          >
            See All Products
          </Link>
        </div>
      </section>

      {/* ================= INFO SECTION ================= */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto grid max-w-7xl md:grid-cols-3">
          {/* Item 1 */}
          <div className="border-b border-gray-200 px-8 py-12 text-center md:border-b-0 md:border-r">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg text-white">
              ✓
            </div>

            <h3 className="mt-5 text-lg font-bold uppercase tracking-wide">
              Quality Products
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Carefully selected products with quality you can trust.
            </p>
          </div>

          {/* Item 2 */}
          <div className="border-b border-gray-200 px-8 py-12 text-center md:border-b-0 md:border-r">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg text-white">
              $
            </div>

            <h3 className="mt-5 text-lg font-bold uppercase tracking-wide">
              Great Prices
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Find products at competitive prices for your everyday needs.
            </p>
          </div>

          {/* Item 3 */}
          <div className="px-8 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg text-white">
              →
            </div>

            <h3 className="mt-5 text-lg font-bold uppercase tracking-wide">
              Easy Shopping
            </h3>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500">
              Browse, discover, and save your favorite products easily.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SHOP BY CATEGORY ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-gray-900 md:text-4xl">
            Shop By Category
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/products"
            className="group relative flex h-48 items-end overflow-hidden bg-cover bg-center p-6"
            style={{
              backgroundImage: "url('/shoes.jpg')",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />

            {/* Content */}
            <div className="relative z-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-200">
                Explore
              </p>

              <h3 className="mt-1 text-2xl font-black uppercase">Shoes</h3>
            </div>
          </Link>

          <Link
            href="/products"
            className="group relative flex h-48 items-end overflow-hidden bg-cover bg-center p-6"
            style={{
              backgroundImage: "url('/clothes.jfif')",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />

            {/* Content */}
            <div className="relative z-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-200">
                Explore
              </p>

              <h3 className="mt-1 text-2xl font-black uppercase">Clothing</h3>
            </div>
          </Link>

          <Link
            href="/products"
            className="group relative flex h-48 items-end overflow-hidden bg-cover bg-center p-6"
            style={{
              backgroundImage: "url('/accessories.jpg')",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />

            {/* Content */}
            <div className="relative z-10 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-200">
                Explore
              </p>

              <h3 className="mt-1 text-2xl font-black uppercase">
                Accessories
              </h3>
            </div>
          </Link>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-black px-6 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
          Find Your Favorites
        </p>

        <h2 className="mt-3 text-3xl font-black uppercase md:text-5xl">
          Explore Our Products
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 md:text-base">
          Discover more products and find something that fits your style.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-block bg-white px-7 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gray-200"
        >
          View All Products
        </Link>
      </section>
    </main>
  );
}
