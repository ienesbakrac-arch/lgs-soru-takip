"use client";
import { useState } from "react";

export default function LgsHesaplaPage() {
  const [puan, setPuan] = useState<number | null>(null);

  const [turkceD, setTurkceD] = useState("");
  const [turkceY, setTurkceY] = useState("");
  const [matD, setMatD] = useState("");
  const [matY, setMatY] = useState("");
  const [fenD, setFenD] = useState("");
  const [fenY, setFenY] = useState("");
  const [inkD, setInkD] = useState("");
  const [inkY, setInkY] = useState("");
  const [dinD, setDinD] = useState("");
  const [dinY, setDinY] = useState("");
  const [ingD, setIngD] = useState("");
  const [ingY, setIngY] = useState("");

  const hesapla = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Net hesaplamaları (3 yanlış 1 doğruyu götürür mantığıyla)
    const netTurkce = Math.max(0, Number(turkceD) - Number(turkceY) / 3);
    const netMat = Math.max(0, Number(matD) - Number(matY) / 3);
    const netFen = Math.max(0, Number(fenD) - Number(fenY) / 3);
    const netInk = Math.max(0, Number(inkD) - Number(inkY) / 3);
    const netDin = Math.max(0, Number(dinD) - Number(dinY) / 3);
    const netIng = Math.max(0, Number(ingD) - Number(ingY) / 3);
    
    // Tahmini LGS puan formülü katsayıları
    const tahminiPuan = 200 + (netMat * 4.9) + (netTurkce * 4.1) + (netFen * 4.1) + (netInk * 2.1) + (netDin * 2.1) + (netIng * 2.1);
    setPuan(Math.max(200, Math.min(500, Number(tahminiPuan.toFixed(2)))));
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "700px", margin: "0 auto", paddingBottom: "40px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px", fontWeight: "bold" }}>🧮 LGS Puan Hesaplama</h1>
      <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>Tüm derslerin doğru ve yanlış sayılarını girerek tahmini LGS puanını hesapla.</p>

      <form onSubmit={hesapla} style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "12px" }}>
        
        {/* Ortak Ders Satırı Oluşturucu Fonksiyon veya Tek Tek Alanlar */}
        {[
          { label: "Türkçe (20 Soru)", d: turkceD, setD: setTurkceD, y: turkceY, setY: setTurkceY },
          { label: "Matematik (20 Soru)", d: matD, setD: setMatD, y: matY, setY: setMatY },
          { label: "Fen Bilimleri (20 Soru)", d: fenD, setD: setFenD, y: fenY, setY: setFenY },
          { label: "T.C. İnkılap (10 Soru)", d: inkD, setD: setInkD, y: inkY, setY: setInkY },
          { label: "Din Kültürü (10 Soru)", d: dinD, setD: setDinD, y: dinY, setY: setDinY },
          { label: "İngilizce (10 Soru)", d: ingD, setD: setIngD, y: ingY, setY: setIngY },
        ].map((ders, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1f2937", padding: "12px 16px", borderRadius: "8px" }}>
            <span style={{ fontWeight: 600, color: "#fff", fontSize: "14px", width: "160px" }}>{ders.label}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <input type="number" placeholder="Doğru" value={ders.d} onChange={(e) => ders.setD(e.target.value)} style={{ width: "75px", padding: "8px", backgroundColor: "#111827", border: "1px solid #374151", color: "#fff", borderRadius: "6px", fontSize: "14px" }} />
              <input type="number" placeholder="Yanlış" value={ders.y} onChange={(e) => ders.setY(e.target.value)} style={{ width: "75px", padding: "8px", backgroundColor: "#111827", border: "1px solid #374151", color: "#fff", borderRadius: "6px", fontSize: "14px" }} />
            </div>
          </div>
        ))}

        <button type="submit" style={{ marginTop: "10px", width: "100%", padding: "12px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}>
          Puanı Hesapla 🎯
        </button>
      </form>

      {puan !== null && (
        <div style={{ marginTop: "20px", backgroundColor: "#111827", padding: "20px", borderRadius: "12px", border: "1px solid rgba(34, 197, 94, 0.3)", textAlign: "center" }}>
          <span style={{ color: "#94a3b8", fontSize: "14px" }}>Tahmini LGS Puanın:</span>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#4ade80", marginTop: "6px" }}>{puan} Puan</div>
        </div>
      )}
    </div>
  );
}