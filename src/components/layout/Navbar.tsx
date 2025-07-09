import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-semibold cursor-pointer">
          Teacher Manager
        </span>
      </Link>
      <div className="space-x-4">
        <Link href="/teachers">
          <span className="hover:underline cursor-pointer">Teachers</span>
        </Link>
      </div>
    </nav>
  );
}
