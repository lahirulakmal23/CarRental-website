const TOAST_STYLES = {
  error: {
    wrapper: "bg-red-50 text-red-700 border border-red-300",
    icon: "✕",
  },
  warning: {
    wrapper: "bg-yellow-50 text-yellow-800 border border-yellow-300",
    icon: "⚠",
  },
  success: {
    wrapper: "bg-green-50 text-green-800 border border-green-300",
    icon: "✓",
  },
};

const Toast = ({ message, type = "success" }) => {
  if (!message) return null;

  const { wrapper, icon } = TOAST_STYLES[type] ?? TOAST_STYLES.success;

  return (
    <div
      className={`fixed bottom-7 right-7 flex items-center gap-2 rounded-xl px-[18px] py-[11px] text-[13px] font-medium shadow-lg z-[100] animate-slideUp ${wrapper}`}
    >
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
};

export default Toast;