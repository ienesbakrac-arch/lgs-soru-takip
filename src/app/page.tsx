"use client";

import { useState, useEffect } from "react";

interface SoruGirdisi {
  id: number;
  ders: string;
  sayi: number;
  saat: string;
}

export default function Home() {
  const [bugunCozulen, setBugunCozulen] = useState<number>(0);
  const [haftalikToplam, setHaftalikToplam] = useState<number>(0);
  const [seriGun, setSeriGun] = useState<number>(1);
  const [dersDagilimi, setDersDagilimi] = useState<Record<string, number>>({});
  const [gecmisGirdiler, setGecmisGirdiler] = useState<SoruGirdisi[]>([]);

  const [secilenDers, setSecilenDers] = useState<string>("Matematik");
  const [girilenSoruSayisi, setGirilenSoruSayisi] = useState<string>("");

  useEffect(() => {
    const kayitliBugun = localStorage.getItem("bugunCozulen");
    const kayitliHaftalik = localStorage.getItem("haftalikToplam");
    const kayitliDagilim = localStorage.getItem("dersDagilimi");
    const kayitliGecmis = localStorage.getItem("gecmisGirdiler");

    if (kayitliBugun) setBugunCozulen(Number(kayitliBugun));
    if (kayitliHaftalik) setHaftalikToplam(Number(kayitliHaftalik));
    if (kayitliDagilim) {
      try { setDersDagilimi(JSON.parse(kayitliDagilim)); } catch { setDersDagilimi({}); }
    }
    if (kayitliGecmis) {
      try { setGecmisGirdiler(JSON.parse(kayitliGecmis)); } catch { setGecmisGirdiler([]); }
    }
  }, []);

  const soruEkle = (e: React.FormEvent) => {
    e.preventDefault();
    const eklenecek = Number(girilenSoruSayisi);
    if (!eklenecek || eklenecek <= 0) return;

    const yeniBugun = bugunCozulen + eklenecek;
    const yeniHaftalik = haftalikToplam + eklenecek;
    const yeniDagilim: Record<string, number> = {
      ...dersDagilimi,
      [secilenDers]: (dersDagilimi[secilenDers] || 0) + eklenecek,
    };

    const yeniGirdi: SoruGirdisi = {
      id: Date.now(),
      ders: secilenDers,
      sayi: eklenecek,
      saat: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
    };
    const yeniGecmis = [yeniGirdi, ...gecmisGirdiler].slice(0, 5);

    setBugunCozulen(yeniBugun);
    setHaftalikToplam(yeniHaftalik);
    setDersDagilimi(yeniDagilim);
    setGecmisGirdiler(yeniGecmis);

    localStorage.setItem("bugunCozulen", yeniBugun.toString());
    localStorage.setItem("haftalikToplam", yeniHaftalik.toString());
    localStorage.setItem("dersDagilimi", JSON.stringify(yeniDagilim));
    localStorage.setItem("gecmisGirdiler", JSON.stringify(yeniGecmis));

    setGirilenSoruSayisi("");
  };

  const verileriSifirla = () => {
    if (confirm("Tüm soru verilerin sıfırlansın mı?")) {
      setBugunCozulen(0);
      setHaftalikToplam(0);
      setDersDagilimi({});
      setGecmisGirdiler([]);
      localStorage.clear();
      window.location.reload();
    }
  };

  const tumRozetler = [
    { id: 1, isim: "İlk Adım", tanim: "İlk sorunu çöz", kriter: 1, icon: "🌱" },
    { id: 2, isim: "Isınma Turu", tanim: "Toplam 50 soru çöz", kriter: 50, icon: "⚡" },
    { id: 3, isim: "Soru Avcısı", tanim: "Toplam 100 soru çöz", kriter: 100, icon: "🎯" },
    { id: 4, isim: "Tam Gaz", tanim: "Toplam 250 soru çöz", kriter: 250, icon: "🚀" },
    { id: 5, isim: "Azimli Öğrenci", tanim: "Toplam 500 soru çöz", kriter: 500, icon: "🔥" },
    { id: 6, isim: "Soru Makinesi", tanim: "Toplam 750 soru çöz", kriter: 750, icon: "🤖" },
    { id: 7, isim: "LGS Şampiyonu", tanim: "Toplam 1000 soru çöz", kriter: 1000, icon: "👑" },
    { id: 8, isim: "Efsane Çalışkan", tanim: "Toplam 2000 soru çöz", kriter: 2000, icon: "💎" },
  ];

  const kazanilanRozetSayisi = tumRozetler.filter((r) => haftalikToplam >= r.kriter).length;
  const yuzde = Math.min(Math.round((haftalikToplam / 1000) * 100), 100);

  return (
    <div style={{ maxWidth: "1150px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
      
      {/* ÜST BİLGİ VE MOTİVASYON */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "var(--text-primary)" }}>
            Hoş Geldin! 👋
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
            "Başarı, her gün tekrarlanan küçük çabaların toplamıdır." 💪
          </p>
        </div>
        <button
          onClick={verileriSifirla}
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "#ef4444",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "12.5px",
            fontWeight: "bold"
          }}
        >
          🗑️ Sıfırla
        </button>
      </div>

      {/* İSTATİSTİK KARTLARI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
        
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "14px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "bold" }}>BUGÜN ÇÖZÜLEN</span>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 0 0", color: "#2563eb" }}>
            {bugunCozulen} <span style={{ fontSize: "16px", color: "var(--text-secondary)" }}>Soru</span>
          </h2>
        </div>

        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "14px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "bold" }}>HAFTALIK TOPLAM</span>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 0 0", color: "#16a34a" }}>
            {haftalikToplam} <span style={{ fontSize: "16px", color: "var(--text-secondary)" }}>/ 1000</span>
          </h2>
        </div>

        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "14px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "bold" }}>HEDEF TAMAMLAMA</span>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 0 0", color: "#d97706" }}>
            %{yuzde}
          </h2>
          <div style={{ width: "100%", height: "6px", backgroundColor: "var(--border-color)", borderRadius: "10px", marginTop: "12px", overflow: "hidden" }}>
            <div style={{ width: `${yuzde}%`, height: "100%", backgroundColor: "#d97706", borderRadius: "10px" }} />
          </div>
        </div>

        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "14px" }}>
          <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "bold" }}>KAZANILAN ROZETLER</span>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", margin: "8px 0 0 0", color: "#9333ea" }}>
            {kazanilanRozetSayisi} <span style={{ fontSize: "16px", color: "var(--text-secondary)" }}>/ {tumRozetler.length}</span>
          </h2>
        </div>

      </div>

      {/* HIZLI SORU EKLE VE DAĞILIM */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "14px" }}>
          <h3 style={{ fontSize: "17px", fontWeight: "bold", margin: "0 0 16px 0", color: "var(--text-primary)" }}>➕ Hızlı Soru Ekle</h3>
          <form onSubmit={soruEkle} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: "bold", marginBottom: "6px", color: "var(--text-secondary)" }}>Ders Seçin</label>
              <select
                value={secilenDers}
                onChange={(e) => setSecilenDers(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box" }}
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
              <label style={{ display: "block", fontSize: "12.5px", fontWeight: "bold", marginBottom: "6px", color: "var(--text-secondary)" }}>Çözülen Soru Sayısı</label>
              <input
                type="number"
                placeholder="Örn: 30"
                value={girilenSoruSayisi}
                onChange={(e) => setGirilenSoruSayisi(e.target.value)}
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", fontSize: "14px", boxSizing: "border-box" }}
                required
              />
            </div>

            <button type="submit" style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}>
              Kaydet ve Ekle
            </button>
          </form>
        </div>

        {/* TEMİZLENMİŞ DERS DAĞILIMI (Gereksiz hedefler kaldırıldı) */}
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "14px" }}>
          <h3 style={{ fontSize: "17px", fontWeight: "bold", margin: "0 0 16px 0", color: "var(--text-primary)" }}>📊 Bugünkü Ders Dağılımın</h3>
          {Object.keys(dersDagilimi).length === 0 ? (
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>Henüz soru eklenmedi.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {Object.entries(dersDagilimi).map(([ders, sayi]) => (
                <div key={ders} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "8px", backgroundColor: "var(--bg-primary)" }}>
                  <span style={{ fontSize: "14px", fontWeight: "bold", color: "var(--text-primary)" }}>🔹 {ders}</span>
                  <span style={{ fontWeight: "bold", fontSize: "14px", color: "#2563eb" }}>{sayi} Soru</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* SON EKLENEN SORULAR GEÇMİŞİ (Yeni Özellik) */}
      {gecmisGirdiler.length > 0 && (
        <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "20px 24px", borderRadius: "14px" }}>
          <h4 style={{ margin: "0 0 12px 0", fontSize: "15px", color: "var(--text-primary)" }}>🕒 Son Eklenen Sorular Geçmişi</h4>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {gecmisGirdiler.map((item) => (
              <span key={item.id} style={{ backgroundColor: "var(--bg-primary)", padding: "6px 12px", borderRadius: "20px", fontSize: "12.5px", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}>
                <b>{item.ders}:</b> +{item.sayi} Soru <small style={{ opacity: 0.7 }}>({item.saat})</small>
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}