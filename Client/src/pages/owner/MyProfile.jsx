import { dummyUserData } from "../../assets/constance/constance";

const MyProfile = ({ user = dummyUserData }) => {

  return (
    <div className="px-6 py-8 min-h-screen bg-[#f8f9fb]">
      <h1 className="text-[22px] font-bold text-gray-900">My Profile</h1>
      <p className="text-sm text-gray-500 mt-1">Your account details.</p>
      <div className="mt-6 max-w-xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50 text-2xl font-semibold text-primary">{user.image ? <img src={user.image} alt={user.name} className="h-full w-full object-cover" /> : user.name?.charAt(0).toUpperCase()}</span>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
        <dl className="mt-6 space-y-5 border-t border-gray-100 pt-6">
          <div>
            <dt className="text-xs font-medium text-gray-400">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-400">Email</dt>
            <dd className="mt-1 text-sm text-gray-900 break-words">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-400">Role</dt>
            <dd className="mt-1 text-sm text-gray-900 capitalize">{user.role}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default MyProfile;