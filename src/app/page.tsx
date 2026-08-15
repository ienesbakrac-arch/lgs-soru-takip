"use client";
import { useState, useEffect } from "react";

export default function AnaSayfa() {
  const [haftalikHedef, setHaftalikHedef] = useState("100");
  const [toplamSoru, setToplamSoru] = useState(0);

  useEffect(() => {
    // Kayıtlı hedefi al
    const hedef = localStorage.getItem("lgs_haftalik_hedef");
    if (hedef) {
      setHaftalikHedef(hedef);
    }

    // Toplam çözülen soruyu yanlışlar/sorular sayfasından hesapla
    const yanlislar = localStorage.getItem("lgs_yanlislar");
    if (yanlislar) {
      try {
        const parsed = JSON.parse(yanlislar);
        if (Array.isArray(parsed)) {
          setToplamSoru(parsed.length);
        }
      } catch (e) {}
    }
  }, []);

  return (
    <div style={{ color: "#f8fafc", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>👋 Hoş Geldin, LGS Asistanı'na!</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>Hedefine ulaşmak için bugün harika bir gün.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "30px" }}>
        
        {/* Haftalık Hedef Kartı */}
        <div style={{ backgroundColor: "#111827", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>Haftalık Soru Hedefin</span>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#38bdf8", marginTop: "8px" }}>
            {haftalikHedef} Soru
          </div>
        </div>

        {/* Çözülen Soru Kartı */}
        <div style={{ backgroundColor: "#111827", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>Toplam Çözülen Soru</span>
          <div style={{ fontSize: "28px", fontWeight: "bold", color: "#22c55e", marginTop: "8px" }}>
            {toplamSoru} Soru
          </div>
        </div>

      </div>
    </div>
  );
}