"use client";

import { useState } from "react";

export default function DerslerPage() {
  const dersler = [
    { id: "matematik", isim: "Matematik", icon: "📐", renk: "#2563eb", konular: ["Çarpanlar ve Katlar", "Üslü İfadeler", "Kareköklü İfadeler", "Veri İşleme"] },
    { id: "turkce", isim: "Türkçe", icon: "📖", renk: "#dc2626", konular: ["Fiilimsiler", "Sözcükte Anlam", "Cümlede Anlam", "Paragrafta Anlam"] },
    { id: "fen", isim: "Fen Bilimleri", icon: "🔬", renk: "#16a34a", konular: ["Mevsimler ve İklim", "DNA ve Genetik Kod", "Basınç", "Madde ve Endüstri"] },
    { id: "inkilap", isim: "T.C. İnkılap", icon: "🇹🇷", renk: "#d97706", konular: ["Bir Kahraman Doğuyor", "Milli Uyanış", "Milli Bir Destan", "Atatürkçülük"] },
    { id: "ingilizce", isim: "İngilizce", icon: "🇬🇧", renk: "#9333ea", konular: ["Friendship", "Teen Life", "In The Kitchen", "On The Phone"] },
    { id: "din", isim: "Din Kültürü", icon: "🕌", renk: "#0891b2", konular: ["Kader İnancı", "Zekat ve Sadaka", "Din ve Hayat", "Hz. Muhammed'in Örnekliği"] },
  ];

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "var(--text-primary)" }}>
          📚 Dersler ve Konu Listesi
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
          LGS müfredatına uygun derslerin ve ünitelerin listesi.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {dersler.map((ders) => (
          <div
            key={ders.id}
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              padding: "20px",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "28px", padding: "8px", borderRadius: "10px", backgroundColor: "var(--bg-primary)" }}>{ders.icon}</span>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: 0, color: "var(--text-primary)" }}>{ders.isim}</h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "6px" }}>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: "var(--text-secondary)" }}>ÖNEMLİ ÜNİTELER</span>
              {ders.konular.map((konu, idx) => (
                <div key={idx} style={{ fontSize: "13px", padding: "8px 10px", borderRadius: "6px", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: ders.renk, fontWeight: "bold" }}>•</span> {konu}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}