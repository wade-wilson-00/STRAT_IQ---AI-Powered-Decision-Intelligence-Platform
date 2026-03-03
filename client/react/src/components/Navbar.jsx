import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Revenue", href: "/revenue" },
  { label: "Churn", href: "/churn" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleNavClick = (href) => {
    navigate(href);
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(10,11,16,0.85)" : "transparent",
      }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between gap-4 rounded-full border border-slate-800/80 bg-slate-950/70 px-4 py-2.5 backdrop-blur-xl">
          <Link to="/" className="flex items-center gap-3">
            <Logo compact />
          </Link>

          <nav className="hidden items-center gap-5 text-xs font-medium uppercase tracking-[0.22em] text-slate-400 md:flex">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.href ||
                (link.href !== "/" && location.pathname.startsWith(link.href));
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`rounded-full px-3 py-1.5 transition-colors duration-150 ${
                    isActive
                    ? "bg-slate-900/80 text-violet-200 shadow-glow-purple"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-slate-100 transition hover:border-violet-400/70 hover:text-violet-200"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-gradient-accent px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-slate-950 shadow-glow-purple transition hover:brightness-110"
            >
              Request demo
            </Link>
          </div>

          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/80 text-slate-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mx-auto mt-1 max-w-6xl px-4 md:hidden"
          >
            <div className="glass-panel rounded-2xl p-3 shadow-2xl shadow-black/60">
              <div className="flex flex-col gap-1 text-[11px] font-medium uppercase tracking-[0.26em] text-slate-300">
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.href ||
                    (link.href !== "/" && location.pathname.startsWith(link.href));
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-slate-800/70 ${
                        isActive ? "bg-slate-900/80 text-cyan-300" : ""
                      }`}
                    >
                      <span>{link.label}</span>
                    </button>
                  );
                })}
                <Link
                  to="/login"
                  className="mt-1 flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-[11px] font-semibold tracking-[0.26em] text-slate-100"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="mt-1 flex items-center justify-center rounded-xl bg-gradient-accent px-3 py-2 text-[11px] font-semibold tracking-[0.26em] text-slate-950 shadow-glow-purple"
                >
                  Request demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

