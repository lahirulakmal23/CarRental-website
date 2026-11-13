import { FiUser } from "react-icons/fi";

export default function CustomerProfile({ user }) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 pb-12 pt-28 sm:px-6">
      <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
      <p className="mt-1 text-sm text-gray-500">Your account details.</p>
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-primary"><FiUser aria-hidden="true" className="h-8 w-8" /></span>
          <div><h2 className="text-lg font-semibold text-gray-900">{user.name}</h2><p className="text-sm capitalize text-gray-500">{user.role}</p></div>
        </div>
        <dl className="mt-6 grid gap-5 border-t border-gray-100 pt-6 sm:grid-cols-2">
          <div><dt className="text-xs font-medium text-gray-500">Name</dt><dd className="mt-1 text-sm text-gray-900">{user.name}</dd></div>
          <div><dt className="text-xs font-medium text-gray-500">Email</dt><dd className="mt-1 break-words text-sm text-gray-900">{user.email}</dd></div>
        </dl>
      </div>
    </main>
  );
}