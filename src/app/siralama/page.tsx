"use client";

import { useState, useEffect } from "react";

interface Ogrenci {
  id: number;
  ad: string;
  soruSayisi: number;
}

export default function Siralama() {
  const [ogrenciler, setOgrenciler] = useState<Ogrenci[]>([]);

  useEffect(() => {
    // Hafızadaki kullanıcı verisini ve soru sayısını çek
    const kayitliKullanici = localStorage.getItem("kullaniciAdi") || "Sen";
    const kayitliHaftalik = Number(localStorage.getItem("haftalikToplam") || 0);

    if (kayitliHaftalik > 0) {
      setOgrenciler([{ id: 1, ad: kayitliKullanici, soruSayisi: kayitliHaftalik }]);
    }
  }, []);

  const madalyaGetir = (sira: number) => {
    if (sira === 1) return "🥇";
    if (sira === 2) return "🥈";
    if (sira === 3) return "🥉";
    return `#${sira}`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>🏆 Haftalık Liderlik Tablosu</h1>
      <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "20px" }}>
        En çok soru çözen öğrenciler burada sıralanır.
      </p>

      <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
        {ogrenciler.length === 0 ? (
          <div style={{ padding: "30px", textAlign: "center", opacity: 0.7 }}>
            Henüz soru çözen bir kullanıcı yok. Soru ekleyerek liderlik koltuğuna oturabilirsin! 🚀
          </div>
        ) : (
          ogrenciler.map((item, index) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom: "1px solid var(--border-color)",
                backgroundColor: index === 0 ? "rgba(37, 99, 235, 0.08)" : "transparent"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "20px", fontWeight: "bold", width: "30px", textAlign: "center" }}>
                  {madalyaGetir(index + 1)}
                </span>
                <div>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>{item.ad} (Siz)</h4>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "16px", fontWeight: "bold", color: "#2563eb" }}>
                  {item.soruSayisi}
                </span>
                <span style={{ fontSize: "12px", display: "block", opacity: 0.7 }}>Soru</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}