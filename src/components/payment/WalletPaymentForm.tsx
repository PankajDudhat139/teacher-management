"use client";

interface WalletPaymentFormProps {
  data: { provider: string; mobile: string };
  onChange: (data: { provider: string; mobile: string }) => void;
  onSubmit: () => void;
  loading: boolean;
  amount: number;
}

export default function WalletPaymentForm({
  data,
  onChange,
  onSubmit,
  loading,
  amount,
}: WalletPaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleMobileChange = (value: string) => {
    const formatted = value.replace(/\D/g, "");
    onChange({ ...data, mobile: formatted });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <select
        className="border border-blue-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={data.provider}
        onChange={(e) => onChange({ ...data, provider: e.target.value })}
      >
        <option value="">Select Wallet</option>
        <option value="Paytm">Paytm</option>
        <option value="PhonePe">PhonePe</option>
        <option value="Google Pay">Google Pay</option>
      </select>
      <input
        type="tel"
        placeholder="Mobile Number"
        maxLength={10}
        className="border border-blue-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={data.mobile}
        onChange={(e) => handleMobileChange(e.target.value)}
        inputMode="numeric"
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