"use client"

import { useState } from "react"

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

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, duration = 5000, variant = "default" }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)

    const newToast: Toast = {
      id,
      title,
      description,
      duration,
      variant,
      visible: true,
    }

    setToasts((prevToasts) => [...prevToasts, newToast])

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast)))

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
      }, 300) // Animation duration
    }, duration)
  }

  return { toast, toasts }
}
