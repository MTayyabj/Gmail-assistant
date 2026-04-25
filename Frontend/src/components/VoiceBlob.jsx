import { motion } from "framer-motion";

export default function VoiceBlob({ isSpeaking }) {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.15, 1] : 1,
        }}
        transition={{
          repeat: isSpeaking ? Infinity : 0,
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="h-72 w-72 rounded-full 
                   bg-gradient-to-br 
                   from-[var(--color-primary)] 
                   to-[var(--color-tertiary)]
                   shadow-[0_0_80px_var(--color-primary)]"
      />
    </div>
  );
}

