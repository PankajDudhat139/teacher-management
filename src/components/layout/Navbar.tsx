import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-400 shadow-lg px-8 py-4 flex justify-between items-center">
      <Link
        href="/"
        className="flex items-center gap-2 pl-8 md:pl-0"
      >
        <span className="text-2xl font-bold tracking-tight text-white drop-shadow">
          Teacher Manager
        </span>
      </Link>
      <div className="space-x-6 flex items-center">
        {/* <Link href="/teachers" className="relative group">
          <span className="px-4 py-2 rounded-md bg-white/10 text-white font-medium transition-all duration-200 group-hover:bg-white/20 group-hover:shadow-lg group-hover:text-white-300">
            Teachers
          </span>
          <span className="absolute left-1/2 -bottom-1 w-0 h-1 bg-white-300 rounded transition-all duration-300 group-hover:w-3/4 group-hover:left-1/8"></span>
        </Link> */}
        {/* Add more nav links here if needed */}
      </div>
    </nav>
  );
}
