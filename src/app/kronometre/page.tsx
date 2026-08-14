"use client";

import { useState, useEffect } from "react";

export default function Kronometre() {
  const [saniye, setSaniye] = useState(0);
  const [calisiyor, setCalisiyor] = useState(false);
  const [mod, setMod] = useState<"kronometre" | "pomodoro">("kronometre");
  const [kalanSaniye, setKalanSaniye] = useState(25 * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (calisiyor) {
      interval = setInterval(() => {
        if (mod === "kronometre") {
          setSaniye((prev) => prev + 1);
        } else {
          setKalanSaniye((prev) => {
            if (prev <= 1) {
              setCalisiyor(false);
              alert("🎉 Pomodoro süren doldu! Mola verebilirsin.");
              return 25 * 60;
            }
            return prev - 1;
          });
        }
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [calisiyor, mod]);

  const zamanFormatla = (toplamSaniye: number) => {
    const saat = Math.floor(toplamSaniye / 3600);
    const dk = Math.floor((toplamSaniye % 3600) / 60);
    const sn = toplamSaniye % 60;
    const pad = (num: number) => String(num).padStart(2, "0");

    if (saat > 0) {
      return `${pad(saat)}:${pad(dk)}:${pad(sn)}`;
    }
    return `${pad(dk)}:${pad(sn)}`;
  };

  const sifirla = () => {
    setCalisiyor(false);
    setSaniye(0);
    setKalanSaniye(25 * 60);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>
        ⏱️ Ders Çalışma Sayaçları
      </h1>
      <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "24px" }}>
        Soru çözerken zaman tut veya 25 dakikalık Pomodoro tekniğiyle odaklan.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "24px" }}>
        <button
          onClick={() => { setMod("kronometre"); setCalisiyor(false); }}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: mod === "kronometre" ? "#2563eb" : "var(--bg-card)",
            color: mod === "kronometre" ? "white" : "var(--text-primary)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          ⏱️ Normal Kronometre
        </button>

        <button
          onClick={() => { setMod("pomodoro"); setCalisiyor(false); }}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: mod === "pomodoro" ? "#2563eb" : "var(--bg-card)",
            color: mod === "pomodoro" ? "white" : "var(--text-primary)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          🍅 Pomodoro (25 Dk)
        </button>
      </div>

      <div style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "16px",
        padding: "40px 20px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        marginBottom: "24px"
      }}>
        <h2 style={{ fontSize: "56px", fontWeight: "bold", margin: 0, fontFamily: "monospace", color: "#2563eb" }}>
          {mod === "kronometre" ? zamanFormatla(saniye) : zamanFormatla(kalanSaniye)}
        </h2>
        <span style={{ fontSize: "14px", opacity: 0.7, marginTop: "8px", display: "block" }}>
          {mod === "kronometre" ? "Geçen Süre" : "Kalan Süre"}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <button
          onClick={() => setCalisiyor(!calisiyor)}
          style={{
            backgroundColor: calisiyor ? "#eab308" : "#16a34a",
            color: "white",
            border: "none",
            padding: "12px 28px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {calisiyor ? "⏸️ Duraklat" : "▶️ Başlat"}
        </button>

        <button
          onClick={sifirla}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🔄 Sıfırla
        </button>
      </div>
    </div>
  );
}