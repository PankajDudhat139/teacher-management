"use client";
import { FaPlus, FaRupeeSign, FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";

interface PaymentEntry {
  id: string;
  subject: string;
  amount: number;
  dueDate: string;
  description: string;
  status: "pending" | "paid" | "overdue";
}

interface PaymentEntryTableProps {
  entries: PaymentEntry[];
  onAddEntry: () => void;
  onPayEntry: (entry: PaymentEntry) => void;
  onEditEntry: (entry: PaymentEntry) => void;
  onDeleteEntry: (id: string) => void;
}

export default function PaymentEntryTable({
  entries,
  onAddEntry,
  onPayEntry,
  onEditEntry,
  onDeleteEntry,
}: PaymentEntryTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "overdue":
        return "Overdue";
      default:
        return "Pending";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === "paid") return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FaRupeeSign className="text-green-600" /> Payment Entries
        </h2>
        <button
          onClick={onAddEntry}
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow transition flex items-center gap-2"
        >
          <FaPlus size={16} />
          Add Entry
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FaRupeeSign className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No payment entries yet</h3>
          <p className="text-gray-500 mb-4">Add your first payment entry to get started</p>
          <button
            onClick={onAddEntry}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow transition"
          >
            Add Payment Entry
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-100 text-blue-800">
                  <th className="py-4 px-4 text-left font-semibold">Subject</th>
                  <th className="py-4 px-4 text-left font-semibold">Amount</th>
                  <th className="py-4 px-4 text-left font-semibold">Due Date</th>
                  <th className="py-4 px-4 text-left font-semibold">Status</th>
                  <th className="py-4 px-4 text-left font-semibold">Description</th>
                  <th className="py-4 px-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {entries.map((entry) => {
                  const actualStatus = isOverdue(entry.dueDate, entry.status) ? "overdue" : entry.status;
                  
                  return (
                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">
                              {entry.subject.charAt(0)}
                            </span>
                          </div>
                          <span className="font-semibold">{entry.subject}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-green-600">₹{entry.amount.toLocaleString()}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-400" size={14} />
                          <span className={actualStatus === "overdue" ? "text-red-600 font-semibold" : ""}>
                            {formatDate(entry.dueDate)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(actualStatus)}`}>
                          {getStatusText(actualStatus)}
                        </span>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <p className="text-sm text-gray-600 truncate" title={entry.description}>
                          {entry.description}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          {actualStatus !== "paid" && (
                            <button
                              onClick={() => onPayEntry(entry)}
                              className="cursor-pointer bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-3 py-1 rounded-lg font-semibold shadow transition active:scale-95 text-sm"
                            >
                              Pay Now
                            </button>
                          )}
                          <button
                            onClick={() => onEditEntry(entry)}
                            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg shadow transition"
                            title="Edit Entry"
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => onDeleteEntry(entry.id)}
                            className="cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg shadow transition"
                            title="Delete Entry"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}