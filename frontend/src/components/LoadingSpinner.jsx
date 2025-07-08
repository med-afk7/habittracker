import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #4f46e5",
          borderTop: "4px solid transparent",
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
