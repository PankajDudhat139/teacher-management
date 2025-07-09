import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Teacher Manager",
  description: "Manage teachers in a clean UI",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="p-4 max-w-7xl mx-auto">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
