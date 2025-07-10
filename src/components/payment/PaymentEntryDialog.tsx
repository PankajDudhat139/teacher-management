"use client";
import { useState } from "react";
import {
  FaTimes,
  FaPlus,
  FaRupeeSign,
  FaBook,
  FaCalendarAlt,
  FaFileAlt,
  FaMoneyBill,
} from "react-icons/fa";

interface PaymentEntry {
  id: string;
  subject: string;
  amount: number;
  dueDate: string;
  description: string;
  status: "pending" | "paid" | "overdue";
}

interface PaymentEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntry: (entry: Omit<PaymentEntry, "id" | "status">) => void;
  teacherName: string;
}

const SUBJECTS = [
  "Math",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
];

export default function PaymentEntryDialog({
  isOpen,
  onClose,
  onAddEntry,
  teacherName,
}: PaymentEntryDialogProps) {
  const [formData, setFormData] = useState({
    subject: "",
    amount: "",
    dueDate: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.subject.trim()) {
      setError("Please select a subject");
      return;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (!formData.dueDate) {
      setError("Please select a due date");
      return;
    }
    if (!formData.description.trim()) {
      setError("Please enter a description");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newEntry = {
        subject: formData.subject,
        amount: parseFloat(formData.amount),
        dueDate: formData.dueDate,
        description: formData.description,
      };

      onAddEntry(newEntry);
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        handleClose();
      }, 1500);
    }, 1000);
  };

  const handleClose = () => {
    setFormData({ subject: "", amount: "", dueDate: "", description: "" });
    setError(null);
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // Get tomorrow's date as minimum due date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-40">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-lg relative animate-fadeIn">
        <button
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={handleClose}
          aria-label="Close"
        >
          <FaTimes size={22} />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-2 bg-blue-100 rounded-full flex items-center justify-center">
            <FaMoneyBill className="text-blue-600" size={24} />
          </div>

          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Add Payment Entry
          </h2>
          <p className="mb-6 text-gray-600 text-center">
            Create a new payment entry for{" "}
            <span className="font-semibold text-blue-700">{teacherName}</span>
          </p>

          <div className="w-full">
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                <FaTimes size={16} />
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                <FaPlus size={16} />
                Payment entry added successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Subject Selection */}
              <div
                className="px-1 [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                style={{ maxHeight: "calc(100vh - 375px)", overflowY: "auto" }}
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaBook className="text-blue-500" />
                    Subject
                  </label>
                  <select
                    className="w-full mb-3 border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                  >
                    <option value="">Select Subject</option>
                    {SUBJECTS.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaRupeeSign className="text-blue-500" />
                    Amount
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Enter amount"
                    className="w-full mb-3 border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    Due Date
                  </label>
                  <input
                    type="date"
                    min={getTomorrowDate()}
                    className="w-full mb-3 border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                    value={formData.dueDate}
                    onChange={(e) =>
                      handleInputChange("dueDate", e.target.value)
                    }
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FaFileAlt className="text-blue-500" />
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter payment description or notes"
                    className="w-full border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl shadow transition active:scale-95"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow transition active:scale-95"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Entry"}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4 text-xs text-gray-400 text-center">
            Secure • Easy Management • Quick Setup
          </div>
        </div>
      </div>
    </div>
  );
}
