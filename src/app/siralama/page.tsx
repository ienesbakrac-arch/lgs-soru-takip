"use client";
import { useState, useEffect } from "react";

interface KullaniciSkor {
  kullanici_adi: string;
  toplam_soru: number;
}

export default function SiralamaPage() {
  const [siralama, setSiralama] = useState<KullaniciSkor[]>([]);

  useEffect(() => {
    const olasiAnahtarlar = ["lgs_soru_listesi", "sorular", "soruListesi", "kullanici_sorulari"];
    let tumSorular: any[] = [];

    for (let anahtar of olasiAnahtarlar) {
      const veri = localStorage.getItem(anahtar);
      if (veri) {
        try {
          const parsed = JSON.parse(veri);
          if (Array.isArray(parsed) && parsed.length > 0) {
            tumSorular = parsed;
            break;
          }
        } catch (e) {}
      }
    }

    if (tumSorular.length === 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const val = localStorage.getItem(key);
          try {
            const parsed = JSON.parse(val || "");
            if (Array.isArray(parsed)) {
              tumSorular = [...tumSorular, ...parsed];
            }
          } catch (e) {}
        }
      }
    }

    if (tumSorular.length > 0) {
      const skorlarMap: { [key: string]: number } = {};
      
      tumSorular.forEach((item: any) => {
        const isim = item.kullaniciAdi || item.kullanici_adi || item.isim || item.ad || item.ogrenciAdi || "İsimsiz";
        const adet = Number(item.soruSayisi || item.soru_sayisi || item.adet || item.sayi || item.toplam || 0);

        skorlarMap[isim] = (skorlarMap[isim] || 0) + adet;
      });

      const formatliListe: KullaniciSkor[] = Object.keys(skorlarMap).map((isim) => ({
        kullanici_adi: isim,
        toplam_soru: skorlarMap[isim],
      }));

      formatliListe.sort((a, b) => b.toplam_soru - a.toplam_soru);
      setSiralama(formatliListe);
    }
  }, []);

  return (
    <div style={{ padding: "40px 20px", maxWidth: "650px", margin: "0 auto", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "25px", textAlign: "center", color: "#1e293b", letterSpacing: "-0.5px" }}>
        🏆 LGS Soru Sıralaması
      </h1>

      {siralama.length === 0 ? (
        <div style={{ textAlign: "center", padding: "30px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0", color: "#64748b" }}>
          <p style={{ marginBottom: "8px", fontWeight: "500" }}>Henüz sıralamada görünecek bir veri bulunamadı.</p>
          <p style={{ fontSize: "14px", color: "#94a3b8" }}>Lütfen "Soru Ekle" sayfasından adını yazarak soru gir ve sayfayı yenile.</p>
        </div>
      ) : (
        <div style={{ 
          background: "#ffffff", 
          borderRadius: "16px", 
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)", 
          border: "1px solid #e2e8f0",
          overflow: "hidden" 
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#475569", fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <th style={{ padding: "16px 20px", width: "15%" }}>Sıra</th>
                <th style={{ padding: "16px 20px", width: "55%" }}>İsim / Kullanıcı</th>
                <th style={{ padding: "16px 20px", width: "30%", textAlign: "right" }}>Toplam Soru</th>
              </tr>
            </thead>
            <tbody>
              {siralama.map((kisi, index) => {
                // İlk 3 kişiye özel rozet/renk havası verebiliriz
                let siraStili = { fontWeight: "600", color: "#334155" };
                if (index === 0) siraStili = { fontWeight: "800", color: "#d97706" }; // 1. için altın sarısı
                else if (index === 1) siraStili = { fontWeight: "800", color: "#475569" }; // 2. için gümüş
                else if (index === 2) siraStili = { fontWeight: "800", color: "#b45309" }; // 3. için bronz

                return (
                  <tr 
                    key={index} 
                    style={{ 
                      borderBottom: index !== siralama.length - 1 ? "1px solid #f1f5f9" : "none",
                      transition: "background 0.2s"
                    }}
                  >
                    <td style={{ padding: "16px 20px", ...siraStili }}>
                      {index === 0 ? "🥇 #1" : index === 1 ? "🥈 #2" : index === 2 ? "🥉 #3" : `#${index + 1}`}
                    </td>
                    <td style={{ padding: "16px 20px", color: "#1e293b", fontWeight: "500" }}>
                      {kisi.kullanici_adi}
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right", fontWeight: "700", color: "#2563eb", fontSize: "16px" }}>
                      {kisi.toplam_soru} <span style={{ fontSize: "12px", fontWeight: "normal", color: "#64748b" }}>soru</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}