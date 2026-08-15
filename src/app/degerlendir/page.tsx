"use client";
import { useState } from "react";

export default function Degerlendir() {
  const [puan, setPuan] = useState<number>(10);
  const [yorum, setYorum] = useState("");
  const [gonderildi, setGonderildi] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGonderildi(true);
    setYorum("");
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "600px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>⭐ Bizi Değerlendir</h1>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Uygulamamızı 10 üzerinden puanlayarak gelişimimize destek ol!</p>

      {gonderildi && (
        <div style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", padding: "12px", borderRadius: "8px", color: "#4ade80", marginBottom: "20px" }}>
          🎉 Değerlendirmen ({puan}/10) başarıyla alındı! Teşekkür ederiz!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
        
        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>
          1 ile 10 Arasında Puan Ver: <span style={{ color: "#38bdf8", fontWeight: "bold", fontSize: "18px" }}>{puan} / 10</span>
        </label>
        
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={puan} 
          onChange={(e) => setPuan(Number(e.target.value))}
          style={{ width: "100%", marginBottom: "20px", cursor: "pointer" }}
        />

        <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>Görüş ve Önerilerin:</label>
        <textarea 
          value={yorum}
          onChange={(e) => setYorum(e.target.value)}
          placeholder="Uygulama hakkında eklemek istediklerin..."
          style={{ width: "100%", height: "100px", padding: "12px", borderRadius: "8px", backgroundColor: "#1f2937", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "15px", marginBottom: "16px", boxSizing: "border-box" }}
          required
        />

        <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: 600, cursor: "pointer", width: "100%" }}>
          Değerlendirmeyi Gönder
        </button>
      </form>
    </div>
  );
}