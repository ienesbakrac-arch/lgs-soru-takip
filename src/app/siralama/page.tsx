"use client";
import { useState, useEffect } from "react";

interface Ogrenci {
  isim: string;
  soru: number;
  puan: number;
}

export default function Siralama() {
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [yeniAdInput, setYeniAdInput] = useState("");
  const [ogrenciler, setOgrenciler] = useState<Ogrenci[]>([]);
  const [kayitliMi, setKayitliMi] = useState(false);

  useEffect(() => {
    // 1. Daha önce kaydedilmiş kullanıcı adını ve listeyi alalım
    const kayitliAd = localStorage.getItem("lgs_gercek_kullanici_adi");
    const kayitliListe = localStorage.getItem("lgs_liderlik_listesi");

    // 2. Yanlışlar veya çözülen sorulardan toplam soru sayısını hesaplayalım
    const kaydedilenYanlislar = localStorage.getItem("lgs_yanlislar");
    let toplamSoru = 0;
    
    if (kaydedilenYanlislar) {
      try {
        const parsed = JSON.parse(kaydedilenYanlislar);
        if (Array.isArray(parsed)) {
          toplamSoru = parsed.length * 10; // Her soru/yanlış için puan katsayısı
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (kayitliAd) {
      setKullaniciAdi(kayitliAd);
      setKayitliMi(true);

      // Listeyi yükle veya kullanıcıyı listeye ekle/güncelle
      let liste: Ogrenci[] = kayitliListe ? JSON.parse(kayitliListe) : [];
      
      const mevcutIndex = liste.findIndex((o) => o.isim === kayitliAd);
      const guncelPuan = Math.max(toplamSoru, 10) * 3 + 100;

      if (mevcutIndex >= 0) {
        liste[mevcutIndex].soru = Math.max(toplamSoru, 10);
        liste[mevcutIndex].puan = guncelPuan;
      } else {
        liste.push({ isim: kayitliAd, soru: Math.max(toplamSoru, 10), puan: guncelPuan });
      }

      liste.sort((a, b) => b.puan - a.puan);
      setOgrenciler(liste);
      localStorage.setItem("lgs_liderlik_listesi", JSON.stringify(liste));
    } else if (kayitliListe) {
      setOgrenciler(JSON.parse(kayitliListe));
    }
  }, []);

  const isimKaydetVeKatil = (e: React.FormEvent) => {
    e.preventDefault();
    if (yeniAdInput.trim()) {
      const ad = yeniAdInput.trim();
      localStorage.setItem("lgs_gercek_kullanici_adi", ad);
      setKullaniciAdi(ad);
      setKayitliMi(true);

      // Listeye ekle
      const kaydedilenYanlislar = localStorage.getItem("lgs_yanlislar");
      let toplamSoru = 10;
      if (kaydedilenYanlislar) {
        try {
          const parsed = JSON.parse(kaydedilenYanlislar);
          if (Array.isArray(parsed)) toplamSoru = Math.max(parsed.length * 10, 10);
        } catch (e) {}
      }

      const yeniOgrenci: Ogrenci = { isim: ad, soru: toplamSoru, puan: toplamSoru * 3 + 100 };
      let liste: Ogrenci[] = localStorage.getItem("lgs_liderlik_listesi") ? JSON.parse(localStorage.getItem("lgs_liderlik_listesi")!) : [];
      
      // Aynı isim varsa güncelle, yoksa ekle
      liste = liste.filter(o => o.isim !== ad);
      liste.push(yeniOgrenci);
      liste.sort((a, b) => b.puan - a.puan);

      setOgrenciler(liste);
      localStorage.setItem("lgs_liderlik_listesi", JSON.stringify(liste));
    }
  };

  const cikisYap = () => {
    localStorage.removeItem("lgs_gercek_kullanici_adi");
    setKullaniciAdi("");
    setKayitliMi(false);
    setYeniAdInput("");
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "900px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1 style={{ fontSize: "24px", margin: "0 0 4px 0" }}>🥇 Gerçek Liderlik Sıralaması</h1>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px" }}>Sahte isim yok! Sadece adını yazan ve soru çözen gerçek öğrenciler yer alır.</p>
        </div>

        {kayitliMi && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px", color: "#38bdf8", fontWeight: 600 }}>👤 {kullaniciAdi}</span>
            <button 
              onClick={cikisYap}
              style={{ backgroundColor: "#1f2937", color: "#f87171", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
            >
              Adı Değiştir
            </button>
          </div>
        )}
      </div>

      {!kayitliMi ? (
        <div style={{ backgroundColor: "#111827", padding: "30px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center", maxWidth: "450px", margin: "40px auto" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Liderlik Tablosuna Katıl</h2>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "20px" }}>Adını yazarak sıralamaya girebilir ve çözdüğün sorularla puanını artırabilirsin.</p>
          <form onSubmit={isimKaydetVeKatil} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input 
              type="text" 
              placeholder="Adınızı ve Soyadınızı Girin" 
              value={yeniAdInput}
              onChange={(e) => setYeniAdInput(e.target.value)}
              style={{ padding: "12px", borderRadius: "8px", backgroundColor: "#1f2937", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "15px", width: "100%", boxSizing: "border-box" }}
              required
              autoFocus
            />
            <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "15px" }}>
              Sıralamaya Katıl ve Kaydet
            </button>
          </form>
        </div>
      ) : (
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
              {ogrenciler.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>Henüz kayıtlı öğrenci bulunmuyor.</td>
                </tr>
              ) : (
                ogrenciler.map((item, index) => {
                  const benMi = item.isim === kullaniciAdi;
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
                        {item.isim} {benMi && "⭐ (Sen)"}
                      </td>
                      <td style={{ padding: "14px 16px" }}>{item.soru} Soru</td>
                      <td style={{ padding: "14px 16px", color: "#38bdf8", fontWeight: "bold" }}>{item.puan} Puan</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}