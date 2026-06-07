export const STATUS = {
  pending: {
    label: "Pending",
    wrapper: "bg-yellow-50 text-yellow-800 border border-yellow-300",
    dot: "bg-yellow-400",
  },
  confirmed: {
    label: "Confirmed",
    wrapper: "bg-green-50 text-green-800 border border-green-300",
    dot: "bg-green-400",
  },
  cancelled: {
    label: "Cancelled",
    wrapper: "bg-red-50 text-red-800 border border-red-300",
    dot: "bg-red-400",
  },
  completed: {
    label: "Completed",
    wrapper: "bg-blue-50 text-blue-800 border border-blue-300",
    dot: "bg-blue-400",
  },
};

// Payment only shows "confirmed" status as per requirements
export const PAYMENT = {
  confirmed: {
    label: "Confirmed",
    wrapper: "bg-green-50 text-green-800 border border-green-300",
  },
  pending: {
    label: "Pending",
    wrapper: "bg-yellow-50 text-yellow-800 border border-yellow-300",
  },
  failed: {
    label: "Failed",
    wrapper: "bg-red-50 text-red-800 border border-red-300",
  },
};

export const DATE_FORMAT_OPTIONS = { day: "numeric", month: "short", year: "numeric" };