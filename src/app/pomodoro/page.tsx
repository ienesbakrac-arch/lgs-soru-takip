"use client";
import { useState, useEffect } from "react";

export default function PomodoroPage() {
  const CALISMA_SURESI = 40 * 60; // 40 dakika
  const DINLENME_SURESI = 10 * 60; // 10 dakika

  const [kalanSaniye, setKalanSaniye] = useState(CALISMA_SURESI);
  const [mod, setMod] = useState<"calisma" | "dinlenme">("calisma");
  const [aktif, setAktif] = useState(false);

  // Web Audio API ile harici dosya gerektirmeyen, net ve uzun çalan bildirim sesi
  const sesCal = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const notalar = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50]; // C5, E5, G5, C6 akor dizilimi
      notalar.forEach((frekans, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(frekans, ctx.currentTime + index * 0.25);

        gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.25);
        gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + index * 0.25 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.25 + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + index * 0.25);
        osc.stop(ctx.currentTime + index * 0.25 + 1.5);
      });
    } catch (e) {
      console.error("Ses çalınamadı:", e);
    }
  };

  // Sayfa yüklendiğinde localStorage'dan son durumu kontrol et (sayfa arası geçişlerde sıfırlanmayı önler)
  useEffect(() => {
    const kayitliAktif = localStorage.getItem("p_aktif") === "true";
    const kayitliMod = localStorage.getItem("p_mod") as "calisma" | "dinlenme";
    const kayitliBitis = localStorage.getItem("p_bitis");

    if (kayitliMod) setMod(kayitliMod);

    if (kayitliAktif && kayitliBitis) {
      const kalan = Math.floor((Number(kayitliBitis) - Date.now()) / 1000);
      if (kalan > 0) {
        setKalanSaniye(kalan);
        setAktif(true);
      } else {
        suresiBittiHandler(kayitliMod || "calisma");
      }
    } else {
      const kayitliKalan = localStorage.getItem("p_kalan");
      if (kayitliKalan) {
        setKalanSaniye(Number(kayitliKalan));
      }
    }
  }, []);

  const suresiBittiHandler = (currentMod: "calisma" | "dinlenme") => {
    sesCal();
    if (currentMod === "calisma") {
      alert("🎉 40 dakikalık çalışma bitti! Şimdi 10 dakika dinlenme zamanı.");
      setMod("dinlenme");
      setKalanSaniye(DINLENME_SURESI);
      localStorage.setItem("p_mod", "dinlenme");
      localStorage.setItem("p_kalan", DINLENME_SURESI.toString());
    } else {
      alert("⚡ Dinlenme bitti! Tekrar çalışma vakti, hadi başlayalım!");
      setMod("calisma");
      setKalanSaniye(CALISMA_SURESI);
      localStorage.setItem("p_mod", "calisma");
      localStorage.setItem("p_kalan", CALISMA_SURESI.toString());
    }
    setAktif(false);
    localStorage.setItem("p_aktif", "false");
    localStorage.removeItem("p_bitis");
  };

  // Geri sayım ve arka planda çalışma mantığı
  useEffect(() => {
    let timer: any = null;
    if (aktif) {
      const bitisZamani = Date.now() + kalanSaniye * 1000;
      localStorage.setItem("p_aktif", "true");
      localStorage.setItem("p_bitis", bitisZamani.toString());
      localStorage.setItem("p_mod", mod);

      timer = setInterval(() => {
        const anlikKalan = Math.floor((bitisZamani - Date.now()) / 1000);
        if (anlikKalan > 0) {
          setKalanSaniye(anlikKalan);
          localStorage.setItem("p_kalan", anlikKalan.toString());
        } else {
          clearInterval(timer);
          suresiBittiHandler(mod);
        }
      }, 1000);
    } else {
      localStorage.setItem("p_aktif", "false");
      localStorage.removeItem("p_bitis");
    }

    return () => clearInterval(timer);
  }, [aktif, mod]);

  const formatiDuzenle = (saniye: number) => {
    const dk = Math.floor(saniye / 60);
    const sn = saniye % 60;
    return `${dk.toString().padStart(2, "0")}:${sn.toString().padStart(2, "0")}`;
  };

  const baslatDurdurToggle = () => {
    if (!aktif) {
      setAktif(true);
    } else {
      setAktif(false);
      localStorage.setItem("p_aktif", "false");
      localStorage.removeItem("p_bitis");
    }
  };

  const moduDegistir = (yeniMod: "calisma" | "dinlenme") => {
    setAktif(false);
    setMod(yeniMod);
    const yeniSure = yeniMod === "calisma" ? CALISMA_SURESI : DINLENME_SURESI;
    setKalanSaniye(yeniSure);
    localStorage.setItem("p_aktif", "false");
    localStorage.setItem("p_mod", yeniMod);
    localStorage.setItem("p_kalan", yeniSure.toString());
    localStorage.removeItem("p_bitis");
  };

  const sifirla = () => {
    setAktif(false);
    const varsayilanSure = mod === "calisma" ? CALISMA_SURESI : DINLENME_SURESI;
    setKalanSaniye(varsayilanSure);
    localStorage.setItem("p_aktif", "false");
    localStorage.setItem("p_kalan", varsayilanSure.toString());
    localStorage.removeItem("p_bitis");
  };

  return (
    <div style={{ maxWidth: "650px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>🍅 Pomodoro Odak Asistanı</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>Staj ve LGS temposu için **40 dk Çalışma / 10 dk Dinlenme** kuralı.</p>

      {/* Mod Seçim Butonları */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "25px" }}>
        <button 
          onClick={() => moduDegistir("calisma")}
          style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: mod === "calisma" ? "#2563eb" : "#1e293b", color: "#fff", fontWeight: "600", cursor: "pointer" }}
        >
          Çalışma (40 dk) 📚
        </button>
        <button 
          onClick={() => moduDegistir("dinlenme")}
          style={{ padding: "10px 20px", borderRadius: "10px", border: "none", background: mod === "dinlenme" ? "#22c55e" : "#1e293b", color: "#fff", fontWeight: "600", cursor: "pointer" }}
        >
          Dinlenme (10 dk) ☕
        </button>
      </div>

      {/* Sayaç Kartı */}
      <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.06)", padding: "45px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
        <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: "20px", background: mod === "calisma" ? "rgba(37, 99, 235, 0.15)" : "rgba(34, 197, 94, 0.15)", color: mod === "calisma" ? "#38bdf8" : "#4ade80", fontSize: "13px", fontWeight: "600", marginBottom: "20px" }}>
          {mod === "calisma" ? "🔥 Odaklanma Vakti" : "☕ Mola Zamanı"}
        </span>

        <div style={{ fontSize: "64px", fontWeight: "800", color: "#f8fafc", fontFamily: "monospace", marginBottom: "30px", letterSpacing: "2px" }}>
          {formatiDuzenle(kalanSaniye)}
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          {!aktif ? (
            <button onClick={baslatDurdurToggle} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}>
              Başlat ▶
            </button>
          ) : (
            <button onClick={baslatDurdurToggle} style={{ background: "#eab308", color: "#000", border: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}>
              Durdur ⏸
            </button>
          )}
          <button onClick={sifirla} style={{ background: "#334155", color: "#fff", border: "none", padding: "14px 28px", borderRadius: "12px", fontWeight: "600", cursor: "pointer", fontSize: "15px" }}>
            Sıfırla 🔄
          </button>
        </div>
      </div>
    </div>
  );
}