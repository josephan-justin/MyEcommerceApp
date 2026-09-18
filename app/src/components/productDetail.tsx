"use client";

import { useState } from "react";

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

interface ProductDetailClientProps {
  product: IProduct;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [message, setMessage] = useState("");

  const allImages = [product.thumbnail, ...product.images];

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
    <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
      {/* Product Images */}
      <div>
        {/* Main Image */}
        <img
          src={selectedImage}
          alt={product.name}
          className="h-[450px] w-full rounded-xl object-cover"
        />

        {/* Thumbnail Images */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {allImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-lg border-2 ${
                selectedImage === image ? "border-black" : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`${product.name} ${index + 1}`}
                className="h-24 w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Name */}
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          {product.name}
        </h1>

        {/* Price */}
        <p className="mt-4 text-2xl font-bold text-gray-900">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        {/* Excerpt */}
        <p className="mt-6 text-gray-600">{product.excerpt}</p>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Description</h2>

          <p className="mt-2 leading-7 text-gray-600">{product.description}</p>
        </div>

        {/* Wishlist */}
        <button
          onClick={() => handleAddWishlist()}
          type="button"
          className="mt-8 w-full rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 cursor-pointer"
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
  );
}
