"use client";
import { Teacher } from "@/types/teacher";
import {
  FaPen,
  FaTrashAlt,
  // FaEnvelope,
  // FaPhone,
  // FaBirthdayCake,
  // FaMapMarkerAlt,
  FaUser,
  FaEye,
} from "react-icons/fa";

export default function TeacherCard({
  teacher,
  onDelete,
}: {
  teacher: Teacher;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-xl p-6 rounded-xl relative overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
      <div className="absolute top-4 right-6 flex gap-2 z-20">
        {/* View Button */}
        <button
          onClick={() =>
            (window.location.href = `/teachers/detail/${teacher.id}`)
          }
          className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-green-400 to-green-600 text-white shadow-md hover:scale-110 hover:rotate-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 z-10"
          aria-label="View teacher"
        >
          <FaEye size={14} />
        </button>
        {/* Edit Button */}
        <button
          onClick={() =>
            (window.location.href = `/teachers/edit/${teacher.id}`)
          }
          className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 text-white shadow-md hover:scale-110 hover:rotate-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 z-10"
          aria-label="Edit teacher"
        >
          <FaPen size={14} />
        </button>
        {/* Delete Button */}
        <button
          onClick={() => onDelete(teacher.id)}
          className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-red-400 to-red-600 text-white shadow-md hover:scale-110 hover:rotate-6 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 z-10"
          aria-label="Delete teacher"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-3 pb-2">
        {/* Avatar Section */}
        <div className="relative mb-2 flex items-center justify-between">
          <img
            src={
              teacher.avatarUrl ||
              "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
            }
            alt={teacher.name}
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg object-cover ring-2 ring-blue-200"
          />
          <span className=" bottom-0 right-0 bg-gradient-to-tr from-blue-400 to-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1 font-semibold tracking-tight transform -translate-x-1 translate-y-1">
            <FaUser className="inline text-opacity-80" />{" "}
            {teacher.role || "Teacher"}
          </span>
        </div>

        {/* Name and Role/Subject */}
        <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          {teacher.name}
        </h3>
        <p className="text-base text-blue-700 font-medium mt-[-4px] mb-2">
          {teacher.subject}
        </p>

        {/* Contact Information */}
        {/* <div className="flex flex-col items-start gap-2 mt-2 w-full">
          <div className="flex items-center gap-3 text-gray-700 text-sm w-full">
            <FaEnvelope className="w-4 h-4 flex-shrink-0 text-blue-500" />
            <span className="truncate">{teacher.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700 text-sm w-full">
            <FaPhone className="w-4 h-4 flex-shrink-0 text-blue-500" />
            <span className="truncate">{teacher.phone}</span>
          </div>
          {teacher.birthDate && (
            <div className="flex items-center gap-3 text-gray-600 text-sm w-full">
              <FaBirthdayCake className="w-4 h-4 flex-shrink-0 text-blue-400" />
              <span className="truncate">DOB: {teacher.birthDate}</span>
            </div>
          )}
          {teacher.address && (
            <div className="flex items-center gap-3 text-gray-600 text-sm w-full">
              <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0 text-blue-400" />
              <span className="truncate">{teacher.address}</span>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}
