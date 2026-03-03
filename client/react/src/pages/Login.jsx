import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-strat-bg text-slate-100">
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center px-4 py-20 md:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 grid-surface opacity-10" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="glass-panel relative w-full max-w-md rounded-3xl border border-slate-800/80 bg-slate-950/80 p-8 shadow-2xl shadow-black/70"
        >
          <div className="pointer-events-none absolute inset-0 bg-panel-glow opacity-60" />
          <div className="mb-6 space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
              Welcome back to Strat_Iq
            </h1>
            <p className="text-sm text-slate-400 md:text-base">
              Sign in to access your workspace and forecasts.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="relative space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={loading}
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={loading}
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-800/80 bg-slate-950/60 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-full bg-gradient-accent px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-glow-purple transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center text-xs text-slate-400 md:text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-violet-300 underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;

