"use client";

import { useState, useEffect } from "react";

export default function PomodoroPage() {
  const [saniye, setSaniye] = useState(25 * 60);
  const [calisiyor, setCalisiyor] = useState(false);
  const [molaModu, setMolaModu] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (calisiyor && saniye > 0) {
      interval = setInterval(() => setSaniye((prev) => prev - 1), 1000);
    } else if (saniye === 0) {
      if (!molaModu) {
        alert("🎉 25 dakikalık çalışma bitti! Şimdi 5 dakika mola zamanı.");
        setMolaModu(true);
        setSaniye(5 * 60);
      } else {
        alert("⚡ Mola bitti! Yeni bir çalışma seansına başla.");
        setMolaModu(false);
        setSaniye(25 * 60);
      }
      setCalisiyor(false);
    }
    return () => clearInterval(interval);
  }, [calisiyor, saniye, molaModu]);

  const dakikaFormat = Math.floor(saniye / 60).toString().padStart(2, "0");
  const saniyeFormat = (saniye % 60).toString().padStart(2, "0");

  const sifirla = () => {
    setCalisiyor(false);
    setSaniye(molaModu ? 5 * 60 : 25 * 60);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "var(--text-primary)" }}>🍅 Pomodoro Zamanlayıcı</h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>25 dakika odaklanarak çalış, 5 dakika mola ver!</p>
      </div>

      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "40px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
        <span style={{ fontSize: "14px", fontWeight: "bold", padding: "6px 14px", borderRadius: "20px", backgroundColor: molaModu ? "rgba(22, 163, 74, 0.1)" : "rgba(37, 99, 235, 0.1)", color: molaModu ? "#16a34a" : "#2563eb" }}>
          {molaModu ? "☕ Mola Zamanı" : "📚 Odaklanma Zamanı"}
        </span>

        <h2 style={{ fontSize: "64px", fontWeight: "bold", margin: 0, color: "var(--text-primary)", fontFamily: "monospace" }}>
          {dakikaFormat}:{saniyeFormat}
        </h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setCalisiyor(!calisiyor)} style={{ backgroundColor: calisiyor ? "#d97706" : "#2563eb", color: "white", border: "none", padding: "12px 28px", borderRadius: "10px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>
            {calisiyor ? "⏸️ Duraklat" : "▶️ Başlat"}
          </button>
          <button onClick={sifirla} style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border-color)", padding: "12px 20px", borderRadius: "10px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>
            🔄 Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
}