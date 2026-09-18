"use client";

import { use, useEffect, useRef, useState } from "react";
import ProductCard from "@/components/productCard";

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
    page: number;
    limit: number;
    total: number;
    lastPage: number;
  };
}

export default function ProductPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debounce, setDebounce] = useState("")
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setProducts([])
    setPage(1)
    setHasMore(true)
  }, [search])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(search)
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${debounce}&page=${page}&limit=10`);

        const result: IProductResponse = await response.json();

        if(page === 1){
          setProducts(result.data)
        } else{
          setProducts((prev) => [...prev, ...result.data])
        }

        if (page >= result.meta.lastPage) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, debounce]);

  useEffect(() => {
    function handleScroll(){
      if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300){
        if(hasMore && !loading){
          setPage((prev) => prev + 1)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasMore, loading])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pt-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>

          <p className="text-gray-500">Discover our collection of products.</p>
        </div>

        {/* Search */}
        <div className="mt-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-gray-900"
          />
        </div>
      </section>

      {/* Product List */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
