"use client";

interface CardPaymentFormProps {
  data: { number: string; name: string; expiry: string; cvv: string };
  onChange: (data: { number: string; name: string; expiry: string; cvv: string }) => void;
  onSubmit: () => void;
  loading: boolean;
  amount: number;
}

export default function CardPaymentForm({
  data,
  onChange,
  onSubmit,
  loading,
  amount,
}: CardPaymentFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = value
      .replace(/[^\d]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    onChange({ ...data, number: formatted });
  };

  const handleExpiryChange = (value: string) => {
    const formatted = value.replace(/[^0-9/]/g, "");
    onChange({ ...data, expiry: formatted });
  };

  const handleCvvChange = (value: string) => {
    const formatted = value.replace(/\D/g, "");
    onChange({ ...data, cvv: formatted });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Card Number"
        maxLength={19}
        className="border border-blue-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={data.number}
        onChange={(e) => handleCardNumberChange(e.target.value)}
        inputMode="numeric"
      />
      <input
        type="text"
        placeholder="Cardholder Name"
        className="border border-blue-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
        value={data.name}
        onChange={(e) => onChange({ ...data, name: e.target.value })}
      />
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="MM/YY"
          maxLength={5}
          className="border border-blue-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          value={data.expiry}
          onChange={(e) => handleExpiryChange(e.target.value)}
          inputMode="numeric"
        />
        <input
          type="password"
          placeholder="CVV"
          maxLength={4}
          className="border border-blue-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          value={data.cvv}
          onChange={(e) => handleCvvChange(e.target.value)}
          inputMode="numeric"
        />
      </div>
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