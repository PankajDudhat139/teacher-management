"use client";

interface UpiPaymentFormProps {
  data: { id: string };
  onChange: (data: { id: string }) => void;
  onSubmit: () => void;
  loading: boolean;
  amount: number;
}

export default function UpiPaymentForm({
  data,
  onChange,
  onSubmit,
  loading,
  amount,
}: UpiPaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter UPI ID (e.g. name@upi)"
        className="border border-blue-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={data.id}
        onChange={(e) => onChange({ id: e.target.value })}
        autoFocus
        inputMode="text"
      />
      <button
        type="submit"
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow transition w-full active:scale-95"
        disabled={loading}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </form>
  );
}