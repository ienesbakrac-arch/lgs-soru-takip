"use client";
import { useState, useEffect } from "react";

export default function Notlar() {
  const [notMetni, setNotMetni] = useState("");
  const [notlarListesi, setNotlarListesi] = useState<string[]>([]);

  useEffect(() => {
    const kayitli = localStorage.getItem("lgs_hizli_notlar");
    if (kayitli) {
      try {
        setNotlarListesi(JSON.parse(kaydetKontrol(kayitli)));
      } catch (e) {}
    }
  }, []);

  function kaydetKontrol(veri: string) {
    return veri;
  }

  const notEkle = (e: React.FormEvent) => {
    e.preventDefault();
    if (notMetni.trim()) {
      const yeniListe = [notMetni.trim(), ...notlarListesi];
      setNotlarListesi(yeniListe);
      localStorage.setItem("lgs_hizli_notlar", JSON.stringify(yeniListe));
      setNotMetni("");
    }
  };

  const notSil = (index: number) => {
    const yeniListe = notlarListesi.filter((_, i) => i !== index);
    setNotlarListesi(yeniListe);
    localStorage.setItem("lgs_hizli_notlar", JSON.stringify(yeniListe));
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "700px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>📝 Hızlı Notlar & Formüller</h1>
      <p style={{ color: "#94a3b8", marginBottom: "20px" }}>Unutmak istemediğin önemli formülleri veya ipuçlarını buraya hızla kaydet.</p>

      <form onSubmit={notEkle} style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
        <input 
          type="text" 
          placeholder="Örn: Asal sayılar 1 ve kendisinden başka böleni olmayan..."
          value={notMetni}
          onChange={(e) => setNotMetni(e.target.value)}
          style={{ flex: 1, padding: "12px", borderRadius: "8px", backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "14px" }}
          required
        />
        <button type="submit" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "12px 20px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>
          Not Ekle +
        </button>
      </form>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {notlarListesi.length === 0 ? (
          <p style={{ color: "#94a3b8", textAlign: "center", padding: "20px" }}>Henüz eklenmiş bir notun yok.</p>
        ) : (
          notlarListesi.map((not, index) => (
            <div key={index} style={{ backgroundColor: "#111827", padding: "16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#f8fafc" }}>{not}</span>
              <button onClick={() => notSil(index)} style={{ background: "transparent", border: "none", color: "#f87171", cursor: "pointer", fontSize: "16px" }}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}