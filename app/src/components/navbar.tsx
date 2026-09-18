"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/profile");

        setIsLoggedIn(response.ok);
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function handleLogout() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "POST",
      });

      if (!response.ok) {
        console.error("Logout failed");
        return;
      }

      setIsLoggedIn(false);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black uppercase tracking-tighter text-black cursor-pointer"
        >
          MyStore
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-wide text-gray-700 transition hover:text-black cursor-pointer"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-sm font-bold uppercase tracking-wide text-gray-700 transition hover:text-black cursor-pointer"
          >
            Products
          </Link>

          {isLoggedIn && (
            <Link
              href="/wishlist"
              className="text-sm font-bold uppercase tracking-wide text-gray-700 transition hover:text-black cursor-pointer"
            >
              Wishlist
            </Link>
          )}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-2">
          {!loading && !isLoggedIn && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-bold uppercase tracking-wide text-gray-700 transition hover:text-black cursor-pointer"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-black px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gray-800 cursor-pointer"
              >
                Register
              </Link>
            </>
          )}

          {!loading && isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="bg-black px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gray-800 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
