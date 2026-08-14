"use client";

import { useState } from "react";
import Link from "next/link";

export default function KayitSayfasi() {
  const [adSoyad, setAdSoyad] = useState("");
  const [sinif, setSinif] = useState("8");
  const [eposta, setEposta] = useState("");
  const [sifre, setSifre] = useState("");

  const handleKayit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Kayıt oluşturuldu: ${adSoyad} (${sinif}. Sınıf)`);
  };

  return (
    <div style={{ maxWidth: "420px", margin: "40px auto" }}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e3a8a", marginBottom: "6px" }}>
            📝 Kayıt Ol
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Hemen üye ol ve soru takibine başla!
          </p>
        </div>

        <form onSubmit={handleKayit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#334155", fontWeight: "500" }}>
              Ad Soyad
            </label>
            <input
              type="text"
              required
              placeholder="Ahmet Yılmaz"
              value={adSoyad}
              onChange={(e) => setAdSoyad(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#334155", fontWeight: "500" }}>
              Sınıf
            </label>
            <select value={sinif} onChange={(e) => setSinif(e.target.value)} style={inputStyle}>
              <option value="5">5. Sınıf</option>
              <option value="6">6. Sınıf</option>
              <option value="7">7. Sınıf</option>
              <option value="8">8. Sınıf (LGS)</option>
            </select>
          </div>

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
            Kayıt Ol
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#64748b" }}>
          Zaten hesabın var mı?{" "}
          <Link href="/giris" style={{ color: "#1e3a8a", fontWeight: "bold", textDecoration: "none" }}>
            Giriş Yap
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