import { useState } from "react";
import { Button } from "@repo/ui";
import Portal from "../common/modal/Portal";
import { AnimatePresence, motion } from "framer-motion";

interface PropsType {
  open: () => void;
  close: () => void;
  title: string;
  description: string;
  positiveButton: string;
  negativeButton: string;
}

const ConfirmModal = ({
  open,
  close,
  title,
  description,
  positiveButton,
  negativeButton,
}: PropsType) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <Portal>
      <AnimatePresence onExitComplete={close}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black/50"
          >
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              onClick={(e) => e.stopPropagation()}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-1/2 bottom-8 -translate-x-1/2 w-[calc(100%-20px)] max-w-[430px] bg-white rounded-[20px] px-5 pt-9"
            >
              <h1 className="whitespace-pre-line text-headline-22-bold mb-2">
                {title}
              </h1>
              <h2 className="whitespace-pre-line text-16-regular text-black-70 mb-12">
                {description}
              </h2>
              <Button fullWidth={true} textColor="#ffffff" onClick={open}>
                {positiveButton}
              </Button>
              <Button
                fullWidth={true}
                backgroundColor="transparent"
                textColor="#888888"
                onClick={handleClose}
              >
                {negativeButton}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ConfirmModal;
