"use client";
import { useState, useEffect } from "react";

export default function HaftalikHedef() {
  const [hedef, setHedef] = useState("500");
  const [toplam, setToplam] = useState(0);

  useEffect(() => {
    // Sayfa açıldığında değerleri al
    const savedHedef = localStorage.getItem("lgs_haftalik_hedef") || "500";
    const savedToplam = Number(localStorage.getItem("lgs_cozulen_soru") || "0");
    setHedef(savedHedef);
    setToplam(savedToplam);
  }, []);

  const hedefiKaydet = (yeniHedef: string) => {
    setHedef(yeniHedef);
    localStorage.setItem("lgs_haftalik_hedef", yeniHedef);
  };

  const yuzde = Math.min((toplam / Number(hedef)) * 100, 100);

  return (
    <div style={{ color: "#fff", padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>🎯 Haftalık Hedef</h1>
      <div style={{ background: "#111827", padding: "20px", borderRadius: "16px" }}>
        <p>Hedef: {hedef} Soru</p>
        <input 
          type="number" 
          value={hedef} 
          onChange={(e) => hedefiKaydet(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "#1f2937", border: "none", color: "#fff" }}
        />
        
        <div style={{ marginTop: "20px" }}>
          <p>İlerleme: %{yuzde.toFixed(0)}</p>
          <div style={{ background: "#374151", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
            <div style={{ width: `${yuzde}%`, background: "#2563eb", height: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}