import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <BrowserRouter>
          <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 shadow">
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
              ✅ CRUD App
            </h1>
            <nav className="flex gap-6 font-medium">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
              >
                Home
              </Link>
              <Link
                to="/register"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition"
              >
                Register
              </Link>
            </nav>
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm"
            >
              {dark ? "☀ Light" : "🌙 Dark"}
            </button>
          </header>

          <main className="p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}
