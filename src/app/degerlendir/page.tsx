"use client";
import { useState, useEffect } from "react";

export default function DegerlendirmePage() {
  const [isim, setIsim] = useState("");
  const [puan, setPuan] = useState("5");
  const [yorum, setYorum] = useState("");
  const [yorumlar, setYorumlar] = useState<any[]>([]);

  useEffect(() => {
    const kayitliVeri = localStorage.getItem("lgs_tum_yorumlar");
    if (kayitliVeri) {
      try {
        setYorumlar(JSON.parse(kayitliVeri));
      } catch (err) {
        console.error("Yorumlar yüklenirken hata oluştu:", err);
      }
    }
  }, []);

  const handleKaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yorum.trim()) return;

    const yeniYorum = {
      id: Date.now(),
      isim: isim.trim() || "İsimsiz",
      puan: puan,
      yorum: yorum.trim(),
      tarih: new Date().toLocaleDateString("tr-TR"),
    };

    const yeniListe = [yeniYorum, ...yorumlar];
    setYorumlar(yeniListe);
    localStorage.setItem("lgs_tum_yorumlar", JSON.stringify(yeniListe));

    setIsim("");
    setYorum("");
    alert("Değerlendirmeniz başarıyla kaydedildi!");
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "650px", margin: "0 auto", fontFamily: "system-ui, -apple-system, sans-serif", color: "#f8fafc" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "25px", textAlign: "center", color: "#ffffff", letterSpacing: "-0.5px" }}>
        ⭐ Değerlendirmeler ve Yorumlar
      </h1>

      {/* Form Bölümü */}
      <div style={{ background: "#1e293b", borderRadius: "16px", padding: "25px", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)", border: "1px solid #334155", marginBottom: "35px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "15px", color: "#f1f5f9" }}>
          Sistemi Değerlendir
        </h2>
        <form onSubmit={handleKaydet} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#cbd5e1" }}>
              Adın (İsteğe bağlı)
            </label>
            <input 
              value={isim} 
              onChange={(e) => setIsim(e.target.value)}
              placeholder="Örn: İsmail Enes" 
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #475569", background: "#0f172a", color: "#ffffff", outline: "none", fontSize: "14px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#cbd5e1" }}>
              Puanın
            </label>
            <select 
              value={puan} 
              onChange={(e) => setPuan(e.target.value)} 
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #475569", background: "#0f172a", color: "#ffffff", outline: "none", fontSize: "14px" }}
            >
              <option value="5">⭐⭐⭐⭐⭐ (5 - Mükemmel)</option>
              <option value="4">⭐⭐⭐⭐ (4 - Çok İyi)</option>
              <option value="3">⭐⭐⭐ (3 - İyi)</option>
              <option value="2">⭐⭐ (2 - Geliştirilebilir)</option>
              <option value="1">⭐ (1 - Zayıf)</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "6px", color: "#cbd5e1" }}>
              Yorumun
            </label>
            <textarea 
              value={yorum} 
              onChange={(e) => setYorum(e.target.value)}
              placeholder="Sistem hakkındaki düşüncelerini paylaş..." 
              rows={3}
              style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid #475569", background: "#0f172a", color: "#ffffff", outline: "none", fontSize: "14px", resize: "vertical" }}
              required
            />
          </div>

          <button 
            type="submit" 
            style={{ width: "100%", padding: "12px", background: "#2563eb", color: "white", border: "none", borderRadius: "10px", fontWeight: "600", fontSize: "15px", cursor: "pointer", transition: "background 0.2s" }}
          >
            Değerlendirmeyi Gönder
          </button>
        </form>
      </div>

      {/* Yorumların Listelendiği Bölüm */}
      <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "15px", color: "#f1f5f9" }}>
        Kullanıcı Yorumları ({yorumlar.length})
      </h2>

      {yorumlar.length === 0 ? (
        <div style={{ textAlign: "center", padding: "30px", background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", color: "#94a3b8" }}>
          Henüz değerlendirme yapılmamış. İlk değerlendirmeyi sen yap!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {yorumlar.map((y) => (
            <div key={y.id} style={{ background: "#1e293b", borderRadius: "12px", padding: "20px", border: "1px solid #334155", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontWeight: "700", color: "#ffffff", fontSize: "15px" }}>{y.isim}</span>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>{y.tarih}</span>
              </div>
              <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                {"⭐".repeat(Number(y.puan))} <span style={{ color: "#94a3b8", fontSize: "13px", marginLeft: "5px" }}>({y.puan}/5)</span>
              </div>
              <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5", margin: 0 }}>
                {y.yorum}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}