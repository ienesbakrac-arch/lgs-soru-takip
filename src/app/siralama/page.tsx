"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpemdbruuucesmjnlcuf.supabase.co";
const supabaseKey = "sb_publishable_4lp4K2ohWa9SrqWuI7wlGA_RTiNK-i2";
const client = createClient(supabaseUrl, supabaseKey);

export default function SiralamaSayfasi() {
  const [siralama, setSiralama] = useState<any[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [aktifIsim, setAktifIsim] = useState("");
  const [isimInput, setIsimInput] = useState("");
  const [girisYapildi, setGirisYapildi] = useState(false);

  useEffect(() => {
    const kaydedilmisIsim = localStorage.getItem("lgs_gercek_kullanici_adi");
    if (kaydedilmisIsim) {
      setAktifIsim(kaydedilmisIsim);
      setGirisYapildi(true);
      verileriGetir(kaydedilmisIsim);
    } else {
      setYukleniyor(false);
    }
  }, []);

  async function verileriGetir(isimToFetch: string) {
    setYukleniyor(true);
    
    // Soru sayısını al (localStorage'dan)
    const cozulenSoru = Number(localStorage.getItem("lgs_cozulen_soru") || "0");

    // Eğer isim zaten varsa güncelle, yoksa ekle (Upsert mantığı)
    await client.from('kullanicilar').upsert({
      isim: isimToFetch,
      skor: cozulenSoru // Skor sütununu artık soru sayısı olarak kullanıyoruz
    }, { onConflict: 'isim' });

    // Sıralamayı soru sayısına (skor) göre çek
    const { data: tumKullanicilar } = await client
      .from('kullanicilar')
      .select('*')
      .order('skor', { ascending: false });

    if (tumKullanicilar) {
      // İsimleri benzersiz yap (sadece en yüksek skoru olanı tut)
      const benzersiz = tumKullanicilar.reduce((acc, current) => {
        const x = acc.find((item: any) => item.isim === current.isim);
        if (!x) return acc.concat([current]);
        return acc;
      }, []);
      setSiralama(benzersiz);
    }
    setYukleniyor(false);
  }

  const ismiKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isimInput.trim()) return;
    
    localStorage.setItem("lgs_gercek_kullanici_adi", isimInput.trim());
    setAktifIsim(isimInput.trim());
    setGirisYapildi(true);
    verileriGetir(isimInput.trim());
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ background: "#111827", padding: "24px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "20px" }}>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "24px" }}>📚 LGS Soru Takip Sıralaması</h1>
      </div>

      {!girisYapildi ? (
        <div style={{ background: "#111827", padding: "30px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
          <form onSubmit={ismiKaydet} style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <input 
              type="text" 
              value={isimInput} 
              onChange={(e) => setIsimInput(e.target.value)} 
              placeholder="Adını gir..."
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #374151", background: "#1f2937", color: "#fff", width: "200px" }}
            />
            <button type="submit" style={{ padding: "12px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}>
              Kaydet
            </button>
          </form>
        </div>
      ) : (
        <div style={{ background: "#111827", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
          {siralama.map((kisi, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #374151" }}>
              <span>{index + 1}. {kisi.isim}</span>
              <span style={{ color: "#38bdf8" }}>{kisi.skor} Soru</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}