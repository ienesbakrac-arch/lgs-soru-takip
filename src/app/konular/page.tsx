"use client";
import { useState } from "react";

const lgsMusaitlik = [
  {
    ders: "Türkçe",
    uniteler: [
      { ad: "Sözcükte ve Söz Öbeklerinde Anlam", arama: "LGS Türkçe Sözcükte Anlam Konu Anlatımı" },
      { ad: "Cümlede Anlam", arama: "LGS Türkçe Cümlede Anlam Konu Anlatımı" },
      { ad: "Paragrafta Anlam ve Yorum", arama: "LGS Türkçe Paragraf Taktikleri Konu Anlatımı" },
      { ad: "Yazım Kuralları ve Noktalama İşaretleri", arama: "LGS Türkçe Yazım Kuralları Noktalama" },
      { ad: "Cümlenin Ögeleri ve Fiilimsiler", arama: "LGS Fiilimsiler Cümlenin Ögeleri" }
    ]
  },
  {
    ders: "Matematik",
    uniteler: [
      { ad: "Çarpanlar ve Katlar / EBOB-EKOK", arama: "LGS Matematik Çarpanlar ve Katlar EBOB EKOK" },
      { ad: "Üslü İfadeler", arama: "LGS Matematik Üslü İfadeler Konu Anlatımı" },
      { ad: "Kareköklü İfadeler", arama: "LGS Matematik Kareköklü İfadeler Konu Anlatımı" },
      { ad: "Veri Analizi ve Olasılık", arama: "LGS Matematik Veri Analizi Olasılık" },
      { ad: "Cebirsel İfadeler ve Özdeşlikler", arama: "LGS Matematik Cebirsel İfadeler Özdeşlikler" },
      { ad: "Doğrusal Denklemler ve Eşitsizlikler", arama: "LGS Matematik Doğrusal Denklemler" }
    ]
  },
  {
    ders: "Fen Bilimleri",
    uniteler: [
      { ad: "Mevsimlerin Oluşumu ve İklim", arama: "LGS Fen Mevsimlerin Oluşumu ve İklim" },
      { ad: "DNA ve Genetik Kod", arama: "LGS Fen DNA ve Genetik Kod Konu Anlatımı" },
      { ad: "Basınç (Katı, Sıvı, Gaz)", arama: "LGS Fen Basınç Konu Anlatımı" },
      { ad: "Madde ve Endüstri", arama: "LGS Fen Madde ve Endüstri Periyodik Sistem" },
      { ad: "Basit Makineler", arama: "LGS Fen Basit Makineler Konu Anlatımı" },
      { ad: "Enerji Dönüşümleri ve Çevre Bilimi", arama: "LGS Fen Enerji Dönüşümleri" }
    ]
  },
  {
    ders: "T.C. İnkılap Tarihi",
    uniteler: [
      { ad: "Bir Kahraman Doğuyor (Mustafa Kemal'in Çocukluğu)", arama: "LGS İnkılap Tarihi Bir Kahraman Doğuyor" },
      { ad: "Milli Uyanış: Bağımsızlık Yolunda Atılan Adımlar", arama: "LGS İnkılap Milli Uyanış" },
      { ad: "Ya İstiklal Ya Ölüm (Kurtuluş Savaşı Cepheleri)", arama: "LGS İnkılap Ya İstiklal Ya Ölüm" },
      { ad: "Atatürkçülük ve Çağdaşlaşan Türkiye", arama: "LGS İnkılap Atatürkçülük İlke ve İnkılapları" }
    ]
  }
];

export default function KonularSayfasi() {
  const [secilenVideoArama, setSecilenVideoArama] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>📚 LGS Konuları ve Video Anlatımları</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>Bütün derslerin ünite ve konularını incele, dilediğin konunun YouTube video anlatımına tek tıkla ulaş.</p>

      {secilenVideoArama && (
        <div style={{ background: "#0f172a", border: "1px solid rgba(56, 189, 248, 0.4)", padding: "20px", borderRadius: "16px", marginBottom: "30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", color: "#38bdf8" }}>🎬 Seçilen Konu Video Araması</h3>
            <button onClick={() => setSecilenVideoArama(null)} style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}>Kapat ✕</button>
          </div>
          <p style={{ fontSize: "14px", color: "#cbd5e1", marginBottom: "15px" }}>Aşağıdaki bağlantıya tıklayarak YouTube'daki en güncel konu anlatımı videolarını izleyebilirsin:</p>
          <a 
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(secilenVideoArama)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#ef4444", color: "#fff", padding: "12px 20px", borderRadius: "10px", textDecoration: "none", fontWeight: "600", fontSize: "14px" }}
          >
            ▶ YouTube'da İzle ({secilenVideoArama})
          </a>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {lgsMusaitlik.map((dersGrup, index) => (
          <div key={index} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", padding: "20px", borderRadius: "16px" }}>
            <h2 style={{ fontSize: "18px", color: "#38bdf8", marginBottom: "14px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "8px" }}>{dersGrup.ders}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {dersGrup.uniteler.map((unite, uIndex) => (
                <div key={uIndex} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e293b", padding: "12px 16px", borderRadius: "10px" }}>
                  <span style={{ fontSize: "14px", color: "#f8fafc" }}>{unite.ad}</span>
                  <button 
                    onClick={() => setSecilenVideoArama(unite.arama)}
                    style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
                  >
                    🎥 Video İzle
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}