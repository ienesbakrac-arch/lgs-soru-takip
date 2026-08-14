"use client";
import { useState, useEffect } from "react";

export default function Siralama() {
  const [kullaniciAdi, setKullaniciAdi] = useState("Öğrenci");
  const [cozulenSoru, setCozulenSoru] = useState(0);
  const [isimDegistiriliyor, setIsimDegistiriliyor] = useState(false);
  const [yeniIsimInput, setYeniIsimInput] = useState("");

  useEffect(() => {
    // 1. Kullanıcı adını localStorage'dan al, yoksa sor
    const kayitliAd = localStorage.getItem("lgs_kullanici_adi");
    if (kayitliAd) {
      setKullaniciAdi(kayitliAd);
      setYeniIsimInput(kayitliAd);
    } else {
      setKullaniciAdi("LGS Öğrencisi");
      setYeniIsimInput("LGS Öğrencisi");
    }

    // 2. Yanlışlar veya kaydedilen sorulardan toplam soru sayısını hesapla
    const kaydedilenYanlislar = localStorage.getItem("lgs_yanlislar");
    let toplamSoru = 5; // Başlangıç tabanı
    
    if (kaydedilenYanlislar) {
      try {
        const parsed = JSON.parse(kaydedilenYanlislar);
        if (Array.isArray(parsed)) {
          toplamSoru = parsed.length * 10; // Her eklenen soru/yanlış için puan katsayısı
        }
      } catch (e) {
        console.error(e);
      }
    }
    setCozulenSoru(Math.max(toplamSoru, 10));
  }, []);

  const isimKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (yeniIsimInput.trim()) {
      localStorage.setItem("lgs_kullanici_adi", yeniIsimInput.trim());
      setKullaniciAdi(yeniIsimInput.trim());
      setIsimDegistiriliyor(false);
    }
  };

  // Liderlik tablosu listesi (Senin puanına göre otomatik sıralanır)
  const ogrenciler = [
    { isim: "Zeynep Kaya", soru: 540, puan: 990 },
    { isim: kullniciAdiKontrol(kullaniciAdi), soru: cozulenSoru, puan: cozulenSoru * 3 + 100 },
    { isim: "Mehmet Demir", soru: 480, puan: 940 },
    { isim: "Elif Şahin", soru: 450, puan: 890 },
    { isim: "Mustafa Aydın", soru: 410, puan: 820 },
    { isim: "Ayşe Çelik", soru: 380, puan: 760 },
    { isim: "Yusuf Koç", soru: 340, puan: 700 },
    { isim: "İrem Yıldız", soru: 310, puan: 650 },
    { isim: "Emre Arslan", soru: 280, puan: 590 },
    { isim: "Betül Öztürk", soru: 250, puan: 530 },
  ].sort((a, b) => b.puan - a.puan); // Puana göre büyükten küçüğe sırala

  function kullniciAdiKontrol(ad: string) {
    return `${ad} (Sen)`;
  }

  return (
    <div style={{ color: "#f8fafc", maxWidth: "900px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1 style={{ fontSize: "24px", margin: "0 0 4px 0" }}>🥇 Liderlik Sıralaması</h1>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px" }}>Soru çözdükçe puanın artar ve tabloda yükselirsin!</p>
        </div>
        
        {/* İsim Değiştirme Alanı */}
        <div>
          {!isimDegistiriliyor ? (
            <button 
              onClick={() => setIsimDegistiriliyor(true)}
              style={{ backgroundColor: "#1f2937", color: "#60a5fa", border: "1px solid rgba(255,255,255,0.1)", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}
            >
              ✏️ Adımı Düzenle: {kullaniciAdi}
            </button>
          ) : (
            <form onSubmit={isimKaydet} style={{ display: "flex", gap: "6px" }}>
              <input 
                type="text" 
                value={yeniIsimInput} 
                onChange={(e) => setYeniIsimInput(e.target.value)}
                style={{ padding: "6px 10px", borderRadius: "6px", backgroundColor: "#1f2937", border: "1px solid #3b82f6", color: "#fff", fontSize: "13px" }}
                placeholder="Adınızı girin"
                autoFocus
              />
              <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>Kaydet</button>
            </form>
          )}
        </div>
      </div>

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