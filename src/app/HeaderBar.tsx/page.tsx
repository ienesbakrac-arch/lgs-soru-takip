"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HeaderBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [kullanici, setKullanici] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    const girisYapan = localStorage.getItem("kullaniciAdi");
    if (girisYapan) {
      setKullanici(girisYapan);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const cikisYap = () => {
    localStorage.removeItem("kullaniciAdi");
    setKullanici(null);
    window.location.reload();
  };

  return (
    <header style={{
      height: "60px",
      backgroundColor: "var(--header-bg)",
      borderBottom: "1px solid var(--border-color)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 24px",
      position: "sticky",
      top: 0,
      zIndex: 5,
    }}>
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: darkMode ? "#334155" : "#e2e8f0",
          color: darkMode ? "#f8fafc" : "#0f172a",
          border: "none",
          padding: "6px 12px",
          borderRadius: "16px",
          fontWeight: "600",
          fontSize: "13px",
          cursor: "pointer"
        }}
      >
        {darkMode ? "🌙 Koyu Tema" : "☀️ Açık Tema"}
      </button>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {kullanici ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>👤 {kullanici}</span>
            <button onClick={cikisYap} style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}>
              Çıkış
            </button>
          </div>
        ) : (
          <>
            <Link href="/giris" style={loginBtnStyle}>Giriş Yap</Link>
            <Link href="/kayit" style={registerBtnStyle}>Kayıt Ol</Link>
          </>
        )}
      </div>
    </header>
  );
}

const loginBtnStyle: React.CSSProperties = {
  color: "#1e3a8a",
  textDecoration: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid #1e3a8a",
  fontWeight: "600",
  fontSize: "13px",
};

const registerBtnStyle: React.CSSProperties = {
  color: "white",
  backgroundColor: "#2563eb",
  textDecoration: "none",
  padding: "6px 14px",
  borderRadius: "6px",
  fontWeight: "600",
  fontSize: "13px",
};