"use client";

import { useState, useEffect } from "react";

export default function HaftalikHedef() {
  const [toplamCozulen, setToplamCozulen] = useState(0);
  const [hedef, setHedef] = useState(1000);

  useEffect(() => {
    const kayitliHaftalik = localStorage.getItem("haftalikToplam");
    if (kayitliHaftalik) {
      setToplamCozulen(Number(kayitliHaftalik));
    }
  }, []);

  const yuzde = Math.min(Math.round((toplamCozulen / hedef) * 100), 100);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>🎯 Haftalık Hedef Durumu</h1>
      <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "20px" }}>
        Haftalık hedeflerine ne kadar yaklaştığını takip et.
      </p>

      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "12px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontWeight: "bold", fontSize: "16px" }}>Genel Hedef İlerlemesi</span>
          <span style={{ fontWeight: "bold", fontSize: "18px", color: "#2563eb" }}>%{yuzde}</span>
        </div>

        {/* İlerleme Çubuğu */}
        <div style={{ width: "100%", backgroundColor: "var(--bg-primary)", height: "16px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
          <div style={{ width: `${yuzde}%`, backgroundColor: "#2563eb", height: "100%", transition: "width 0.3s ease" }}></div>
        </div>

        <p style={{ marginTop: "12px", fontSize: "14px", opacity: 0.8 }}>
          Hedeflenen: <strong>{hedef} Soru</strong> | Çözülen: <strong>{toplamCozulen} Soru</strong>
        </p>
      </div>
    </div>
  );
}