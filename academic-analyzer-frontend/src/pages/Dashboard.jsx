import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-dark text-white">
      {/* Centered Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <motion.div
          className="text-center max-w-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">
            Academic Analyzer
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Your gateway to smart research discovery. Analyze academic trends using AI-powered topic modeling. Clean UI, deep insights.
          </p>

          {/* ✅ Redirect to Sign Up */}
          <Link
            to="/signup"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            🔍 Get Started
          </Link>
        </motion.div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-black text-gray-600 text-sm text-center py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Academic Analyzer. Built with 💙 by Loise Dev.
      </footer>
    </div>
  );
}
