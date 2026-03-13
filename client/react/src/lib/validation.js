/**
 * Form validation utilities for STRAT_IQ
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export const validators = {
  required: (value, label = "This field") => {
    if (value == null || String(value).trim() === "") {
      return `${label} is required`;
    }
    return null;
  },

  email: (value) => {
    if (!value || String(value).trim() === "") return null;
    if (!EMAIL_REGEX.test(String(value).trim())) {
      return "Please enter a valid email address";
    }
    return null;
  },

  password: (value) => {
    if (!value) return null;
    if (value.length < MIN_PASSWORD_LENGTH) {
      return `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }
    return null;
  },

  passwordMatch: (value, confirmValue) => {
    if (!value || !confirmValue) return null;
    if (value !== confirmValue) return "Passwords do not match";
    return null;
  },

  number: (value, opts = {}) => {
    const { min, max, required = false } = opts;
    if (!required && (value === "" || value == null)) return null;
    const num = Number(value);
    if (Number.isNaN(num)) return "Must be a valid number";
    if (min != null && num < min) return `Must be at least ${min}`;
    if (max != null && num > max) return `Must be at most ${max}`;
    return null;
  },

  range: (value, min, max) => {
    const num = Number(value);
    if (Number.isNaN(num)) return "Must be a valid number";
    if (num < min || num > max) return `Must be between ${min} and ${max}`;
    return null;
  },
};

export const validateRevenueForm = (form) => {
  const errors = {};
  const set = (k, v) => {
    if (v) errors[k] = v;
  };

  set("currentMRR", validators.required(form.currentMRR, "Current MRR") || validators.number(form.currentMRR, { min: 0 }));
  set("churnRate", form.churnRate !== "" ? validators.range(form.churnRate, 0, 100) : null);
  set("burnRate", form.burnRate !== "" ? validators.number(form.burnRate, { min: 0.1, max: 10 }) : null);
  set("cac", form.cac !== "" ? validators.number(form.cac, { min: 0, max: 36 }) : null);
  set("marketingSpend", form.marketingSpend !== "" ? validators.number(form.marketingSpend, { min: 0 }) : null);

  return Object.keys(errors).length ? errors : null;
};

export const validateChurnForm = (form) => {
  const errors = {};
  const set = (k, v) => {
    if (v) errors[k] = v;
  };

  const num = (v, opts) => (v !== "" ? validators.number(v, opts) : null);
  const range = (v, a, b) => (v !== "" ? validators.range(v, a, b) : null);

  set("engagementScore", range(form.engagementScore, 0, 1));
  set("customerAgeMonths", num(form.customerAgeMonths, { min: 0 }));
  set("supportTickets", num(form.supportTickets, { min: 0 }));
  set("productUsageScore", range(form.productUsageScore, 0, 1));

  return Object.keys(errors).length ? errors : null;
};

export const validateLoginForm = (form) => {
  const errors = {};
  const set = (k, v) => {
    if (v) errors[k] = v;
  };

  set("email", validators.required(form.email, "Email") || validators.email(form.email));
  set("password", validators.required(form.password, "Password"));

  return Object.keys(errors).length ? errors : null;
};

export const validateSignupForm = (form) => {
  const errors = {};
  const set = (k, v) => {
    if (v) errors[k] = v;
  };

  set("name", validators.required(form.name, "Name"));
  set("email", validators.required(form.email, "Email") || validators.email(form.email));
  set("password", validators.required(form.password, "Password") || validators.password(form.password));
  set("confirmPassword", validators.required(form.confirmPassword, "Confirm password") || validators.passwordMatch(form.password, form.confirmPassword));

  return Object.keys(errors).length ? errors : null;
};
