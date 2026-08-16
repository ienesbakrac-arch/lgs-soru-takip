"use client";
import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  useEffect(() => {
    const isim = localStorage.getItem("lgs_gercek_kullanici_adi");
    if (!isim) {
      const yeniIsim = prompt("LGS Portalı'na hoş geldin! İsmin nedir?");
      if (yeniIsim) localStorage.setItem("lgs_gercek_kullanici_adi", yeniIsim);
      else localStorage.setItem("lgs_gercek_kullanici_adi", "Şampiyon");
    }
  }, []);

  const linkStil = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "10px",
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "13px",
    background: "rgba(255,255,255,0.02)",
    marginBottom: "4px",
    transition: "0.2s",
    whiteSpace: "nowrap" as const
  };

  return (
    <html lang="tr">
      <body style={{ margin: 0, background: "#090d16", color: "#f8fafc", fontFamily: "sans-serif" }}>
        
        <div className="ana-layout">
          
          <nav className="mobil-menu">
            <div className="logo-alani" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", padding: "0 6px" }}>
              <div style={{ width: "34px", height: "34px", backgroundColor: "#2563eb", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🎯</div>
              <div>
                <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#ffffff" }}>LGS Asistanı</h2>
                <span style={{ fontSize: "10px", color: "#94a3b8" }}>Staj ve Takip Portalı</span>
              </div>
            </div>
            
            <div className="menu-linkler">
              <Link href="/" style={linkStil}><span>🏠</span> Ana Sayfa</Link>
              <Link href="/soru-ekle" style={linkStil}><span>➕</span> Soru Ekle</Link>
              <Link href="/deneme-kaydedici" style={linkStil}><span>📝</span> Deneme Kaydedici</Link>
              <Link href="/lgs-hesapla" style={linkStil}><span>🧮</span> LGS Puan Hesapla</Link>
              <Link href="/siralama" style={linkStil}><span>🥇</span> Sıralama</Link>
              <Link href="/haftalik-hedef" style={linkStil}><span>🎯</span> Haftalık Hedef</Link>
              <Link href="/konular" style={linkStil}><span>📚</span> Konular & Videolar</Link>
              <Link href="/yanlislarim" style={linkStil}><span>❌</span> Yanlış Sorularım</Link>
              <Link href="/pomodoro" style={linkStil}><span>🍅</span> Pomodoro</Link>
              <Link href="/rozetler" style={linkStil}><span>🏆</span> Başarı Rozetlerim</Link>
              <Link href="/notlar" style={linkStil}><span>📝</span> Hızlı Notlar</Link>
              <Link href="/yapay-zeka" style={linkStil}><span>🎙️</span> Sesli Yapay Zeka Koçu</Link>
            </div>

            <div className="surum-bilgisi" style={{ fontSize: "11px", color: "#64748b", textAlign: "center", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "10px" }}>
              V 2.0 - Kararlı Sürüm 🚀
            </div>
          </nav>

          <main className="icerik-alani">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}