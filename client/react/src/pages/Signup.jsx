import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Field from "../components/forms/Field.jsx";
import SubmitButton from "../components/forms/SubmitButton.jsx";
import { validateSignupForm } from "../lib/validation.js";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignupForm(form);
    if (validationErrors) {
      setErrors(validationErrors);
      toast.error("Please fix the form errors");
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      toast.success("Account created! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
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
              Join Strat_Iq
            </h1>
            <p className="text-sm text-slate-400 md:text-base">
              Create a workspace to forecast revenue and churn.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="relative space-y-4">
            <Field
              label="Name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              error={errors.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              error={errors.email}
            />
            <Field
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              error={errors.password}
            />
            <Field
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              error={errors.confirmPassword}
            />
            <SubmitButton loading={loading}>
              {loading ? "Creating account..." : "Sign up"}
            </SubmitButton>
          </form>
          <div className="mt-4 text-center text-xs text-slate-400 md:text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-violet-300 underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
