"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Teacher } from "@/types/teacher";
import Loader from "@/components/Loader";
import PaymentDialog from "@/components/payment/PaymentDialog";
import PaymentEntryDialog from "@/components/payment/PaymentEntryDialog";
import PaymentEntryTable from "@/components/payment/PaymentEntryTable";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface PaymentEntry {
  id: string;
  subject: string;
  amount: number;
  dueDate: string;
  description: string;
  status: "pending" | "paid" | "overdue";
}

const SUBJECT_FEES: Record<string, number> = {
  Math: 2000,
  Science: 2500,
  English: 1800,
  History: 1700,
  Geography: 1600,
  Physics: 2200,
  Chemistry: 2300,
  Biology: 2100,
};

export default function TeacherDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentEntryOpen, setPaymentEntryOpen] = useState(false);
  const [paymentEntries, setPaymentEntries] = useState<PaymentEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<PaymentEntry | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("teachers");
    if (stored) {
      const teachers: Teacher[] = JSON.parse(stored);
      const found = teachers.find((t) => t.id === id);
      if (found) setTeacher(found);
    }

    // Load payment entries for this teacher
    const storedEntries = localStorage.getItem(`payment_entries_${id}`);
    if (storedEntries) {
      setPaymentEntries(JSON.parse(storedEntries));
    }
  }, [id]);

  const savePaymentEntries = (entries: PaymentEntry[]) => {
    localStorage.setItem(`payment_entries_${id}`, JSON.stringify(entries));
    setPaymentEntries(entries);
  };

  const handleAddEntry = (newEntry: Omit<PaymentEntry, "id" | "status">) => {
    const entry: PaymentEntry = {
      ...newEntry,
      id: `entry_${Date.now()}`,
      status: "pending",
    };
    const updatedEntries = [...paymentEntries, entry];
    savePaymentEntries(updatedEntries);
  };

  const handlePayEntry = (entry: PaymentEntry) => {
    setSelectedEntry(entry);
    setPaymentOpen(true);
  };

  const handleEditEntry = (entry: PaymentEntry) => {
    // For now, just show an alert. You can implement edit functionality
    alert(
      `Edit functionality for ${entry.subject} - ₹${entry.amount} (Coming Soon)`
    );
  };

  const handleDeleteEntry = (entryId: string) => {
    if (confirm("Are you sure you want to delete this payment entry?")) {
      const updatedEntries = paymentEntries.filter(
        (entry) => entry.id !== entryId
      );
      savePaymentEntries(updatedEntries);
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedEntry) {
      const updatedEntries = paymentEntries.map((entry) =>
        entry.id === selectedEntry.id
          ? { ...entry, status: "paid" as const }
          : entry
      );
      savePaymentEntries(updatedEntries);
      setSelectedEntry(null);
    }
  };

  if (!teacher) return <Loader />;

  const defaultSubjectFee = SUBJECT_FEES[teacher.subject] || 2000;
  const paymentAmount = selectedEntry
    ? selectedEntry.amount
    : defaultSubjectFee;
  const paymentSubject = selectedEntry
    ? selectedEntry.subject
    : teacher.subject;

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-4 md:p-10 relative">
      <button
        onClick={() => router.push("/teachers")}
        className="cursor-pointer absolute top-6 left-6 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full font-semibold shadow transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={
                teacher.avatarUrl ||
                "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
              }
              alt={teacher.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-400 shadow-lg object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
              {teacher.role}
            </span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-2 flex items-center gap-2 capitalize">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700">
              <FaUser size={20} />
            </span>
            {teacher.name}
          </h1>
          <p className="text-lg text-gray-500 mb-4">{teacher.subject}</p>

          <div className="grid grid-cols-1 gap-4 text-gray-800">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <span className="font-semibold">Email:</span>
              <div>{teacher.email}</div>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-blue-500" />
              <span className="font-semibold">Phone:</span>
              <div>{teacher.phone}</div>
            </div>
            <div className="flex items-center gap-2">
              <FaBirthdayCake className="text-blue-500" />
              <span className="font-semibold">Birth Date:</span>
              <div>
                {teacher.birthDate
                  ? new Date(teacher.birthDate).toLocaleDateString()
                  : "-"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span className="font-semibold">Address:</span>
              <div>{teacher.address || "-"}</div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push(`/teachers/edit/${teacher.id}`)}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg shadow transition"
            >
              Edit
            </button>
            <button
              onClick={() => router.push("/teachers")}
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              All Teachers
            </button>
          </div>
        </div>
      </div>
      {/* Payment Entries Table */}
      <PaymentEntryTable
        entries={paymentEntries}
        onAddEntry={() => setPaymentEntryOpen(true)}
        onPayEntry={handlePayEntry}
        onEditEntry={handleEditEntry}
        onDeleteEntry={handleDeleteEntry}
      />

      {/* Payment Dialog */}
      <PaymentDialog
        isOpen={paymentOpen}
        onClose={() => {
          setPaymentOpen(false);
          setSelectedEntry(null);
        }}
        teacherName={teacher.name}
        subject={paymentSubject}
        amount={paymentAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Payment Entry Dialog */}
      <PaymentEntryDialog
        isOpen={paymentEntryOpen}
        onClose={() => setPaymentEntryOpen(false)}
        onAddEntry={handleAddEntry}
        teacherName={teacher.name}
      />
    </div>
  );
}
