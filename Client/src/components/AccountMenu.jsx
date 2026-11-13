import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiCalendar, FiLogOut, FiChevronDown } from "react-icons/fi";

export default function AccountMenu({ user, onLogout, transparent }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const itemClass = "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary";

  return (
    <div ref={containerRef} className="relative" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open profile menu"
        aria-expanded={open}
        aria-controls="account-dropdown"
        onClick={() => setOpen((current) => !current)}
        className={`flex h-10 cursor-pointer items-center gap-1 rounded-full border px-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${transparent ? "border-white/50 bg-white/10 text-white hover:bg-white/20" : "border-blue-100 bg-blue-50 text-primary hover:bg-blue-100"}`}
      >
        <FiUser aria-hidden="true" className="h-5 w-5" />
        <FiChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id="account-dropdown" className="absolute right-0 top-full z-50 mt-3 w-56 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
          <div className="mb-1 border-b border-gray-100 px-3 py-2">
            <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>
          <Link to={user.role === "owner" ? "/owner/profile" : "/my-profile"} onClick={() => setOpen(false)} className={itemClass}>
            <FiUser aria-hidden="true" /> My Profile
          </Link>
          <Link to={user.role === "owner" ? "/owner" : "/my-bookings"} onClick={() => setOpen(false)} className={itemClass}>
            <FiCalendar aria-hidden="true" /> {user.role === "owner" ? "Owner Dashboard" : "My Bookings"}
          </Link>
          <button type="button" onClick={() => { setOpen(false); onLogout(); }} className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-500">
            <FiLogOut aria-hidden="true" /> Log Out
          </button>
        </div>
      )}
    </div>
  );
}