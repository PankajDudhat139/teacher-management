"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl font-semibold mb-2">Oops! Page not found</p>
      <p className="text-gray-500 mb-6">
        The page you’re looking for doesn’t exist.
      </p>
      <Link href="/">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Go Home
        </button>
      </Link>
    </div>
  );
}
