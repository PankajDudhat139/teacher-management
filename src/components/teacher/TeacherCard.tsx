"use client";
import { Teacher } from "@/types/teacher";
import Link from "next/link";

export default function TeacherCard({
  teacher,
  onDelete,
}: {
  teacher: Teacher;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white shadow p-4 rounded-lg relative">
      <button
        onClick={() => onDelete(teacher.id)}
        className="absolute top-2 right-2 w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-gray-400 via-gray-500 to-gray-600 text-white shadow-lg hover:scale-110 hover:rotate-12 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label="Delete teacher"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" fill="white" opacity="0.15" />
          <path
            d="M6 6l8 8M14 6l-8 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="flex flex-col items-center gap-2 py-4">
        <div className="relative">
          <img
            src={teacher.avatarUrl || "/default-avatar.png"}
            alt={teacher.name}
            className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
          <span className="absolute bottom-0 right-0 bg-gradient-to-tr from-green-400 to-green-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
            {teacher.role || "Teacher"}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
        <p className="text-sm text-blue-600 font-medium">{teacher.subject}</p>
        <div className="flex flex-col items-center gap-1 mt-2 w-full">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z" />
              <path d="M12 16v2m0 0h-2m2 0h2" />
            </svg>
            <span>{teacher.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
              <path d="M17 17a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2h2z" />
            </svg>
            <span>{teacher.phone}</span>
          </div>
          {teacher.birthDate && (
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>DOB: {teacher.birthDate}</span>
            </div>
          )}
          {teacher.address && (
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{teacher.address}</span>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => (window.location.href = `/teachers/edit/${teacher.id}`)}
        aria-label="Edit teacher"
        className="mt-3 relative px-6 py-2 bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none"
      >
        <span className="absolute left-0 top-0 w-full h-full opacity-20 bg-white rounded-full animate-pulse"></span>
        <span className="relative z-10 flex items-center gap-2 text-sm">
          Edit
        </span>
      </button>
    </div>
  );
}
