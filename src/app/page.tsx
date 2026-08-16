"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AnaSayfa() {
  const [haftalikHedef, setHaftalikHedef] = useState("500");
  const [toplamSoru, setToplamSoru] = useState(0);
  const [kullaniciAdi, setKullaniciAdi] = useState("Şampiyon");
  const [calismaSuresi, setCalismaSuresi] = useState(0);

  useEffect(() => {
    const verileriCek = () => {
      // Haftalık hedefin olası tüm anahtarlarını kontrol ediyoruz (500 kalma sorunu burada çözülüyor)
      const hedef = 
        localStorage.getItem("lgs_haftalik_hedef") || 
        localStorage.getItem("haftalik_hedef") || 
        localStorage.getItem("haftalikHedef") || 
        localStorage.getItem("lgs_toplam_hedef") || 
        localStorage.getItem("hedef") || 
        localStorage.getItem("lgs_hedef") || 
        localStorage.getItem("hedef_sayisi") || 
        "500";
      
      setHaftalikHedef(hedef);

      const ad = localStorage.getItem("lgs_gercek_kullanici_adi") || localStorage.getItem("kullanici_adi") || "Şampiyon";
      setKullaniciAdi(ad);

      const sure = localStorage.getItem("lgs_toplam_calisma_suresi") || localStorage.getItem("toplam_calisma_suresi");
      if (sure) setCalismaSuresi(Number(sure));

      const cozulen = localStorage.getItem("lgs_cozulen_soru") || localStorage.getItem("cozulen_soru");
      if (cozulen) {
        setToplamSoru(Number(cozulen));
      } else {
        const yanlislar = localStorage.getItem("lgs_yanlislar");
        if (yanlislar) {
          try {
            const parsed = JSON.parse(yanlislar);
            if (Array.isArray(parsed)) setToplamSoru(parsed.length);
          } catch (e) {}
        }
      }
    };

    verileriCek();

    // Sayfa odaklandığında veya hedef değiştirildiğinde anında yansıtması için kontrol
    window.addEventListener("focus", verileriCek);
    window.addEventListener("storage", verileriCek);
    const interval = setInterval(verileriCek, 400);

    return () => {
      window.removeEventListener("focus", verileriCek);
      window.removeEventListener("storage", verileriCek);
      clearInterval(interval);
    };
  }, []);

  const hedefSayi = Number(haftalikHedef) || 500;
  const yuzde = Math.min(Math.round((toplamSoru / hedefSayi) * 100), 100);

  return (
    <div style={{ color: "#f8fafc", maxWidth: "1000px", margin: "0 auto" }}>
      
      {/* ÜST KARŞILAMA BÖLÜMÜ */}
      <div style={{ background: "#111827", padding: "30px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <span style={{ backgroundColor: "rgba(37, 99, 235, 0.2)", color: "#60a5fa", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }}>🚀 LGS Hedef Portalı</span>
          <h1 style={{ fontSize: "28px", margin: "12px 0 6px 0", fontWeight: 700 }}>Hoş geldin, {kullaniciAdi}! 👋</h1>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px" }}>Bugün harika şeyler başarmak için harika bir gün. Zirveye bir adım daha yaklaş!</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <Link href="/soru-ekle" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>+ Soru Ekle</Link>
          <Link href="/pomodoro" style={{ backgroundColor: "#1f2937", color: "#38bdf8", border: "1px solid rgba(255,255,255,0.1)", padding: "10px 18px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>🍅 Pomodoro</Link>
        </div>
      </div>

      {/* İSTATİSTİK KARTLARI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        
        <div style={{ backgroundColor: "#111827", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Haftalık Soru Hedefin</span>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#38bdf8", marginTop: "8px" }}>{haftalikHedef} Soru</div>
        </div>

        <div style={{ backgroundColor: "#111827", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Toplam Çözülen Soru</span>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e", marginTop: "8px" }}>{toplamSoru} Soru</div>
        </div>

        <div style={{ backgroundColor: "#111827", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Toplam Çalışma Süresi</span>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#facc15", marginTop: "8px" }}>{calismaSuresi} Dk</div>
        </div>

        <div style={{ backgroundColor: "#111827", padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Hedef Tamamlama</span>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "#ec4899", marginTop: "8px" }}>%{yuzde}</div>
        </div>
      </div>

      {/* İLERLEME ÇUĞU */}
      <div style={{ backgroundColor: "#111827", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
          <span style={{ fontWeight: 600 }}>Haftalık İlerleme Durumu</span>
          <span style={{ color: "#38bdf8", fontWeight: "bold" }}>%{yuzde} Tamamlandı</span>
        </div>
        <div style={{ width: "100%", backgroundColor: "#1f2937", height: "14px", borderRadius: "7px", overflow: "hidden" }}>
          <div style={{ width: `${yuzde}%`, backgroundColor: "#2563eb", height: "100%", transition: "width 0.5s ease" }}></div>
        </div>
      </div>

      {/* HIZLI ERİŞİM KISAYOLLARI */}
      <h2 style={{ fontSize: "18px", marginBottom: "14px" }}>⚡ Hızlı Kısayollar</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
        
        <Link href="/siralama" style={{ backgroundColor: "#111827", padding: "18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "#fff", display: "block" }}>
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>🥇</div>
          <div style={{ fontWeight: 600, fontSize: "15px" }}>Liderlik Sıralaması</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Sıralamadaki yerini gör</div>
        </Link>

        <Link href="/notlar" style={{ backgroundColor: "#111827", padding: "18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "#fff", display: "block" }}>
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>📝</div>
          <div style={{ fontWeight: "600", fontSize: "15px" }}>Hızlı Notlar</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Formülleri ve notları kaydet</div>
        </Link>

        <Link href="/pomodoro" style={{ backgroundColor: "#111827", padding: "18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", color: "#fff", display: "block" }}>
          <div style={{ fontSize: "20px", marginBottom: "6px" }}>🍅</div>
          <div style={{ fontWeight: "600", fontSize: "15px" }}>Pomodoro Sayaç</div>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>Çalışma süreni takip et</div>
        </Link>

      </div>

    </div>
  );
}