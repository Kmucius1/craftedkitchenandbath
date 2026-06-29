"use client";

import { useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  city: string;
  description: string;
  contactMethod: string;
  company: string; // honeypot — kept empty by real users, filled by bots
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  city: "",
  description: "",
  contactMethod: "Either",
  company: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(
          (data && data.error) ||
            "Something went wrong. Please call us at (727) 383-7550."
        );
      }
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us at (727) 383-7550."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.18)",
    borderRadius: 0,
    color: "#1A202C",
    fontSize: "14px",
    letterSpacing: "0.02em",
    padding: "12px 0",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "10px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#6B7280",
    marginBottom: "4px",
    fontWeight: 500,
  };

  const fieldWrap: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0",
  };

  if (submitted) {
    return (
      <div
        style={{
          backgroundColor: "#EBF4FF",
          border: "1px solid rgba(43,124,193,0.3)",
          borderRadius: "2px",
          padding: "48px 32px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="22" cy="22" r="21" stroke="#2B7CC1" strokeWidth="1.5" />
          <path
            d="M14 22.5L19.5 28L30 16"
            stroke="#2B7CC1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          style={{
            fontFamily: "var(--font-display), 'Montserrat', system-ui, sans-serif",
            fontSize: "22px",
            fontWeight: 300,
            color: "#1A202C",
            margin: 0,
          }}
        >
          Thank you — we&apos;ll be in touch within 24 hours.
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "#4A5568",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          One of our team members will reach out shortly to schedule your
          complimentary consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "28px" }}
    >
      {/* Honeypot — hidden from real users; bots that fill it are rejected server-side */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={handleChange}
        />
      </div>

      {/* Row: Full Name + Email */}
      <div
        className="row-2"
        style={{
          display: "grid",
          gap: "24px",
        }}
      >
        <div style={fieldWrap}>
          <label htmlFor="fullName" style={labelStyle}>
            Full Name <span style={{ color: "#2B7CC1" }}>*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            placeholder="Jane Smith"
            autoComplete="name"
            style={{ ...inputStyle, color: "#1A202C" }}
            onFocus={(e) =>
              (e.currentTarget.style.borderBottomColor = "#2B7CC1")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.18)")
            }
          />
        </div>
        <div style={fieldWrap}>
          <label htmlFor="email" style={labelStyle}>
            Email Address <span style={{ color: "#2B7CC1" }}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            autoComplete="email"
            style={{ ...inputStyle, color: "#1A202C" }}
            onFocus={(e) =>
              (e.currentTarget.style.borderBottomColor = "#2B7CC1")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.18)")
            }
          />
        </div>
      </div>

      {/* Row: Phone + Service */}
      <div
        className="row-2"
        style={{
          display: "grid",
          gap: "24px",
        }}
      >
        <div style={fieldWrap}>
          <label htmlFor="phone" style={labelStyle}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="(727) 000-0000"
            autoComplete="tel"
            style={{ ...inputStyle, color: "#1A202C" }}
            onFocus={(e) =>
              (e.currentTarget.style.borderBottomColor = "#2B7CC1")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.18)")
            }
          />
        </div>
        <div style={fieldWrap}>
          <label htmlFor="service" style={labelStyle}>
            Service Needed <span style={{ color: "#2B7CC1" }}>*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            style={{
              ...inputStyle,
              cursor: "pointer",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%231A202C' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 4px center",
              paddingRight: "24px",
              color: "#1A202C",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderBottomColor = "#2B7CC1")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.18)")
            }
          >
            <option value="" style={{ background: "#FFFFFF", color: "#6B7280" }}>
              Select a service…
            </option>
            <option
              value="Kitchen Remodeling"
              style={{ background: "#FFFFFF", color: "#1A202C" }}
            >
              Kitchen Remodeling
            </option>
            <option
              value="Bathroom Remodeling"
              style={{ background: "#FFFFFF", color: "#1A202C" }}
            >
              Bathroom Remodeling
            </option>
            <option
              value="Complete Interior Remodeling"
              style={{ background: "#FFFFFF", color: "#1A202C" }}
            >
              Complete Interior Remodeling
            </option>
            <option
              value="Flooring Installation"
              style={{ background: "#FFFFFF", color: "#1A202C" }}
            >
              Flooring Installation
            </option>
            <option value="Painting" style={{ background: "#FFFFFF", color: "#1A202C" }}>
              Painting
            </option>
            <option
              value="Multiple Services"
              style={{ background: "#FFFFFF", color: "#1A202C" }}
            >
              Multiple Services
            </option>
            <option value="Other" style={{ background: "#FFFFFF", color: "#1A202C" }}>
              Other
            </option>
          </select>
        </div>
      </div>

      {/* Project City */}
      <div style={fieldWrap}>
        <label htmlFor="city" style={labelStyle}>
          Project Location / City
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={form.city}
          onChange={handleChange}
          placeholder="e.g. Oldsmar, Tampa, Clearwater"
          style={{ ...inputStyle, color: "#1A202C" }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#2B7CC1")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.18)")}
        />
      </div>

      {/* Project Description */}
      <div style={fieldWrap}>
        <label htmlFor="description" style={labelStyle}>
          Project Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Tell us about your space, goals, timeline, or any special considerations…"
          style={{
            ...inputStyle,
            resize: "none",
            lineHeight: 1.7,
            color: "#1A202C",
          }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#2B7CC1")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.18)")}
        />
      </div>

      {/* Preferred Contact Method */}
      <div style={fieldWrap}>
        <span
          style={{
            ...labelStyle,
            display: "block",
            marginBottom: "14px",
          }}
        >
          Preferred Contact Method
        </span>
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
          {(["Phone", "Email", "Either"] as const).map((method) => (
            <label
              key={method}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                fontSize: "13px",
                color: form.contactMethod === method ? "#1A202C" : "#6B7280",
                letterSpacing: "0.04em",
                transition: "color 0.2s ease",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  border: `1.5px solid ${
                    form.contactMethod === method ? "#2B7CC1" : "rgba(0,0,0,0.18)"
                  }`,
                  flexShrink: 0,
                  transition: "border-color 0.2s ease",
                  position: "relative",
                }}
              >
                {form.contactMethod === method && (
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "#2B7CC1",
                    }}
                  />
                )}
              </span>
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={form.contactMethod === method}
                onChange={handleChange}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p
          role="alert"
          style={{
            fontSize: "13px",
            color: "#B91C1C",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <div style={{ paddingTop: "8px" }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            backgroundColor: submitting ? "#7FA9CB" : "#2B7CC1",
            color: "#FFFFFF",
            border: "none",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "16px 32px",
            cursor: submitting ? "default" : "pointer",
            fontFamily: "inherit",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (!submitting) e.currentTarget.style.backgroundColor = "#1E5C96";
          }}
          onMouseLeave={(e) => {
            if (!submitting) e.currentTarget.style.backgroundColor = "#2B7CC1";
          }}
        >
          {submitting ? "Sending…" : "Send My Request"}
        </button>
      </div>
    </form>
  );
}
