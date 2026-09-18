"use client";

import Link from "next/link";
import { IProduct } from "../app/(main)/products/page";
import { useState } from "react";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [message, setMessage] = useState("");

  const handleAddWishlist = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.message);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        return;
      }

      setMessage("Product Added To Wishlist");
      setTimeout(() => {
        setMessage("");
      }, 2000);

      console.log(result);
    } catch (error) {
      console.log(error);
      setMessage("Somthing went wrong");
    }
  };

  return (
    <>
      <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="p-5">
          <div className="mb-2 flex flex-wrap gap-2">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link href={`/products/${product.slug}`}>
            <h2 className="line-clamp-1 text-lg font-semibold text-gray-900 hover:text-gray-600">
              {product.name}
            </h2>
          </Link>

          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {product.excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-lg font-bold text-gray-900">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            <button
              onClick={handleAddWishlist}
              type="button"
              className="flex h-15 w-20 items-center justify-center rounded border border-gray-200 text-gray-600 transition  cursor-pointer hover:bg-gray-900 hover:text-white"
            >
              Add To Wishlist
            </button>
              {message && (
                <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white shadow-lg">
                  {message}
                </div>
              )}
          </div>
        </div>
      </article>
    </>
  );
}
