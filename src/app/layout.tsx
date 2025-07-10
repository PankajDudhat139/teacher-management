"use client";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import { ReactNode, useState } from "react";
import { FiX } from "react-icons/fi";
import { FaChevronCircleRight, FaHome, FaUser, FaCog } from "react-icons/fa";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/", icon: <FaHome /> },
  { label: "Teachers", href: "/teachers", icon: <FaUser /> },
  { label: "Settings", href: "/settings", icon: <FaCog /> },
];

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay for mobile */}
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-black/60 to-blue-900/40 z-40 transition-opacity duration-300 md:hidden ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>
      {/* Sidebar */}
      <aside
        className={`sidemenu fixed z-50 top-0 left-0 h-full bg-white/90 backdrop-blur-lg shadow-2xl transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        w-72 md:translate-x-0 md:w-72 md:static md:block border-r border-gray-200`}
      >
        <div className="flex items-center md:hidden justify-end p-2 border-b border-gray-100">
          <button
            className="md:hidden hover:bg-blue-100 rounded-full p-2 transition"
            onClick={() => setOpen(false)}
          >
            <FiX size={28} className="text-blue-700" />
          </button>
        </div>
        <nav className="p-6 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition group"
            >
              <span className="text-xl text-blue-600 group-hover:text-blue-700">
                {item.icon}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Toggle button */}
      <button
        className="absolute top-4 left-4 z-39 p-2 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-full shadow-lg md:hidden hover:scale-105 transition"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FaChevronCircleRight size={22} />
      </button>
    </>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main
            className="flex-1 p-4 max-w-7xl mx-auto [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            {children}
          </main>
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
