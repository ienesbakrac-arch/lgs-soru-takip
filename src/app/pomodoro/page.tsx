"use client";
import { useState, useEffect } from "react";

export default function PomodoroPage() {
  const CALISMA_SURESI = 40 * 60; // 40 dakika
  const DINLENME_SURESI = 10 * 60; // 10 dakika

  const [kalanSaniye, setKalanSaniye] = useState(CALISMA_SURESI);
  const [mod, setMod] = useState<"calisma" | "dinlenme">("calisma");
  const [aktif, setAktif] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (aktif && kalanSaniye > 0) {
      timer = setInterval(() => {
        setKalanSaniye((s) => s - 1);
      }, 1000);
    } else if (kalanSaniye === 0) {
      if (mod === "calisma") {
        alert("🎉 40 dakikalık çalışma bitti! Şimdi 10 dakika dinlenme zamanı.");
        setMod("dinlenme");
        setKalanSaniye(DINLENME_SURESI);
      } else {
        alert("⚡ Dinlenme bitti! Tekrar çalışma vakti, hadi başlayaalım!");
        setMod("calisma");
        setKalanSaniye(CALISMA_SURESI);
      }
      setAktif(false);
    }
    return () => clearInterval(timer);
  }, [aktif, kalanSaniye, mod]);

  const formatiDuzenle = (saniye: number) => {
    const dk = Math.floor(saniye / 60);
    const sn = saniye % 60;
    return `${dk.toString().padStart(2, "0")}:${sn.toString().padStart(2, "0")}`;
  };

  const moduDegistir = (yeniMod: "calisma" | "dinlenme") => {
    setAktif(false);
    setMod(yeniMod);
    setKalanSaniye(yeniMod === "calisma" ? CALISMA_SURESI : DINLENME_SURESI);
  };

  return (
    <div style={{ maxWidth: "650px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>🍅 Pomodoro Odak Asistanı</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>Staj ve LGS temposu için **40 dk Çalışma / 10 dk Dinlenme** kuralı.</p>

      {/* Mod Seçim Butonları */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "25px" }}>
        <button 
          onClick={() => moduDegistir("calisma")}
          style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: mod === "calisma" ? "#2563eb" : "#1e293b", color: "#fff", fontWeight: "600", cursor: "pointer" }}
        >
          Çalışma (40 dk) 📚
        </button>
        <button 
          onClick={() => moduDegistir("dinlenme")}
          style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: mod === "dinlenme" ? "#22c55e" : "#1e293b", color: "#fff", fontWeight: "600", cursor: "pointer" }}
        >
          Dinlenme (10 dk) ☕
        </button>
      </div>

      {/* Sayaç Kartı */}
      <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)", padding: "45px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
        <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: "20px", background: mod === "calisma" ? "rgba(37, 99, 235, 0.15)" : "rgba(34, 197, 94, 0.15)", color: mod === "calisma" ? "#38bdf8" : "#4ade80", fontSize: "13px", fontWeight: "600", marginBottom: "20px" }}>
          {mod === "calisma" ? "🔥 Odaklanma Vakti" : "☕ Mola Zamanı"}
        </span>

        <div style={{ fontSize: "64px", fontWeight: "800", color: "#f8fafc", fontFamily: "monospace", marginBottom: "30px", letterSpacing: "2px" }}>
          {formatiDuzenle(kalanSaniye)}
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          {!aktif ? (
            <button onClick={() => setAktif(true)} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}>
              Başlat ▶
            </button>
          ) : (
            <button onClick={() => setAktif(false)} style={{ background: "#eab308", color: "#000", border: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}>
              Durdur ⏸
            </button>
          )}
          <button onClick={() => { setAktif(false); setKalanSaniye(mod === "calisma" ? CALISMA_SURESI : DINLENME_SURESI); }} style={{ background: "#334155", color: "#fff", border: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}>
            Sıfırla 🔄
          </button>
        </div>
      </div>
    </div>
  );
}