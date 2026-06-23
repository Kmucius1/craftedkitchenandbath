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
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  city: "",
  description: "",
  contactMethod: "Either",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #2E2820",
    borderRadius: 0,
    color: "#F5F0E8",
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
    color: "#B8AEA2",
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
          backgroundColor: "rgba(34, 62, 40, 0.25)",
          border: "1px solid rgba(74, 140, 87, 0.4)",
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
          <circle cx="22" cy="22" r="21" stroke="#4A8C57" strokeWidth="1.5" />
          <path
            d="M14 22.5L19.5 28L30 16"
            stroke="#4A8C57"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "22px",
            fontWeight: 400,
            color: "#F5F0E8",
            margin: 0,
          }}
        >
          Thank you — we&apos;ll be in touch within 24 hours.
        </p>
        <p style={{ fontSize: "13px", color: "#B8AEA2", margin: 0, lineHeight: 1.6 }}>
          One of our team members will reach out shortly to schedule your
          complimentary consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "28px" }}
    >
      {/* Row: Full Name + Email */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >
        <div style={fieldWrap}>
          <label htmlFor="fullName" style={labelStyle}>
            Full Name <span style={{ color: "#B89054" }}>*</span>
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
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.borderBottomColor = "#B89054")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderBottomColor = "#2E2820")
            }
          />
        </div>
        <div style={fieldWrap}>
          <label htmlFor="email" style={labelStyle}>
            Email Address <span style={{ color: "#B89054" }}>*</span>
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
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.borderBottomColor = "#B89054")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderBottomColor = "#2E2820")
            }
          />
        </div>
      </div>

      {/* Row: Phone + Service */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.borderBottomColor = "#B89054")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderBottomColor = "#2E2820")
            }
          />
        </div>
        <div style={fieldWrap}>
          <label htmlFor="service" style={labelStyle}>
            Service Needed <span style={{ color: "#B89054" }}>*</span>
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
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23B89054' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 4px center",
              paddingRight: "24px",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderBottomColor = "#B89054")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderBottomColor = "#2E2820")
            }
          >
            <option value="" style={{ background: "#141210" }}>
              Select a service…
            </option>
            <option value="Kitchen Remodeling" style={{ background: "#141210" }}>
              Kitchen Remodeling
            </option>
            <option value="Bathroom Remodeling" style={{ background: "#141210" }}>
              Bathroom Remodeling
            </option>
            <option
              value="Complete Interior Remodeling"
              style={{ background: "#141210" }}
            >
              Complete Interior Remodeling
            </option>
            <option
              value="Flooring Installation"
              style={{ background: "#141210" }}
            >
              Flooring Installation
            </option>
            <option value="Painting" style={{ background: "#141210" }}>
              Painting
            </option>
            <option
              value="Countertops & Cabinetry"
              style={{ background: "#141210" }}
            >
              Countertops &amp; Cabinetry
            </option>
            <option value="Multiple Services" style={{ background: "#141210" }}>
              Multiple Services
            </option>
            <option value="Other" style={{ background: "#141210" }}>
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
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#B89054")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#2E2820")}
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
            resize: "vertical",
            lineHeight: 1.7,
          }}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#B89054")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#2E2820")}
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
                color: form.contactMethod === method ? "#F5F0E8" : "#B8AEA2",
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
                    form.contactMethod === method ? "#B89054" : "#2E2820"
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
                      backgroundColor: "#B89054",
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

      {/* Submit */}
      <div style={{ paddingTop: "8px" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#B89054",
            color: "#0B0B0A",
            border: "1px solid #B89054",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "16px 40px",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#B89054";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#B89054";
            e.currentTarget.style.color = "#0B0B0A";
          }}
        >
          Send My Request
        </button>
      </div>
    </form>
  );
}
