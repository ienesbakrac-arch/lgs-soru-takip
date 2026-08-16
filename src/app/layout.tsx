import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "LGS Asistanı & Yapay Zeka Koçu",
  description: "Staj ve LGS hazırlık platformu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      <body style={{ margin: 0, background: "#060913", color: "#f8fafc", fontFamily: "sans-serif", display: "flex", height: "100vh", overflow: "hidden" }}>
        
        {/* ŞIK SOL PANEL */}
        <nav style={{ width: "270px", background: "#0b1120", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "20px 14px", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
          
          {/* Logo / Başlık Alanı */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", padding: "0 6px" }}>
            <div style={{ width: "38px", height: "38px", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }}>🎯</div>
            <div>
              <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.3px" }}>LGS & Staj Koçu</h2>
              <span style={{ fontSize: "11px", color: "#64748b" }}>Akıllı Öğrenci Asistanı</span>
            </div>
          </div>
          
          {/* Menü Linkleri */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto", paddingRight: "4px" }}>
            <Link href="/" style={linkStil}><span>🏠</span> Ana Sayfa</Link>
            <Link href="/soru-ekle" style={linkStil}><span>➕</span> Soru Ekle</Link>
            <Link href="/deneme-kaydedici" style={linkStil}><span>📝</span> Deneme Kaydedici</Link>
            <Link href="/lgs-hesapla" style={linkStil}><span>🧮</span> LGS Puan Hesapla</Link>
            <Link href="/siralama" style={linkStil}><span>🥇</span> Sıralama</Link>
            <Link href="/haftalik-hedef" style={linkStil}><span>🎯</span> Haftalık Hedef</Link>
            <Link href="/yanlislarim" style={linkStil}><span>❌</span> Yanlış Sorularım</Link>
            <Link href="/konular" style={linkStil}><span>📚</span> Konular & Videolar</Link>
            <Link href="/pomodoro" style={linkStil}><span>🍅</span> Pomodoro (40/10)</Link>
            <Link href="/rozetler" style={linkStil}><span>🏆</span> Rozet Koleksiyonu</Link>
            <Link href="/notlar" style={linkStil}><span>📒</span> Hızlı Notlar</Link>
            <Link href="/yapay-zeka" style={linkStil}><span>🎙️</span> Sesli Yapay Zeka Koçu</Link>
          </div>

          {/* Alt Bilgi */}
          <div style={{ fontSize: "11px", color: "#475569", textAlign: "center", padding: "12px 0 0 0", borderTop: "1px solid rgba(255,255,255,0.04)", marginTop: "10px" }}>
            Sürüm 2.5 • Özel Tasarım ✨
          </div>
        </nav>

        {/* İÇERİK ALANI */}
        <main style={{ flex: 1, padding: "35px", overflowY: "auto", boxSizing: "border-box", background: "#090d1a" }}>
          {children}
        </main>
      </body>
    </html>
  );
}