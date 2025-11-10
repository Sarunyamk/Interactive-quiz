import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  duration: number;
  onComplete: () => void;
}

export function CountdownTimer({ duration, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const isNearEnd = timeLeft <= 3 && timeLeft > 0;

  return (
    <motion.div
      className="relative w-24 h-24 mx-auto my-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-gray-300"
        />
        <motion.circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className={isNearEnd ? "text-red-500" : "text-blue-500"}
          strokeDasharray={`${2 * Math.PI * 40}`}
          animate={{
            strokeDashoffset: (2 * Math.PI * 40) * (1 - timeLeft / duration),
          }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </svg>

      {/* เอฟเฟกต์เร้าใจตอนใกล้หมด */}
      {isNearEnd && (
        <motion.div
          className="absolute inset-0 rounded-full bg-red-500 blur-lg opacity-30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: isNearEnd ? [1, 1.4, 1] : 1,
          rotate: isNearEnd ? [0, 5, -5, 0] : 0,
          color: isNearEnd ? "#ef4444" : "white",
          textShadow: isNearEnd
            ? "0 0 15px rgba(239,68,68,0.8)"
            : "0 0 0 transparent",
        }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-4xl font-bold">{timeLeft}</span>
      </motion.div>
    </motion.div>
  );
}
