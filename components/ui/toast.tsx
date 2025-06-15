"use client"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: toast.visible ? 1 : 0, y: toast.visible ? 0 : 20, scale: toast.visible ? 1 : 0.9 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-sm overflow-hidden rounded-lg border bg-white/90 shadow-md backdrop-blur-md ${
              toast.variant === "destructive" ? "border-red-200" : "border-gray-200"
            }`}
          >
            <div className="flex items-start p-4">
              <div className="flex-1">
                <h3
                  className={`text-sm font-medium ${
                    toast.variant === "destructive" ? "text-red-600" : "text-gray-900"
                  }`}
                >
                  {toast.title}
                </h3>
                {toast.description && <p className="mt-1 text-sm text-gray-500">{toast.description}</p>}
              </div>
              <button
                className="ml-4 inline-flex shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                onClick={() => {}}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
