"use client";

import { useState, useEffect } from "react";

export default function RozetlerPage() {
  const [haftalikToplam, setHaftalikToplam] = useState<number>(0);

  useEffect(() => {
    const kayitliHaftalik = localStorage.getItem("haftalikToplam");
    if (kayitliHaftalik) setHaftalikToplam(Number(kayitliHaftalik));
  }, []);

  const tumRozetler = [
    { id: 1, isim: "İlk Adım", tanim: "İlk sorunu çöz", kriter: 1, icon: "🌱", kategori: "Başlangıç" },
    { id: 2, isim: "Isınma Turu", tanim: "Toplam 50 soru çöz", kriter: 50, icon: "⚡", kategori: "Acemi" },
    { id: 3, isim: "Soru Avcısı", tanim: "Toplam 100 soru çöz", kriter: 100, icon: "🎯", kategori: "Çırak" },
    { id: 4, isim: "Tam Gaz", tanim: "Toplam 250 soru çöz", kriter: 250, icon: "🚀", kategori: "Kalfa" },
    { id: 5, isim: "Azimli Öğrenci", tanim: "Toplam 500 soru çöz", kriter: 500, icon: "🔥", kategori: "Usta" },
    { id: 6, isim: "Soru Makinesi", tanim: "Toplam 750 soru çöz", kriter: 750, icon: "🤖", kategori: "Efsane" },
    { id: 7, isim: "LGS Şampiyonu", tanim: "Toplam 1000 soru çöz", kriter: 1000, icon: "👑", kategori: "Şampiyon" },
    { id: 8, isim: "Efsane Çalışkan", tanim: "Toplam 2000 soru çöz", kriter: 2000, icon: "💎", kategori: "Üstat" },
  ];

  const kazanilanSayisi = tumRozetler.filter((r) => haftalikToplam >= r.kriter).length;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "var(--text-primary)" }}>
          🏆 Başarı Rozetlerim
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
          Soru çözdükçe kilitleri aç ve rozetleri koleksiyonuna ekle!
        </p>
      </div>

      {/* ÖZET İSTATİSTİK KARTI */}
      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "bold" }}>KAZANILAN ROZET DURUMU</span>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", margin: "4px 0 0 0", color: "#2563eb" }}>
            {kazanilanSayisi} / {tumRozetler.length} Rozet Açıldı
          </h2>
        </div>
        <div style={{ fontSize: "36px" }}>🏆</div>
      </div>

      {/* ROZET IZGARASI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
        {tumRozetler.map((rozet) => {
          const kazanildi = haftalikToplam >= rozet.kriter;
          const yuzde = Math.min(Math.round((haftalikToplam / rozet.kriter) * 100), 100);

          return (
            <div
              key={rozet.id}
              style={{
                backgroundColor: "var(--bg-card)",
                border: kazanildi ? "2px solid #2563eb" : "1px solid var(--border-color)",
                padding: "20px",
                borderRadius: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "10px",
                opacity: kazanildi ? 1 : 0.6
              }}
            >
              <div style={{ fontSize: "36px", width: "64px", height: "64px", borderRadius: "50%", backgroundColor: kazanildi ? "rgba(37, 99, 235, 0.1)" : "var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {kazanildi ? rozet.icon : "🔒"}
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "bold", margin: 0, color: "var(--text-primary)" }}>{rozet.isim}</h3>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>{rozet.tanim}</p>
              </div>

              {!kazanildi && (
                <div style={{ width: "100%", marginTop: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                    <span>İlerleme</span>
                    <span>{haftalikToplam}/{rozet.kriter}</span>
                  </div>
                  <div style={{ width: "100%", height: "4px", backgroundColor: "var(--border-color)", borderRadius: "10px", overflow: "hidden" }}>
                    <div style={{ width: `${yuzde}%`, height: "100%", backgroundColor: "#2563eb" }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}