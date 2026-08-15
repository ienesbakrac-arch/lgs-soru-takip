"use client";
import { useState, useEffect } from "react";

export default function Pomodoro() {
  const [dakika, setDakika] = useState(25);
  const [saniye, setSaniye] = useState(0);
  const [aktif, setAktif] = useState(false);
  const [toplamDakika, setToplamDakika] = useState(0);

  useEffect(() => {
    // Kayıtlı toplam çalışma süresini alalım
    const kayitliSure = localStorage.getItem("lgs_toplam_calisma_suresi");
    if (kayitliSure) {
      setToplamDakika(Number(kayitliSure));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (aktif) {
      interval = setInterval(() => {
        if (saniye > 0) {
          setSaniye(saniye - 1);
        } else if (dakika > 0) {
          setDakika(dakika - 1);
          setSaniye(59);
        } else {
          setAktif(false);
          alert("Tebrikler! Bir Pomodoro seansını tamamladın! 🎉");
          const yeniSure = toplamDakika + 25;
          setToplamDakika(yeniSure);
          localStorage.setItem("lgs_toplam_calisma_suresi", yeniSure.toString());
          setDakika(25);
          setSaniye(0);
        }
      }, 1000);
    } else if (!aktif && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [aktif, dakika, saniye, toplamDakika]);

  const sureyiSifirla = () => {
    setAktif(false);
    setDakika(25);
    setSaniye(0);
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "600px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>🍅 Pomodoro Çalışma Asistanı</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>25 dakika odaklan, 5 dakika mola ver. Başarı adım adım gelir!</p>

      <div style={{ backgroundColor: "#111827", padding: "40px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "24px" }}>
        <div style={{ fontSize: "64px", fontWeight: "bold", color: "#38bdf8", marginBottom: "20px" }}>
          {String(dakika).padStart(2, "0")}:{String(saniye).padStart(2, "0")}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button 
            onClick={() => setAktif(!aktif)} 
            style={{ backgroundColor: aktif ? "#dc2626" : "#2563eb", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "16px" }}
          >
            {aktif  ? "Durdur ⏸️" : "Başlat ▶️"}
          </button>
          <button 
            onClick={sureyiSifirla} 
            style={{ backgroundColor: "#1f2937", color: "#f87171", border: "1px solid rgba(255,255,255,0.1)", padding: "12px 20px", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "16px" }}
          >
            Sıfırla 🔄
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(37, 99, 235, 0.1)", border: "1px solid rgba(37, 99, 235, 0.3)", padding: "16px", borderRadius: "12px" }}>
        <span style={{ fontSize: "14px", color: "#93c5fd" }}>Bugüne Kadar Toplam Çalışma Süren: </span>
        <strong style={{ fontSize: "18px", color: "#ffffff" }}>{toplamDakika} Dakika ⏱️</strong>
      </div>
    </div>
  );
}