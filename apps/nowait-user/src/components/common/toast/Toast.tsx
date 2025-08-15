import { useEffect } from "react";
import { useToastStore } from "../../../stores/toastStore";
import { motion, AnimatePresence } from "framer-motion";

const Toast = () => {
  const { message, isOpen, clearToastTimeout } = useToastStore();

  useEffect(() => {
    return () => {
      clearToastTimeout();
    };
  }, [clearToastTimeout]);

  return (
    <div className="fixed left-1/2 bottom-[118px] -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "30%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex justify-center items-center px-3.5 py-2 rounded-[999px] bg-[rgba(22,25,30,0.8)]"
      >
        <p className="text-14-medium text-white">{message}</p>
      </motion.div>
    </div>
  );
};

export default Toast;
