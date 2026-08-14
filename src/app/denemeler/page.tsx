"use client";

import React, { useState, useEffect } from "react";

interface Deneme {
  id: number;
  ad: string;
  tarih: string;
  turkceNet: number;
  matNet: number;
  fenNet: number;
  inkilapNet: number;
  ingilizceNet: number;
  dinNet: number;
  toplamNet: number;
}

export default function DenemelerPage() {
  const [denemeler, setDenemeler] = useState<Deneme[]>([]);
  const [denemeAdi, setDenemeAdi] = useState<string>("");

  const [turkceD, setTurkceD] = useState<string>(""); const [turkceY, setTurkceY] = useState<string>("");
  const [matD, setMatD] = useState<string>(""); const [matY, setMatY] = useState<string>("");
  const [fenD, setFenD] = useState<string>(""); const [fenY, setFenY] = useState<string>("");
  const [inkilapD, setInkilapD] = useState<string>(""); const [inkilapY, setInkilapY] = useState<string>("");
  const [ingD, setIngD] = useState<string>(""); const [ingY, setIngY] = useState<string>("");
  const [dinD, setDinD] = useState<string>(""); const [dinY, setDinY] = useState<string>("");

  useEffect(() => {
    const kayitli = localStorage.getItem("denemeKayitlari");
    if (kayitli) {
      try { setDenemeler(JSON.parse(kayitli)); } catch { setDenemeler([]); }
    }
  }, []);

  const netHesapla = (d: number, y: number): number => Math.max(0, Number((d - y / 3).toFixed(2)));

  const denemeEkle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!denemeAdi.trim()) return;

    const tNet = netHesapla(Number(turkceD), Number(turkceY));
    const mNet = netHesapla(Number(matD), Number(matY));
    const fNet = netHesapla(Number(fenD), Number(fenY));
    const inkNet = netHesapla(Number(inkilapD), Number(inkilapY));
    const ingNet = netHesapla(Number(ingD), Number(ingY));
    const dNet = netHesapla(Number(dinD), Number(dinY));

    const topNet = Number((tNet + mNet + fNet + inkNet + ingNet + dNet).toFixed(2));

    const yeniDeneme: Deneme = {
      id: Date.now(),
      ad: denemeAdi.trim(),
      tarih: new Date().toLocaleDateString("tr-TR"),
      turkceNet: tNet,
      matNet: mNet,
      fenNet: fNet,
      inkilapNet: inkNet,
      ingilizceNet: ingNet,
      dinNet: dNet,
      toplamNet: topNet,
    };

    const guncel = [yeniDeneme, ...denemeler];
    setDenemeler(guncel);
    localStorage.setItem("denemeKayitlari", JSON.stringify(guncel));

    setDenemeAdi("");
    setTurkceD(""); setTurkceY("");
    setMatD(""); setMatY("");
    setFenD(""); setFenY("");
    setInkilapD(""); setInkilapY("");
    setIngD(""); setIngY("");
    setDinD(""); setDinY("");
  };

  const denemeSil = (id: number) => {
    const guncel = denemeler.filter((d) => d.id !== id);
    setDenemeler(guncel);
    localStorage.setItem("denemeKayitlari", JSON.stringify(guncel));
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0, color: "var(--text-primary)" }}>📝 Deneme Sınavı Takibi</h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>Tüm derslerin netlerini girip LGS deneme performansını takip et!</p>
      </div>

      <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "14px" }}>
        <form onSubmit={denemeEkle} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "4px", color: "var(--text-secondary)" }}>Deneme Sınavı Adı / Yayın</label>
            <input type="text" placeholder="Örn: Özdebir 1. Deneme" value={denemeAdi} onChange={(e) => setDenemeAdi(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", boxSizing: "border-box" }} required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
            <div style={{ padding: "10px", backgroundColor: "var(--bg-primary)", borderRadius: "8px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: "bold", color: "#dc2626" }}>📖 Türkçe (20)</span>
              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <input type="number" placeholder="D" value={turkceD} onChange={(e) => setTurkceD(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
                <input type="number" placeholder="Y" value={turkceY} onChange={(e) => setTurkceY(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
              </div>
            </div>

            <div style={{ padding: "10px", backgroundColor: "var(--bg-primary)", borderRadius: "8px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: "bold", color: "#2563eb" }}>📐 Matematik (20)</span>
              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <input type="number" placeholder="D" value={matD} onChange={(e) => setMatD(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
                <input type="number" placeholder="Y" value={matY} onChange={(e) => setMatY(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
              </div>
            </div>

            <div style={{ padding: "10px", backgroundColor: "var(--bg-primary)", borderRadius: "8px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: "bold", color: "#16a34a" }}>🔬 Fen Bilimleri (20)</span>
              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <input type="number" placeholder="D" value={fenD} onChange={(e) => setFenD(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
                <input type="number" placeholder="Y" value={fenY} onChange={(e) => setFenY(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
              </div>
            </div>

            <div style={{ padding: "10px", backgroundColor: "var(--bg-primary)", borderRadius: "8px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: "bold", color: "#d97706" }}>🇹🇷 T.C. İnkılap (10)</span>
              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <input type="number" placeholder="D" value={inkilapD} onChange={(e) => setInkilapD(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
                <input type="number" placeholder="Y" value={inkilapY} onChange={(e) => setInkilapY(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
              </div>
            </div>

            <div style={{ padding: "10px", backgroundColor: "var(--bg-primary)", borderRadius: "8px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: "bold", color: "#9333ea" }}>🇬🇧 İngilizce (10)</span>
              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <input type="number" placeholder="D" value={ingD} onChange={(e) => setIngD(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
                <input type="number" placeholder="Y" value={ingY} onChange={(e) => setIngY(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
              </div>
            </div>

            <div style={{ padding: "10px", backgroundColor: "var(--bg-primary)", borderRadius: "8px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: "bold", color: "#0891b2" }}>🕌 Din Kültürü (10)</span>
              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <input type="number" placeholder="D" value={dinD} onChange={(e) => setDinD(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
                <input type="number" placeholder="Y" value={dinY} onChange={(e) => setDinY(e.target.value)} style={{ width: "50%", padding: "6px", borderRadius: "6px", border: "1px solid var(--border-color)" }} />
              </div>
            </div>
          </div>

          <button type="submit" style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>Denemeyi Kaydet</button>
        </form>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {denemeler.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "14px" }}>Henüz kaydedilmiş deneme yok.</p>
        ) : (
          denemeler.map((item) => (
            <div key={item.id} style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "16px", borderRadius: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold", color: "var(--text-primary)" }}>{item.ad} <small style={{ fontSize: "11px", color: "var(--text-secondary)" }}>({item.tarih})</small></h3>
                <div style={{ display: "flex", gap: "10px", marginTop: "6px", fontSize: "12px", flexWrap: "wrap" }}>
                  <span>📖 Tr: <b>{item.turkceNet}</b></span>
                  <span>📐 Mat: <b>{item.matNet}</b></span>
                  <span>🔬 Fen: <b>{item.fenNet}</b></span>
                  <span>🇹🇷 İnk: <b>{item.inkilapNet}</b></span>
                  <span>🇬🇧 İng: <b>{item.ingilizceNet}</b></span>
                  <span>🕌 Din: <b>{item.dinNet}</b></span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "18px", fontWeight: "bold", color: "#2563eb" }}>{item.toplamNet} Toplam Net</span>
                <button onClick={() => denemeSil(item.id)} style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", color: "#ef4444", border: "none", padding: "6px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>Sil</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}