import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200" style={{maxHeight: 'calc(100vh - 100px)', minHeight: 'calc(100vh - 100px)'}}>
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">
          Teacher Management
        </h1>
        <p className="text-gray-500 mb-8">
          Effortlessly manage your teachers and their information.
        </p>
        <Link href="/teachers">
          <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:scale-105 transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400">
            View Teachers
          </button>
        </Link>
      </div>
    </div>
  );
}
