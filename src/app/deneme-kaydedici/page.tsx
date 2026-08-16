"use client";
import { useState, useEffect } from "react";

interface DersSonuc {
  dogru: string;
  yanlis: string;
  bos: string;
}

interface DersDetay {
  d: number;
  y: number;
  b: number;
  net: number;
}

interface DenemeKaydi {
  id: number;
  ad: string;
  tarih: string;
  dersler: {
    turkce: DersDetay;
    matematik: DersDetay;
    fen: DersDetay;
    inkilap: DersDetay;
    din: DersDetay;
    ingilizce: DersDetay;
  };
  toplamNet: number;
}

export default function DenemeKaydediciPage() {
  const [denemeAdi, setDenemeAdi] = useState("");
  const [dersler, setDersler] = useState<Record<string, DersSonuc>>({
    turkce: { dogru: "", yanlis: "", bos: "" },
    matematik: { dogru: "", yanlis: "", bos: "" },
    fen: { dogru: "", yanlis: "", bos: "" },
    inkilap: { dogru: "", yanlis: "", bos: "" },
    din: { dogru: "", yanlis: "", bos: "" },
    ingilizce: { dogru: "", yanlis: "", bos: "" },
  });

  const [denemeler, setDenemeler] = useState<DenemeKaydi[]>([]);
  const [karsilastirilan1, setKarsilastirilan1] = useState<number | null>(null);
  const [karsilastirilan2, setKarsilastirilan2] = useState<number | null>(null);

  useEffect(() => {
    const kayitli = localStorage.getItem("lgs_tum_denemeler");
    if (kayitli) {
      try {
        setDenemeler(JSON.parse(kayitli));
      } catch (e) {}
    }
  }, []);

  const handleChange = (ders: string, alan: "dogru" | "yanlis" | "bos", deger: string) => {
    setDersler(prev => ({
      ...prev,
      [ders]: { ...prev[ders], [alan]: deger }
    }));
  };

  const kaydetDeneme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!denemeAdi.trim()) return;

    let toplamNet = 0;
    const yeniDersVerileri: any = {};

    Object.keys(dersler).forEach((key) => {
      const d = Number(dersler[key].dogru) || 0;
      const y = Number(dersler[key].yanlis) || 0;
      const b = Number(dersler[key].bos) || 0;
      const net = Number((d - (y / 3)).toFixed(2));
      
      toplamNet += net;
      yeniDersVerileri[key] = { d, y, b, net };
    });

    const yeniKayit: DenemeKaydi = {
      id: Date.now(),
      ad: denemeAdi,
      tarih: new Date().toLocaleDateString("tr-TR"),
      dersler: yeniDersVerileri,
      toplamNet: Number(toplamNet.toFixed(2))
    };

    const guncelListe = [yeniKayit, ...denemeler];
    setDenemeler(guncelListe);
    localStorage.setItem("lgs_tum_denemeler", JSON.stringify(guncelListe));

    setDenemeAdi("");
    setDersler({
      turkce: { dogru: "", yanlis: "", bos: "" },
      matematik: { dogru: "", yanlis: "", bos: "" },
      fen: { dogru: "", yanlis: "", bos: "" },
      inkilap: { dogru: "", yanlis: "", bos: "" },
      din: { dogru: "", yanlis: "", bos: "" },
      ingilizce: { dogru: "", yanlis: "", bos: "" },
    });
  };

  const dersIsimleri: Record<string, string> = {
    turkce: "Türkçe",
    matematik: "Matematik",
    fen: "Fen Bilimleri",
    inkilap: "İnkılap Tarihi",
    din: "Din Kültürü",
    ingilizce: "İngilizce"
  };

  const d1 = denemeler.find(d => d.id === Number(karsilastirilan1));
  const d2 = denemeler.find(d => d.id === Number(karsilastirilan2));

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", color: "#f8fafc", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "26px", fontWeight: "700", marginBottom: "8px" }}>📝 LGS Deneme Takip ve Analiz</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px", fontSize: "14px" }}>Bütün derslerin doğru, yanlış ve boşlarını girerek detaylı net analizi yap ve karşılaştır.</p>

      <form onSubmit={kaydetDeneme} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#38bdf8" }}>Yeni Deneme Sonucu Gir</h2>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", color: "#94a3b8", marginBottom: "6px" }}>Deneme / Yayın Adı</label>
          <input 
            type="text" 
            value={denemeAdi} 
            onChange={(e) => setDenemeAdi(e.target.value)} 
            placeholder="Örn: Hız Yayınları LGS-1" 
            style={{ width: "100%", padding: "12px", background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#fff", outline: "none", fontSize: "14px" }}
            required 
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "15px", marginBottom: "24px" }}>
          {Object.keys(dersler).map((key) => (
            <div key={key} style={{ background: "#1e293b", padding: "14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ display: "block", fontWeight: "600", fontSize: "14px", marginBottom: "10px", color: "#f1f5f9" }}>{dersIsimleri[key]}</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#22c55e", display: "block", marginBottom: "4px" }}>Doğru</span>
                  <input type="number" placeholder="0" value={dersler[key].dogru} onChange={(e) => handleChange(key, "dogru", e.target.value)} style={{ width: "100%", padding: "8px", background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", textAlign: "center" }} />
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#ef4444", display: "block", marginBottom: "4px" }}>Yanlış</span>
                  <input type="number" placeholder="0" value={dersler[key].yanlis} onChange={(e) => handleChange(key, "yanlis", e.target.value)} style={{ width: "100%", padding: "8px", background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", textAlign: "center" }} />
                </div>
                <div>
                  <span style={{ fontSize: "11px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>Boş</span>
                  <input type="number" placeholder="0" value={dersler[key].bos} onChange={(e) => handleChange(key, "bos", e.target.value)} style={{ width: "100%", padding: "8px", background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", textAlign: "center" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" style={{ width: "100%", padding: "14px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", fontSize: "15px", cursor: "pointer" }}>
          Denemeyi Kaydet
        </button>
      </form>

      {denemeler.length >= 2 && (
        <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#38bdf8" }}>📊 Deneme Karşılaştırma</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
            <select onChange={(e) => setKarsilastirilan1(Number(e.target.value))} style={{ padding: "10px", background: "#1e293b", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}>
              <option value="">1. Denemeyi Seç</option>
              {denemeler.map(d => <option key={d.id} value={d.id}>{d.ad} ({d.tarih})</option>)}
            </select>
            <select onChange={(e) => setKarsilastirilan2(Number(e.target.value))} style={{ padding: "10px", background: "#1e293b", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}>
              <option value="">2. Denemeyi Seç</option>
              {denemeler.map(d => <option key={d.id} value={d.id}>{d.ad} ({d.tarih})</option>)}
            </select>
          </div>

          {d1 && d2 && (
            <div style={{ background: "#1e293b", padding: "15px", borderRadius: "12px", fontSize: "14px" }}>
              <p style={{ fontWeight: "600", marginBottom: "10px", color: "#38bdf8" }}>{d1.ad} vs {d2.ad}</p>
              <p>Toplam Net Farkı: <span style={{ color: d2.toplamNet >= d1.toplamNet ? "#22c55e" : "#ef4444", fontWeight: "700" }}>{d2.toplamNet >= d1.toplamNet ? `+${(d2.toplamNet - d1.toplamNet).toFixed(2)}` : (d2.toplamNet - d1.toplamNet).toFixed(2)} Net</span></p>
            </div>
          )}
        </div>
      )}

      <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Kaydedilen Denemeler ({denemeler.length})</h2>
      {denemeler.length === 0 ? (
        <div style={{ padding: "30px", background: "#0f172a", borderRadius: "12px", textAlign: "center", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.05)" }}>
          Henüz kayıtlı bir deneme bulunmuyor. Yukarıdan ilk denemeni ekleyebilirsin!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {denemeler.map((item) => (
            <div key={item.id} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontWeight: "700", fontSize: "16px", color: "#fff" }}>{item.ad}</span>
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>{item.tarih}</span>
                  <span style={{ background: "#2563eb", color: "#fff", padding: "4px 10px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>Toplam Net: {item.toplamNet}</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "8px" }}>
                {Object.keys(item.dersler).map((dKey) => (
                  <div key={dKey} style={{ background: "#1e293b", padding: "8px 10px", borderRadius: "8px", fontSize: "12px" }}>
                    <span style={{ color: "#94a3b8", display: "block" }}>{dersIsimleri[dKey]}</span>
                    <span style={{ color: "#38bdf8", fontWeight: "600" }}>Net: {item.dersler[dKey as keyof typeof item.dersler].net}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}