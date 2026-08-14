"use client";
import { useState, useEffect } from "react";

export default function HaftalikHedef() {
  const [hedef, setHedef] = useState("100");
  const [kaydedildi, setKaydedildi] = useState(false);

  useEffect(() => {
    const kayitliHedef = localStorage.getItem("lgs_haftalik_hedef");
    if (kayitliHedef) {
      setHedef(kayitliHedef);
    }
  }, []);

  const handleKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("lgs_haftalik_hedef", hedef);
    setKaydedildi(true);
    setTimeout(() => setKaydedildi(false), 3000);
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "600px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>🎯 Haftalık Soru Hedefi</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>Bu hafta çözmek istediğin soru sayısını kendin belirle ve hedefine odaklan!</p>

      {kaydedildi && (
        <div style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", padding: "12px", borderRadius: "8px", color: "#4ade80", marginBottom: "20px" }}>
          ✅ Haftalık hedefin başarıyla kaydedildi!
        </div>
      )}

      <form onSubmit={handleKaydet} style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>
          Bu Hafta Çözmeyi Hedeflediğin Soru Sayısı:
        </label>
        <input 
          type="number" 
          value={hedef} 
          onChange={(e) => setHedef(e.target.value)} 
          style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "#1f2937", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "16px", marginBottom: "20px", boxSizing: "border-box" }}
        />
        <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: 600, cursor: "pointer", width: "100%" }}>
          Hedefi Kaydet
        </button>
      </form>
    </div>
  );
}