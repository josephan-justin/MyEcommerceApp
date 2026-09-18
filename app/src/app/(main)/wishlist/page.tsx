"use client";

import { useEffect, useState } from "react";

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

interface IWishlist {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

export default function WishlistPage() {
  const [wishlists, setWishlists] = useState<IWishlist[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRemoveWishlist = async (productId: string) => {
    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result.message);
        return;
      }

      setWishlists((prev) =>
        prev.filter((wishlist) => wishlist.productId !== productId),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`);

        const result = await response.json();

        console.log(result);

        setWishlists(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-gray-500">Loading wishlist...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>

          <p className="mt-2 text-gray-500">
            Products you have added to your wishlist
          </p>
        </div>

        {wishlists.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wishlists.map((wishlist) => (
              <div
                key={wishlist._id}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <img
                  src={wishlist.product.thumbnail}
                  alt={wishlist.product.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
                    {wishlist.product.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {wishlist.product.excerpt}
                  </p>

                  <p className="mt-4 text-lg font-bold text-gray-900">
                    Rp {wishlist.product.price.toLocaleString("id-ID")}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {wishlist.product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleRemoveWishlist(wishlist.productId)}
                    type="button"
                    className="mt-5 w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
                  >
                    Remove Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
