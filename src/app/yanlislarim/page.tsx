"use client";

import React, { useState, useEffect } from "react";

interface YanlisSoru {
  id: number;
  ders: string;
  konu: string;
  not: string;
}

export default function YanlislarimPage() {
  const [yanlislar, setYanlislar] = useState<YanlisSoru[]>([]);
  const [secilenDers, setSecilenDers] = useState<string>("Matematik");
  const [konu, setKonu] = useState<string>("");
  const [not, setNot] = useState<string>("");

  useEffect(() => {
    const kayitli = localStorage.getItem("yanlisSorular");
    if (kayitli) {
      try {
        setYanlislar(JSON.parse(kayitli));
      } catch {
        setYanlislar([]);
      }
    }
  }, []);

  const yanlisEkle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!konu.trim()) return;

    const yeniSoru: YanlisSoru = {
      id: Date.now(),
      ders: secilenDers,
      konu: konu.trim(),
      not: not.trim() || "Not eklenmedi.",
    };

    const guncelList = [yeniSoru, ...yanlislar];
    setYanlislar(guncelList);
    localStorage.setItem("yanlisSorular", JSON.stringify(guncelList));

    setKonu("");
    setNot("");
  };

  const yanlisSil = (id: number) => {
    const guncelList = yanlislar.filter((item) => item.id !== id);
    setYanlislar(guncelList);
    localStorage.setItem("yanlisSorular", JSON.stringify(guncelList));
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "var(--text-primary)" }}>
          ❌ Yanlış Sorularım ve Tekrar Kutusu
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
          Yanlış yaptığın konuyu kaydet, tekrar ederek eksiklerini kapat!
        </p>
      </div>

      {/* SORU EKLEME FORMU */}
      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "14px" }}>
        <form onSubmit={yanlisEkle} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px", color: "var(--text-secondary)" }}>Ders</label>
              <select
                value={secilenDers}
                onChange={(e) => setSecilenDers(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
              >
                <option value="Matematik">📐 Matematik</option>
                <option value="Türkçe">📖 Türkçe</option>
                <option value="Fen Bilimleri">🔬 Fen Bilimleri</option>
                <option value="T.C. İnkılap">🇹🇷 T.C. İnkılap</option>
                <option value="İngilizce">🇬🇧 İngilizce</option>
                <option value="Din Kültürü">🕌 Din Kültürü</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px", color: "var(--text-secondary)" }}>Konu Adı</label>
              <input
                type="text"
                placeholder="Örn: Üslü İfadeler"
                value={konu}
                onChange={(e) => setKonu(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", boxSizing: "border-box" }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px", color: "var(--text-secondary)" }}>Hatırlatıcı Not</label>
            <input
              type="text"
              placeholder="Örn: İşlem hatası yaptım, kuralı unuttum"
              value={not}
              onChange={(e) => setNot(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", boxSizing: "border-box" }}
            />
          </div>

          <button type="submit" style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "10px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Eksiği Kaydet
          </button>
        </form>
      </div>

      {/* LİSTE */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {yanlislar.length === 0 ? (
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", textAlign: "center", padding: "20px" }}>
            Henüz kaydedilmiş bir yanlış soru yok.
          </p>
        ) : (
          yanlislar.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                padding: "16px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <span style={{ fontSize: "11px", fontWeight: "bold", color: "#2563eb", backgroundColor: "rgba(37, 99, 235, 0.1)", padding: "4px 8px", borderRadius: "6px" }}>
                  {item.ders}
                </span>
                <h3 style={{ fontSize: "15px", fontWeight: "bold", margin: "8px 0 4px 0", color: "var(--text-primary)" }}>{item.konu}</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>💡 {item.not}</p>
              </div>
              <button
                onClick={() => yanlisSil(item.id)}
                style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "none", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
              >
                🗑️ Sil
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}