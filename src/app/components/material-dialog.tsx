import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function MaterialDialog({ 
  open, 
  onOpenChange, 
  title,
  description,
  children,
  maxWidth = "md" 
}: MaterialDialogProps) {
  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full ${maxWidthStyles[maxWidth]} mx-4`}
              >
                <div className="bg-white rounded-2xl shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
                  {title && (
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                      <div>
                        <Dialog.Title className="text-xl font-semibold">
                          {title}
                        </Dialog.Title>
                        {description && (
                          <Dialog.Description className="sr-only">
                            {description}
                          </Dialog.Description>
                        )}
                      </div>
                      <Dialog.Close className="rounded-lg p-1 hover:bg-muted transition-colors">
                        <X className="w-5 h-5" />
                      </Dialog.Close>
                    </div>
                  )}
                  {!title && !description && (
                    <Dialog.Description className="sr-only">
                      Dialog content
                    </Dialog.Description>
                  )}
                  <div className="overflow-y-auto">
                    {children}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export function MaterialDialogContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function MaterialDialogActions({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`px-6 py-4 border-t border-border flex items-center justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
}