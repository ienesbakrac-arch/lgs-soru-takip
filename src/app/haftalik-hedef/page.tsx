"use client";
import { useState, useEffect } from "react";

export default function HaftalikHedefPage() {
  const [toplamHedef, setToplamHedef] = useState<number>(500);
  const [cozulenSoru, setCozulenSoru] = useState<number>(120);
  const [inputHedef, setInputHedef] = useState<string>("");

  useEffect(() => {
    const kayitliHedef = localStorage.getItem("lgs_toplam_hedef");
    const kayitliCozulen = localStorage.getItem("lgs_cozulen_soru");
    if (kayitliHedef) setToplamHedef(Number(kayitliHedef));
    if (kayitliCozulen) setCozulenSoru(Number(kayitliCozulen));
  }, []);

  const hedefiGuncelle = (e: React.FormEvent) => {
    e.preventDefault();
    const yeniSayi = Number(inputHedef);
    if (yeniSayi > 0) {
      setToplamHedef(yeniSayi);
      localStorage.setItem("lgs_toplam_hedef", yeniSayi.toString());
      setInputHedef("");
    }
  };

  const soruEkle = (miktar: number) => {
    const yeniToplam = cozulenSoru + miktar;
    setCozulenSoru(yeniToplam);
    localStorage.setItem("lgs_cozulen_soru", yeniToplam.toString());
  };

  const yuzde = Math.min(Math.round((cozulenSoru / toplamHedef) * 100), 100);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>🎯 Profesyonel Haftalık Hedef Paneli</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>Staj ve LGS temposuna uygun haftalık hedeflerini belirle ve anlık takip et.</p>

      {/* İlerleme Kartı */}
      <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)", padding: "25px", borderRadius: "16px", marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <span style={{ fontSize: "15px", fontWeight: "600", color: "#f8fafc" }}>Haftalık İlerleme Durumu</span>
          <span style={{ fontSize: "18px", fontWeight: "700", color: "#38bdf8" }}>{cozulenSoru} / {toplamHedef} Soru (%{yuzde})</span>
        </div>
        
        {/* İlerleme Çubuğu */}
        <div style={{ width: "100%", height: "12px", background: "#1e293b", borderRadius: "6px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ width: `${yuzde}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #22c55e)", transition: "width 0.4s ease" }}></div>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={() => soruEkle(10)} style={{ background: "#1e293b", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>+10 Soru Ekle</button>
          <button onClick={() => soruEkle(25)} style={{ background: "#1e293b", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>+25 Soru Ekle</button>
          <button onClick={() => soruEkle(50)} style={{ background: "#1e293b", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}>+50 Soru Ekle</button>
        </div>
      </div>

      {/* Hedef Değiştirme Formu */}
      <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)", padding: "25px", borderRadius: "16px" }}>
        <h3 style={{ fontSize: "16px", color: "#f8fafc", marginBottom: "12px" }}>Yeni Haftalık Hedef Belirle</h3>
        <form onSubmit={hedefiGuncelle} style={{ display: "flex", gap: "10px" }}>
          <input 
            type="number" 
            value={inputHedef} 
            onChange={(e) => setInputHedef(e.target.value)}
            placeholder="Örn: 600"
            style={{ flex: 1, padding: "12px", background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", outline: "none" }}
          />
          <button type="submit" style={{ padding: "0 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}>
            Hedefi Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}