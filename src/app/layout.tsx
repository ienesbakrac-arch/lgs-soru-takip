"use client";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const linkStil: React.CSSProperties = {
    color: "#cbd5e1",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: 500,
  };

  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, fontFamily: "sans-serif", backgroundColor: "#090d16", color: "#fff" }}>
        <div className="layout-container" style={{ display: "flex", minHeight: "100vh" }}>
          
          {/* SOL PANEL */}
          <aside className="sidebar" style={{ width: "260px", backgroundColor: "#0f172a", padding: "20px 14px", borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", padding: "0 6px" }}>
                <div style={{ width: "36px", height: "36px", backgroundColor: "#2563eb", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>📊</div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>LGS Asistanı</h2>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>Soru Takip Portalı</span>
                </div>
              </div>

              <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Link href="/" style={linkStil}><span>🏠</span> Ana Sayfa</Link>
                <Link href="/soru-ekle" style={linkStil}><span>➕</span> Soru Ekle</Link>
                <Link href="/lgs-hesapla" style={linkStil}><span>🧮</span> LGS Puan Hesapla</Link>
                <Link href="/siralama" style={linkStil}><span>🥇</span> Sıralama</Link>
                <Link href="/haftalik-hedef" style={linkStil}><span>🎯</span> Haftalık Hedef</Link>
                <Link href="/yanlislarim" style={linkStil}><span>❌</span> Yanlış Sorularım</Link>
                <Link href="/pomodoro" style={linkStil}><span>🍅</span> Pomodoro</Link>
                <Link href="/notlar" style={linkStil}><span>📝</span> Hızlı Notlar</Link>
                <Link href="/degerlendir" style={linkStil}><span>⭐</span> Bizi Değerlendir</Link>
              </nav>
            </div>
          </aside>

          {/* ANA İÇERİK */}
          <main style={{ flex: 1, padding: "28px", boxSizing: "border-box", overflowX: "hidden" }}>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}