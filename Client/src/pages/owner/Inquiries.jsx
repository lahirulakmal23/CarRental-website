import { FiMessageSquare } from "react-icons/fi";

const Inquiries = () => (
  <div className="min-h-full bg-[#f8f9fb] px-6 py-8">
    <h1 className="text-[22px] font-bold text-gray-900">Inquiries</h1>
    <p className="mt-1 text-sm text-gray-500">Customer questions and messages.</p>
    <div className="mt-6 rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
      <FiMessageSquare aria-hidden="true" className="mx-auto h-9 w-9 text-gray-400" />
      <h2 className="mt-3 text-sm font-semibold text-gray-900">No inquiries yet</h2>
    </div>
  </div>
);

export default Inquiries;