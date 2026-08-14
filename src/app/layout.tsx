import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuLinkStil: React.CSSProperties = {
    color: "#e2e8f0",
    textDecoration: "none",
    padding: "10px 12px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "13.5px",
    fontWeight: 500,
    whiteSpace: "nowrap",
  };

  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, fontFamily: "sans-serif", backgroundColor: "var(--bg-primary)" }}>
        <div className="layout-container" style={{ display: "flex", minHeight: "100vh" }}>
          
          {/* SOL PANEL (SIDEBAR) */}
          <aside
            className="sidebar"
            style={{
              width: "250px",
              backgroundColor: "#0f172a",
              color: "#f8fafc",
              padding: "20px 14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
              borderRight: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              {/* LOGO */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", padding: "0 6px" }}>
                <div style={{ width: "36px", height: "36px", backgroundColor: "#2563eb", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                  📊
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#ffffff" }}>LGS Asistanı</h2>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>Soru Takip Portalı</span>
                </div>
              </div>

              {/* MENÜ LİNKLERİ */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <Link href="/" style={menuLinkStil}><span>🏠</span> Ana Sayfa</Link>
                <Link href="/rozetler" style={menuLinkStil}><span>🏆</span> Rozetlerim</Link>
                <Link href="/siralama" style={menuLinkStil}><span>🥇</span> Sıralama (Liderlik)</Link>
                <Link href="/denemeler" style={menuLinkStil}><span>📝</span> Deneme Takibi</Link>
                <Link href="/pomodoro" style={menuLinkStil}><span>🍅</span> Pomodoro Çalışma</Link>
                <Link href="/dersler" style={menuLinkStil}><span>📚</span> Dersler & Konular</Link>
                <Link href="/haftalik-hedef" style={menuLinkStil}><span>🎯</span> Haftalık Hedef</Link>
                <Link href="/yanlislarim" style={menuLinkStil}><span>❌</span> Yanlış Sorularım</Link>
                <Link href="/kronometre" style={menuLinkStil}><span>⏱️</span> Kronometre</Link>
              </nav>
            </div>

            {/* LGS GERİ SAYIM KARTI */}
            <div className="sidebar-footer" style={{ backgroundColor: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.3)", padding: "12px", borderRadius: "10px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", color: "#93c5fd", fontWeight: 700, display: "block", marginBottom: "4px" }}>🎯 LGS SINAVI</span>
              <span style={{ fontSize: "13px", fontWeight: "bold", color: "#ffffff" }}>Hedefe Odaklan! 💪</span>
            </div>
          </aside>

          {/* SAĞ İÇERİK ALANI */}
          <main style={{ flex: 1, padding: "28px", boxSizing: "border-box", width: "100%", overflowX: "hidden" }}>
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}