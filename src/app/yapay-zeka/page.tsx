"use client";
import { useState, useEffect } from "react";

interface Mesaj {
  gonderen: "kullanici" | "ai";
  metin: string;
}

export default function SesliAsistanPage() {
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([
    { 
      gonderen: "ai", 
      metin: "Selam! Ben senin sesli LGS ve Staj Asistanınım. İstersen mikrofona basarak konuşabilir ya da yazabilirsin. Sana nasıl yardımcı olayım? 🎙️🤖" 
    }
  ]);
  const [inputMetin, setInputMetin] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [aktifHedef, setAktifHedef] = useState<string>("Belirlenmedi");
  const [dinleniyor, setDinleniyor] = useState(false);

  useEffect(() => {
    const kayitliHedef = localStorage.getItem("lgs_haftalik_hedef_ai");
    if (kayitliHedef) {
      setAktifHedef(kayitliHedef);
    }
  }, []);

  // Metni sesli okuma fonksiyonu (Text-to-Speech)
  const sesliSoyle = (metin: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Önceki ses varsa durdur
      const konusma = new SpeechSynthesisUtterance(metin);
      konusma.lang = "tr-TR";
      konusma.rate = 1.0;
      window.speechSynthesis.speak(konusma);
    }
  };

  // Mikrofondan ses dinleme fonksiyonu (Speech Recognition)
  const sesliDinleBaslat = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tarayıcınız ses tanıma özelliğini desteklemiyor. Lütfen Chrome kullanın.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setDinleniyor(true);
    };

    recognition.onresult = (event: any) => {
      const sesliYazi = event.results[0][0].transcript;
      setInputMetin(sesliYazi);
      setDinleniyor(false);
    };

    recognition.onerror = () => {
      setDinleniyor(false);
    };

    recognition.onend = () => {
      setDinleniyor(false);
    };

    recognition.start();
  };

  const mesajGonder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMetin.trim()) return;

    const yeniKullaniciMesaji: Mesaj = { gonderen: "kullanici", metin: inputMetin };
    const guncelMesajlar = [...mesajlar, yeniKullaniciMesaji];
    setMesajlar(guncelMesajlar);
    const gonderilenSoru = inputMetin;
    setInputMetin("");
    setYukleniyor(true);

    setTimeout(() => {
      let aiYaniti = "";
      const metin = gonderilenSoru.toLowerCase();

      if (metin.includes("soru hedefi") || metin.includes("haftalık") || metin.includes("soru gir")) {
        const sayiBul = metin.match(/\d+/);
        if (sayiBul) {
          const miktar = sayiBul[0];
          setAktifHedef(`${miktar} Soru`);
          localStorage.setItem("lgs_haftalik_hedef_ai", `${miktar} Soru`);
          aiYaniti = `Harika! Haftalık soru hedefini ${miktar} soru olarak kaydettim. Başka bir isteğin var mı?`;
        } else {
          aiYaniti = "Haftalık kaç soru hedefi koymamı istediğini sayı belirterek söyler misin?";
        }
      } else if (metin.includes("staj") || metin.includes("iş")) {
        aiYaniti = "Staj yorgunluğunu anlıyorum. Eve gelince önce kısa bir mola verip en zor dersi aradan çıkarmanı öneririm.";
      } else if (metin.includes("kim yaptı")) {
        aiYaniti = "Bu siteyi ve akıllı takip sistemini sen ve ben birlikte inşa ettik!";
      } else {
        aiYaniti = `Dediklerini aldım: "${gonderilenSoru}". Bu konuda sana destek olmaya devam edeceğim!`;
      }

      setMesajlar([...guncelMesajlar, { gonderen: "ai", metin: aiYaniti }]);
      setYukleniyor(false);
      
      // Yapay zeka yanıtını otomatik seslendir
      sesliSoyle(aiYaniti);
    }, 900);
  };

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", color: "#f8fafc", fontFamily: "sans-serif", display: "flex", flexDirection: "column", height: "85vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "6px" }}>🎙️ Sesli ve Akıllı Yapay Zeka Koçu</h1>
      <p style={{ color: "#94a3b8", marginBottom: "20px", fontSize: "14px" }}>Mikrofona basarak konuşabilir, asistanın sana sesli yanıt vermesini sağlayabilirsin.</p>

      {/* DURUM BİLGİ KARTI */}
      <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", padding: "14px 20px", borderRadius: "12px", marginBottom: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "#94a3b8" }}>Haftalık Soru Hedefi:</span>
        <span style={{ fontSize: "16px", fontWeight: "700", color: "#38bdf8" }}>{aktifHedef}</span>
      </div>

      {/* SOHBET GEÇMİŞİ */}
      <div style={{ flex: 1, background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
        {mesajlar.map((msg, index) => (
          <div key={index} style={{ display: "flex", justifyContent: msg.gonderen === "kullanici" ? "flex-end" : "flex-start", alignItems: "center", gap: "8px" }}>
            <div style={{ 
              maxWidth: "75%", 
              padding: "14px 18px", 
              borderRadius: "14px", 
              background: msg.gonderen === "kullanici" ? "#2563eb" : "#1e293b", 
              color: "#fff", 
              fontSize: "14px", 
              lineHeight: "1.5"
            }}>
              {msg.metin}
            </div>
            {msg.gonderen === "ai" && (
              <button 
                onClick={() => sesliSoyle(msg.metin)} 
                title="Sesli Dinle"
                style={{ background: "#334155", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                🔊
              </button>
            )}
          </div>
        ))}
        {yukleniyor && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ background: "#1e293b", padding: "12px 16px", borderRadius: "14px", color: "#94a3b8", fontSize: "13px" }}>
              Asistan düşünüyor ve ses hazırlıyor... 💭
            </div>
          </div>
        )}
      </div>

      {/* GİRİŞ ALANI VE MİKROFON */}
      <form onSubmit={mesajGonder} style={{ display: "flex", gap: "10px" }}>
        <button 
          type="button" 
          onClick={sesliDinleBaslat}
          style={{ padding: "0 16px", background: dinleniyor ? "#ef4444" : "#334155", color: "#fff", border: "none", borderRadius: "12px", cursor: "pointer", fontSize: "18px" }}
          title="Sesli Konuş"
        >
          {dinleniyor ? "🔴 Dinleniyor..." : "🎤"}
        </button>

        <input 
          type="text" 
          value={inputMetin} 
          onChange={(e) => setInputMetin(e.target.value)} 
          placeholder="Yazarak veya mikrofona konuşarak komut ver..." 
          style={{ flex: 1, padding: "14px", background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", outline: "none", fontSize: "14px" }}
        />
        
        <button type="submit" style={{ padding: "0 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "600", cursor: "pointer" }}>
          Gönder
        </button>
      </form>
    </div>
  );
}