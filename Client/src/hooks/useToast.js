import { useState, useCallback } from "react";

const DEFAULT_TOAST = { message: "", type: "success" };
const TOAST_DURATION_MS = 2800;

const useToast = () => {
  const [toast, setToast] = useState(DEFAULT_TOAST);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(DEFAULT_TOAST), TOAST_DURATION_MS);
  }, []);

  return { toast, showToast };
};

export default useToast;