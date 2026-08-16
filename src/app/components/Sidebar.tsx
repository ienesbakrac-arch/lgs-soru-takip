"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Ana Sayfa", href: "/", icon: "🏠" },
    { name: "Deneme Analiz", href: "/deneme-kaydedici", icon: "📊" },
    { name: "Soru Ekle", href: "/soru-ekle", icon: "➕" },
  ];

  return (
    <aside style={{
      width: "280px",
      height: "100vh",
      background: "#0f172a",
      borderRight: "1px solid #334155",
      display: "flex",
      flexDirection: "column",
      padding: "24px 20px",
      position: "fixed",
      left: 0,
      top: 0,
      color: "#f8fafc",
      fontFamily: "system-ui, -apple-system, sans-serif",
      boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)"
    }}>
      {/* Başlık Bölümü */}
      <div style={{ marginBottom: "30px", textAlign: "center", paddingBottom: "15px", borderBottom: "1px solid #334155" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#38bdf8", margin: 0, letterSpacing: "-0.5px" }}>
          LGS 2027 Rehberim 🚀
        </h2>
      </div>

      {/* Menü Linkleri */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 18px",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "600",
                color: isActive ? "#ffffff" : "#94a3b8",
                background: isActive ? "#2563eb" : "transparent",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Alt Bilgi */}
      <div style={{ borderTop: "1px solid #334155", paddingTop: "15px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
          Başarı Sistemi v2.0
        </p>
      </div>
    </aside>
  );
}