"use client";

import { useState } from "react";
import Link from "next/link";

export default function GirisSayfasi() {
  const [eposta, setEposta] = useState("");
  const [sifre, setSifre] = useState("");

  const handleGiris = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Giriş yapıldı: ${eposta}`);
  };

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto" }}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e3a8a", marginBottom: "6px" }}>
            🔑 Giriş Yap
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Soru takip sistemine hoş geldin!
          </p>
        </div>

        <form onSubmit={handleGiris} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#334155", fontWeight: "500" }}>
              E-posta Adresi
            </label>
            <input
              type="email"
              required
              placeholder="ornek@ogrenci.com"
              value={eposta}
              onChange={(e) => setEposta(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#334155", fontWeight: "500" }}>
              Şifre
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={btnStyle}>
            Giriş Yap
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#64748b" }}>
          Hesabın yok mu?{" "}
          <Link href="/kayit" style={{ color: "#1e3a8a", fontWeight: "bold", textDecoration: "none" }}>
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "32px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box"
};

const btnStyle: React.CSSProperties = {
  backgroundColor: "#1e3a8a",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  fontSize: "15px",
  cursor: "pointer",
  marginTop: "8px"
};