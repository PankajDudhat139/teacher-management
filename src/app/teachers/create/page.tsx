"use client";
import { useState } from "react";
import { validateTeacherForm } from "@/utils/formValidation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function CreateTeacherPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    avatarUrl: "",
    email: "",
    subject: "",
    phone: "",
    birthDate: "",
    role: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTeacherForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTeacher = { id: uuidv4(), ...form };
    const stored = localStorage.getItem("teachers");
    const current = stored ? JSON.parse(stored) : [];
    const updated = [...current, newTeacher];
    localStorage.setItem("teachers", JSON.stringify(updated));
    console.log(setLoading);

    toast.success("Teacher created!");
    router.push("/teachers");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10">
      <h2 className="text-2xl font-extrabold mb-6 text-blue-700 flex items-center gap-2">
        <svg
          className="w-7 h-7 text-blue-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0l-3-3m3 3l3-3"
          />
        </svg>
        Create Teacher
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Full Name (at least 3 words)"
              value={form.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-blue-500 p-3 rounded-lg transition"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-blue-500 p-3 rounded-lg transition"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-blue-500 p-3 rounded-lg transition"
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="Phone (10 digits)"
              value={form.phone}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-blue-500 p-3 rounded-lg transition"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="birthDate"
            >
              Birth Date
            </label>
            <input
              id="birthDate"
              type="date"
              name="birthDate"
              value={form.birthDate || ""}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-blue-500 p-3 rounded-lg transition"
            />
            {errors.birthDate && (
              <p className="text-xs text-red-500 mt-1">{errors.birthDate}</p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={form.role || ""}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-blue-500 p-3 rounded-lg transition bg-white"
            >
              <option value="">Select Role</option>
              <option value="Teacher">Teacher</option>
              <option value="Assistant">Assistant</option>
              <option value="Coordinator">Coordinator</option>
            </select>
            {errors.role && (
              <p className="text-xs text-red-500 mt-1">{errors.role}</p>
            )}
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label
              className="block text-sm font-semibold text-gray-700 mb-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              placeholder="Address"
              value={form.address || ""}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 focus:border-blue-500 p-3 rounded-lg transition"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Avatar Image
            </label>
            <div className="flex items-center gap-4 justify-between">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {form.avatarUrl && (
                <img
                  src={form.avatarUrl}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border-2 border-blue-400 shadow content-cover"
                />
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-600 transition"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
