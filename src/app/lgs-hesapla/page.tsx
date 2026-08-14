"use client";

import { useState } from "react";

export default function LgsHesapla() {
  const [dogru, setDogru] = useState({
    turkce: 0,
    matematik: 0,
    fen: 0,
    inkilap: 0,
    din: 0,
    ingilizce: 0,
  });

  const [yanlis, setYanlis] = useState({
    turkce: 0,
    matematik: 0,
    fen: 0,
    inkilap: 0,
    din: 0,
    ingilizce: 0,
  });

  const [puan, setPuan] = useState<number | null>(null);

  // Net Hesaplama (3 Yanlış 1 Doğruyu Götürür)
  const netHesapla = (d: number, y: number) => {
    const net = d - y / 3;
    return net > 0 ? net : 0;
  };

  const hesapla = (e: React.FormEvent) => {
    e.preventDefault();

    const tNet = netHesapla(dogru.turkce, yanlis.turkce);
    const mNet = netHesapla(dogru.matematik, yanlis.matematik);
    const fNet = netHesapla(dogru.fen, yanlis.fen);
    const iNet = netHesapla(dogru.inkilap, yanlis.inkilap);
    const dNet = netHesapla(dogru.din, yanlis.din);
    const ingNet = netHesapla(dogru.ingilizce, yanlis.ingilizce);

    // Yaklaşık LGS katsayılarıyla hesaplama tabanı
    const toplamPuan =
      195 +
      tNet * 4.3 +
      mNet * 4.2 +
      fNet * 4.1 +
      iNet * 1.7 +
      dNet * 1.8 +
      ingNet * 1.5;

    setPuan(Math.min(500, Math.round(toplamPuan * 100) / 100));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3a8a" }}>
          🧮 LGS Puan Hesaplama
        </h1>
        <p style={{ color: "#64748b" }}>
          Doğru ve yanlış sayılarını girerek tahmini LGS puanını öğrenebilirsin.
        </p>
      </div>

      <form onSubmit={hesapla} style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "12px", alignItems: "center", marginBottom: "12px", fontWeight: "bold", color: "#334155" }}>
          <span>Ders</span>
          <span>Doğru</span>
          <span>Yanlış</span>
          <span>Net</span>
        </div>

        <DersInput label="Türkçe (20 Soru)" dKey="turkce" dogru={dogru} yanlis={yanlis} setDogru={setDogru} setYanlis={setYanlis} max={20} />
        <DersInput label="Matematik (20 Soru)" dKey="matematik" dogru={dogru} yanlis={yanlis} setDogru={setDogru} setYanlis={setYanlis} max={20} />
        <DersInput label="Fen Bilimleri (20 Soru)" dKey="fen" dogru={dogru} yanlis={yanlis} setDogru={setDogru} setYanlis={setYanlis} max={20} />
        <DersInput label="T.C. İnkılap Tarihi (10 Soru)" dKey="inkilap" dogru={dogru} yanlis={yanlis} setDogru={setDogru} setYanlis={setYanlis} max={10} />
        <DersInput label="Din Kültürü (10 Soru)" dKey="din" dogru={dogru} yanlis={yanlis} setDogru={setDogru} setYanlis={setYanlis} max={10} />
        <DersInput label="Yabancı Dil / İngilizce (10 Soru)" dKey="ingilizce" dogru={dogru} yanlis={yanlis} setDogru={setDogru} setYanlis={setYanlis} max={10} />

        <button type="submit" style={btnStyle}>
          Puanı Hesapla
        </button>
      </form>

      {puan !== null && (
        <div style={{ ...cardStyle, marginTop: "20px", textAlign: "center", backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}>
          <span style={{ fontSize: "16px", color: "#1e40af" }}>Tahmini LGS Puanın</span>
          <h2 style={{ fontSize: "42px", fontWeight: "bold", color: "#1e3a8a", margin: "10px 0" }}>
            {puan} / 500
          </h2>
          <p style={{ fontSize: "13px", color: "#64748b" }}>
            * Bu puan MEB'in geçmiş yıl katsayıları baz alınarak yaklaşık olarak hesaplanmıştır.
          </p>
        </div>
      )}
    </div>
  );
}

function DersInput({ label, dKey, dogru, yanlis, setDogru, setYanlis, max }: any) {
  const dVal = dogru[dKey] || 0;
  const yVal = yanlis[dKey] || 0;
  const net = Math.max(0, dVal - yVal / 3).toFixed(2);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "12px", alignItems: "center", marginBottom: "10px" }}>
      <span style={{ fontSize: "14px", fontWeight: "500" }}>{label}</span>
      <input
        type="number"
        min="0"
        max={max}
        value={dogru[dKey] || ""}
        onChange={(e) => setDogru({ ...dogru, [dKey]: Number(e.target.value) })}
        placeholder="0"
        style={inputStyle}
      />
      <input
        type="number"
        min="0"
        max={max}
        value={yanlis[dKey] || ""}
        onChange={(e) => setYanlis({ ...yanlis, [dKey]: Number(e.target.value) })}
        placeholder="0"
        style={inputStyle}
      />
      <span style={{ fontWeight: "bold", color: "#1e40af", paddingLeft: "8px" }}>{net}</span>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  textAlign: "center",
  fontSize: "14px",
  outline: "none"
};

const btnStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#1e3a8a",
  color: "white",
  padding: "12px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "15px"
};