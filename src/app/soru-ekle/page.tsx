"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpemdbruuucesmjnlcuf.supabase.co";
const supabaseKey = "sb_publishable_4lp4K2ohWa9SrqWuI7wlGA_RTiNK-i2";
const client = createClient(supabaseUrl, supabaseKey);

export default function SoruEkleSayfasi() {
  const [ders, setDers] = useState("Matematik");
  const [adet, setAdet] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);

  const soruEkleKaydet = async (e: React.FormEvent) => {
    e.preventDefault();
    const soruAdedi = Number(adet);
    if (!adet || soruAdedi <= 0) {
      setMesaj("⚠️ Lütfen geçerli bir soru sayısı gir!");
      return;
    }

    setYukleniyor(true);
    setMesaj("");

    try {
      const isim = typeof window !== "undefined" ? localStorage.getItem("lgs_gercek_kullanici_adi") || "Şampiyon" : "Şampiyon";
      const mevcutSoru = Number(localStorage.getItem("lgs_cozulen_soru") || "0");
      const yeniToplam = mevcutSoru + soruAdedi;
      
      // LocalStorage güncelle
      localStorage.setItem("lgs_cozulen_soru", yeniToplam.toString());

      // Supabase'e gönderirken hata denetimi ekleyelim
      const { error } = await client
        .from('kullanicilar')
        .upsert({ isim: isim, skor: yeniToplam }, { onConflict: 'isim' });

      if (error) {
        console.error("Supabase Hatası:", error);
        setMesaj("❌ Veritabanına kaydedilemedi: " + error.message);
      } else {
        setMesaj("✅ Sorular başarıyla kaydedildi ve sıralamaya eklendi!");
        setAdet("");
      }
    } catch (err) {
      console.error("Genel Hata:", err);
      setMesaj("❌ Beklenmeyen bir hata oluştu.");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif", padding: "20px" }}>
      <div style={{ background: "#111827", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "20px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "22px" }}>➕ Soru Ekle</h1>
        <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px" }}>Çözdüğün soruları kaydet ve sıralamada anında yerini al!</p>
      </div>

      <form onSubmit={soruEkleKaydet} style={{ background: "#111827", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#cbd5e1" }}>Ders Seç:</label>
          <select 
            value={ders} 
            onChange={(e) => setDers(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #374151", background: "#1f2937", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          >
            <option value="Matematik">Matematik</option>
            <option value="Türkçe">Türkçe</option>
            <option value="Fen Bilimleri">Fen Bilimleri</option>
            <option value="T.C. İnkılap Tarihi">T.C. İnkılap Tarihi</option>
            <option value="Din Kültürü">Din Kültürü</option>
            <option value="İngilizce">İngilizce</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#cbd5e1" }}>Çözülen Soru Adedi:</label>
          <input 
            type="number" 
            value={adet} 
            onChange={(e) => setAdet(e.target.value)} 
            placeholder="Örn: 25"
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #374151", background: "#1f2937", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <button 
          type="submit" 
          disabled={yukleniyor}
          style={{ padding: "14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "15px", marginTop: "10px" }}
        >
          {yukleniyor ? "Kaydediliyor..." : "Soruları Kaydet 🚀"}
        </button>

        {mesaj && (
          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "14px", color: mesaj.includes("✅") ? "#38bdf8" : "#f87171" }}>
            {mesaj}
          </div>
        )}
      </form>
    </div>
  );
}