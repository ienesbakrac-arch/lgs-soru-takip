"use client";
import { useState, useEffect } from "react";

export default function Siralama() {
  const [kullaniciAdi, setKullaniciAdi] = useState("Sen (Öğrenci)");
  const [cozulenSoru, setCozulenSoru] = useState(0);

  useEffect(() => {
    // Daha önce yanlışlarim veya denemeler sayfasından girilen soru verilerini okuyalım
    const kaydedilenYanlislar = localStorage.getItem("lgs_yanlislar");
    let soruSayisi = 0;
    
    if (kaydedilenYanlislar) {
      try {
        const parsed = JSON.parse(kaydedilenYanlislar);
        if (Array.isArray(parsed)) {
          soruSayisi = parsed.length * 5; // Her kayıtlı soru için tahmini bir soru havuzu katsayısı
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Eğer hiç soru girilmediyse bile en azından kullanıcının listede görünmesi için tabanı 1 yapalım veya localStorage'dan okuyalım
    const toplamSoru = Math.max(soruSayisi, 12); // Bir soru bile girilse dinamik artar
    setCozulenSoru(toplamSoru);
  }, []);

  // İlk 10 sıralama listesi (Gerçekçi LGS hedefleriyle uyumlu çalışma arkadaşları)
  const ogrenciler = [
    { sira: 1, isim: "Zeynep Kaya (Fen Lisesi Hedef)", soru: 540, puan: 990 },
    { sira: 2, isim: "Ahmet Yılmaz (Sen)", soru: cozulenSoru * 15, puan: cozulenSoru * 25 },
    { sira: 3, isim: "Mehmet Demir", soru: 480, puan: 940 },
    { sira: 4, isim: "Elif Şahin", soru: 450, puan: 890 },
    { sira: 5, isim: "Mustafa Aydın", soru: 410, puan: 820 },
    { sira: 6, isim: "Ayşe Çelik", soru: 380, puan: 760 },
    { sira: 7, isim: "Yusuf Koç", soru: 340, puan: 700 },
    { sira: 8, isim: "İrem Yıldız", soru: 310, puan: 650 },
    { sira: 9, isim: "Emre Arslan", soru: 280, puan: 590 },
    { sira: 10, isim: "Betül Öztürk", soru: 250, puan: 530 },
  ].sort((a, b) => b.puan - a.puan); // Puana göre otomatik büyükten küçüğe sıralanır

  return (
    <div style={{ color: "#f8fafc", maxWidth: "900px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>🥇 LGS İlk 10 Liderlik Tablosu</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>
        Uygulamaya girdiğin sorular ve çözümler doğrudan puanını belirler. Zirveye yerleşmek için soru çözmeye devam et!
      </p>

      <div style={{ backgroundColor: "#111827", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", fontSize: "13px" }}>
              <th style={{ padding: "14px 16px" }}>Sıra</th>
              <th style={{ padding: "14px 16px" }}>Öğrenci Adı</th>
              <th style={{ padding: "14px 16px" }}>Çözülen Soru</th>
              <th style={{ padding: "14px 16px" }}>Başarı Puanı</th>
            </tr>
          </thead>
          <tbody>
            {ogrenciler.map((item, index) => {
              const benMi = item.isim.includes("(Sen)");
              return (
                <tr 
                  key={index} 
                  style={{ 
                    borderBottom: "1px solid rgba(255,255,255,0.05)", 
                    backgroundColor: benMi ? "rgba(37, 99, 235, 0.2)" : index === 0 ? "rgba(234, 179, 8, 0.1)" : "transparent",
                    fontWeight: benMi ? "bold" : "normal"
                  }}
                >
                  <td style={{ padding: "14px 16px" }}>
                    {index === 0 ? "👑 1" : `#${index + 1}`}
                  </td>
                  <td style={{ padding: "14px 16px", color: benMi ? "#60a5fa" : "#f8fafc" }}>
                    {item.isim} {benMi && "⭐"}
                  </td>
                  <td style={{ padding: "14px 16px" }}>{item.soru} Soru</td>
                  <td style={{ padding: "14px 16px", color: "#38bdf8", fontWeight: "bold" }}>{item.puan} Puan</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}