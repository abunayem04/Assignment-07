import toast, { ToastOptions } from "react-hot-toast";

interface StoredToast {
  type: "success" | "error";
  message: string;
  id?: string;
  timestamp: number;
}

const STORAGE_KEY = "bazardor_pending_toast";

export function showToast(
  type: "success" | "error",
  message: string,
  options?: ToastOptions & { persistNextPage?: boolean }
) {
  const { persistNextPage, ...toastOptions } = options || {};
  const toastId = toastOptions?.id || (persistNextPage ? `toast-${encodeURIComponent(message.slice(0, 20))}` : undefined);
  const finalOptions: ToastOptions = {
    ...toastOptions,
    ...(toastId ? { id: toastId } : {}),
  };

  if (persistNextPage && typeof window !== "undefined") {
    try {
      const data: StoredToast = {
        type,
        message,
        id: toastId,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }

  if (type === "success") {
    return toast.success(message, finalOptions);
  }
  return toast.error(message, finalOptions);
}

export function checkAndShowPendingToast() {
  if (typeof window === "undefined") return;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    sessionStorage.removeItem(STORAGE_KEY);

    const data: StoredToast = JSON.parse(raw);
    if (Date.now() - data.timestamp < 6000) {
      if (data.type === "success") {
        toast.success(data.message, { id: data.id });
      } else {
        toast.error(data.message, { id: data.id });
      }
    }
  } catch {}
}
