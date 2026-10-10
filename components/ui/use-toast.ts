// components/ui/use-toast.ts
"use client";
import * as React from "react";

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 4000;

type ToastProps = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  open?: boolean;
};

const listeners: Array<(toasts: ToastProps[]) => void> = [];
let memoryState: ToastProps[] = [];

function emit(toasts: ToastProps[]) {
  memoryState = toasts;
  listeners.forEach((l) => l(toasts));
}

let count = 0;
const genId = () => `toast-${++count}`;

export function toast(props: Omit<ToastProps, "id">) {
  const id = genId();
  const item = { ...props, id, open: true };
  emit([item, ...memoryState].slice(0, TOAST_LIMIT));
  setTimeout(() => {
    emit(memoryState.filter((t) => t.id !== id));
  }, TOAST_REMOVE_DELAY);
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastProps[]>(memoryState);
  React.useEffect(() => {
    listeners.push(setToasts);
    return () => {
      const idx = listeners.indexOf(setToasts);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);
  return { toasts, toast };
}