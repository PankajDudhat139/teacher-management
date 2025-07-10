"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import TeacherCard from "@/components/teacher/TeacherCard";
import { Teacher } from "@/types/teacher";
import Loader from "@/components/Loader";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const stored = localStorage.getItem("teachers");
    if (stored) {
      setTeachers(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    setTeachers(updated);
    localStorage.setItem("teachers", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Teachers</h2>
        <Link href="/teachers/create">
          <button className="relative px-6 py-2 bg-gradient-to-r cursor-pointer from-sky-500 to-blue-500 text-white font-bold rounded-full shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none">
            <span className="absolute left-0 top-0 w-full h-full opacity-20 bg-white rounded-full animate-pulse"></span>
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Teacher
            </span>
          </button>
        </Link>
      </div>
      {loading ? (
        <Loader />
      ) : teachers.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16"
          style={{ height: "calc(100vh - 160px)" }}
        >
          <svg
            className="w-16 h-16 text-blue-400 mb-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14v2m0 4a8 8 0 100-16 8 8 0 000 16zm0-10v2"
            />
          </svg>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Teachers Found
          </h3>
          <p className="text-gray-500 mb-4">
            Start by adding your first teacher to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
