"use client";
import { useState, useEffect } from "react";

export default function LgsHesapla() {
  const [ders, setDers] = useState("Matematik");
  const [adet, setAdet] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [toplamListe, setToplamListe] = useState<{ ders: string; adet: number; tarih: string }[]>([]);

  useEffect(() => {
    const kayitli = localStorage.getItem("lgs_genel_sorular");
    if (kayitli) {
      try {
        setToplamListe(JSON.parse(kayitli));
      } catch (e) {}
    }
  }, []);

  const soruEkle = (e: React.FormEvent) => {
    e.preventDefault();
    const sayi = Number(adet);
    if (!sayi || sayi <= 0) {
      setMesaj("⚠️ Lütfen geçerli bir soru sayısı gir!");
      return;
    }

    const yeniKayit = {
      ders,
      adet: sayi,
      tarih: new Date().toLocaleDateString("tr-TR")
    };

    const guncelListe = [yeniKayit, ...toplamListe];
    setToplamListe(guncelListe);
    localStorage.setItem("lgs_genel_sorular", JSON.stringify(guncelListe));

    // Ana sayfanın toplam soru sayısını otomatik güncellemesi için
    // Eskiden yanlışlardan çekiyorduk, şimdi genel soruları da ana sayfanın okuyabileceği formata ekleyelim:
    const eskiYanlislar = localStorage.getItem("lgs_yanlislar");
    let yanlisDizi = [];
    try {
      if (eskiYanlislar) yanlisDizi = JSON.parse(eskiYanlislar);
    } catch (e) {}

    // Toplam soru adedi kadar sahte kayıt oluşturup ana sayfa sayacını besleyelim
    const eklenenler = Array(sayi).fill({ ders, tip: "Genel Soru" });
    const yeniToplamYanlislar = [...yanlisDizi, ...eklenenler];
    localStorage.setItem("lgs_yanlislar", JSON.stringify(yeniToplamYanlislar));

    setAdet("");
    setMesaj("✅ Soru başarıyla eklendi ve hedefine işlendi!");
    setTimeout(() => setMesaj(""), 3000);
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "700px", margin: "0 auto", paddingBottom: "40px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px", fontWeight: "bold" }}>➕ Soru Ekle ve Takip Et</h1>
      <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "20px" }}>Hangi dersten kaç soru çözdüğünü buradan kolayca kaydet.</p>

      {mesaj && (
        <div style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", padding: "12px", borderRadius: "8px", color: "#4ade80", marginBottom: "20px", fontSize: "14px", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
          {mesaj}
        </div>
      )}

      {/* SORU EKLEME FORMU */}
      <form onSubmit={soruEkle} style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "30px" }}>
        
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "8px", fontWeight: 600 }}>Ders Seçimi</label>
          <select 
            value={ders} 
            onChange={(e) => setDers(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "#1f2937", border: "1px solid #3b82f6", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          >
            <option value="Matematik" style={{ backgroundColor: "#1f2937", color: "#fff" }}>Matematik</option>
            <option value="Türkçe" style={{ backgroundColor: "#1f2937", color: "#fff" }}>Türkçe</option>
            <option value="Fen Bilimleri" style={{ backgroundColor: "#1f2937", color: "#fff" }}>Fen Bilimleri</option>
            <option value="T.C. İnkılap Tarihi" style={{ backgroundColor: "#1f2937", color: "#fff" }}>T.C. İnkılap Tarihi</option>
            <option value="Din Kültürü" style={{ backgroundColor: "#1f2937", color: "#fff" }}>Din Kültürü</option>
            <option value="İngilizce" style={{ backgroundColor: "#1f2937", color: "#fff" }}>İngilizce</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "14px", color: "#cbd5e1", marginBottom: "8px", fontWeight: 600 }}>Çözülen Soru Adedi</label>
          <input 
            type="number" 
            placeholder="Örn: 25" 
            value={adet} 
            onChange={(e) => setAdet(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", backgroundColor: "#1f2937", border: "1px solid #3b82f6", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}>
          Soruyu Kaydet 🚀
        </button>
      </form>

      {/* GEÇMİŞ ÇÖZÜLENLER LİSTESİ */}
      <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>📋 Eklenen Soruların Geçmişi</h2>
      {toplamListe.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "14px" }}>Henüz soru eklenmemiş. Yukarıdan ilk sorunu ekle!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {toplamListe.map((item, index) => (
            <div key={index} style={{ backgroundColor: "#111827", padding: "14px 18px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontWeight: "bold", color: "#38bdf8", fontSize: "15px" }}>{item.ders}</span>
                <span style={{ color: "#94a3b8", fontSize: "13px", marginLeft: "10px" }}>({item.tarih})</span>
              </div>
              <div style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#4ade80", padding: "4px 10px", borderRadius: "6px", fontWeight: "bold", fontSize: "14px" }}>
                +{item.adet} Soru
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}