"use client"

import { useCallback, useEffect, useState } from "react"

type ToastProps = {
  title: string
  description?: string
  duration?: number
  variant?: "default" | "destructive"
}

type Toast = ToastProps & {
  id: string
  visible: boolean
}

type Listener = (toasts: Toast[]) => void

let toasts: Toast[] = []
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach((listener) => listener([...toasts]))
}

function dismissToast(id: string) {
  toasts = toasts.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast))
  emit()
  setTimeout(() => {
    toasts = toasts.filter((toast) => toast.id !== id)
    emit()
  }, 300)
}

function addToast({ title, description, duration = 5000, variant = "default" }: ToastProps) {
  const id = Math.random().toString(36).substring(2, 9)
  const newToast: Toast = { id, title, description, duration, variant, visible: true }
  toasts = [...toasts, newToast]
  emit()
  setTimeout(() => dismissToast(id), duration)
}

export function useToast() {
  const [state, setState] = useState<Toast[]>(toasts)

  useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])

  const toast = useCallback((props: ToastProps) => addToast(props), [])
  const dismiss = useCallback((id: string) => dismissToast(id), [])

  return { toast, toasts: state, dismiss }
}
