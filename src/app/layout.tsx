"use client";
import Link from "next/link";
import { useState } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobilMenuAcik, setMobilMenuAcik] = useState(false);

  const linkStil = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "10px",
    color: "#94a3b8",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "13px",
    marginBottom: "4px",
    transition: "all 0.2s ease",
  };

  return (
    <html lang="tr">
      <body style={{ margin: 0, background: "#060913", color: "#f8fafc", fontFamily: "sans-serif", display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        
        {/* MOBİL ÜST BAR (Sadece telefon ekranlarında görünür) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0b1120", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🎯</div>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff" }}>LGS & Staj Koçu</span>
          </div>
          <button 
            onClick={() => setMobilMenuAcik(!mobilMenuAcik)}
            style={{ background: "#1e293b", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "16px" }}
          >
            {mobilMenuAcik ? "✕ Kapat" : "☰ Menü"}
          </button>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
          
          {/* SOL PANEL (Mobilde açılır/kapanır, masaüstünde sabit) */}
          <nav style={{ 
            width: "270px", 
            background: "#0b1120", 
            borderRight: "1px solid rgba(255,255,255,0.06)", 
            padding: "20px 14px", 
            display: "flex", 
            flexDirection: "column", 
            boxSizing: "border-box",
            position: mobilMenuAcik ? "absolute" : "relative",
            top: 0,
            left: 0,
            height: "100%",
            zIndex: 100,
            transform: mobilMenuAcik ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.3s ease",
            boxShadow: mobilMenuAcik ? "5px 0 25px rgba(0,0,0,0.5)" : "none"
          }}
          // Masaüstü ekranlarda otomatik görünmesi için stil ayarı (CSS media query yerine basit mantık)
          className="sol-panel"
          >
            
            {/* Logo / Başlık Alanı (Masaüstü için) */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", padding: "0 6px" }}>
              <div style={{ width: "38px", height: "38px", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🎯</div>
              <div>
                <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#ffffff" }}>LGS & Staj Koçu</h2>
                <span style={{ fontSize: "11px", color: "#64748b" }}>Akıllı Öğrenci Asistanı</span>
              </div>
            </div>
            
            {/* Menü Linkleri (En önemli ve sık kullanılanlar üst sıralarda) */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto", paddingRight: "4px" }} onClick={() => setMobilMenuAcik(false)}>
              <Link href="/" style={linkStil}><span>🏠</span> Ana Sayfa</Link>
              <Link href="/soru-ekle" style={linkStil}><span>➕</span> Soru Ekle</Link>
              <Link href="/haftalik-hedef" style={linkStil}><span>🎯</span> Haftalık Hedef</Link>
              <Link href="/konular" style={linkStil}><span>📚</span> Konular & Videolar</Link>
              <Link href="/pomodoro" style={linkStil}><span>🍅</span> Pomodoro (40/10)</Link>
              <Link href="/deneme-kaydedici" style={linkStil}><span>📝</span> Deneme Kaydedici</Link>
              <Link href="/lgs-hesapla" style={linkStil}><span>🧮</span> LGS Puan Hesapla</Link>
              <Link href="/yanlislarim" style={linkStil}><span>❌</span> Yanlış Sorularım</Link>
              <Link href="/rozetler" style={linkStil}><span>🏆</span> Rozet Koleksiyonu</Link>
              <Link href="/notlar" style={linkStil}><span>📒</span> Hızlı Notlar</Link>
              <Link href="/yapay-zeka" style={linkStil}><span>🎙️</span> Sesli Yapay Zeka Koçu</Link>
            </div>

            <div style={{ fontSize: "11px", color: "#475569", textAlign: "center", padding: "12px 0 0 0", borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: "10px" }}>
              Sürüm 2.6 • Mobil Uyumlu ✨
            </div>
          </nav>

          {/* İÇERİK ALANI */}
          <main style={{ flex: 1, padding: "25px", overflowY: "auto", boxSizing: "border-box", background: "#090d1a" }} onClick={() => setMobilMenuAcik(false)}>
            {children}
          </main>
        </div>

        {/* CSS ile masaüstünde menünün otomatik görünmesini sağlayan küçük stil */}
        <style jsx global>{`
          @media (min-width: 768px) {
            nav.sol-panel {
              transform: translateX(0) !important;
              position: relative !important;
              box-shadow: none !important;
            }
            /* Mobildeki üst barı masaüstünde gizle */
            div:has(> button) {
              display: none !important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}