import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Teacher Management</h1>
      <Link href="/teachers">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          View Teachers
        </button>
      </Link>
    </div>
  );
}
