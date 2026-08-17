"use client";
import { useState, useEffect } from "react";

export default function TamYetkiliYapayZekaKocu() {
  const [mesajlar, setMesajlar] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [yukleniyor, setYukleniyor] = useState(false);
  const [dinliyor, setDinliyor] = useState(false);
  const [sesliOkuyor, setSesliOkuyor] = useState(true);
  
  const [siteVerileri, setSiteVerileri] = useState({
    isim: "Şampiyon",
    cozulenSoru: 0,
    hedef: 500,
    notlar: "",
  });

  useEffect(() => {
    verileriYukle();
  }, []);

  const verileriYukle = () => {
    const isim = localStorage.getItem("lgs_gercek_kullanici_adi") || "Şampiyon";
    const cozulenSoru = Number(localStorage.getItem("lgs_cozulen_soru") || "0");
    const hedef = Number(localStorage.getItem("lgs_haftalik_hedef") || "500");
    const notlar = localStorage.getItem("lgs_notlar") || "Henüz not eklenmemiş.";

    setSiteVerileri({ isim, cozulenSoru, hedef, notlar });

    setMesajlar([
      {
        rol: "ai",
        icerik: `Selam ${isim}! Ben tam yetkili LGS Koçunum. 🚀 Haftalık hedeflerini güncelleyebilir, notlarını düzenleyebilir veya sorularını yönetebilirim. Bana komut verebilirsin!`
      }
    ]);
  };

  const sesliSoyle = (text: string) => {
    if (!sesliOkuyor || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    window.speechSynthesis.speak(utterance);
  };

  const sesliDinleBaslat = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tarayıcın sesli komut özelliğini desteklemiyor.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.onstart = () => setDinliyor(true);
    recognition.onend = () => setDinliyor(false);
    recognition.onerror = () => setDinliyor(false);
    recognition.onresult = (event: any) => {
      const soz = event.results[0][0].transcript;
      setInput(soz);
      komutIsle(soz);
    };
    recognition.start();
  };

  const mesajGonder = (e: React.FormEvent | null, gelenMetin?: string) => {
    if (e) e.preventDefault();
    const metin = gelenMetin || input;
    if (!metin.trim()) return;

    const yeniKullaniciMesaji = { rol: "kullanici", icerik: metin };
    const guncelMesajlar = [...mesajlar, yeniKullaniciMesaji];
    setMesajlar(guncelMesajlar);
    if (!gelenMetin) setInput("");
    setYukleniyor(true);

    setTimeout(() => {
      const cevap = komutIsle(metin);
      setMesajlar([...guncelMesajlar, { rol: "ai", icerik: cevap }]);
      setYukleniyor(false);
      sesliSoyle(cevap);
    }, 800);
  };

  // SİTE İÇİNDEKİ HER ŞEYİ DEĞİŞTİREN AKILLI KOMUT MERKEZİ
  const komutIsle = (komutMetni: string) => {
    const k = komutMetni.toLowerCase();
    let cevap = "";

    // 1. Hedef Değiştirme Komutu (Örn: "hedefimi 700 yap")
    if (k.includes("hedef") && (k.includes("yap") || k.includes("değiştir"))) {
      const sayilar = k.match(/\d+/);
      if (sayilar) {
        const yeniHedef = sayilar[0];
        localStorage.setItem("lgs_haftalik_hedef", yeniHedef);
        setSiteVerileri(prev => ({ ...prev, hedef: Number(yeniHedef) }));
        cevap = `✅ Harika! Haftalık hedefini başarıyla ${yeniHedef} soru olarak güncelledim.`;
      } else {
        cevap = "⚠️ Yeni hedef için bir sayı belirtmelisin (Örn: Hedefimi 600 yap).";
      }
    } 
    // 2. Not Ekleme Komutu (Örn: "notlarıma ekle: fen tekrarı yap")
    else if (k.includes("not") && (k.includes("ekle") || k.includes("yaz"))) {
      const parca = komutMetni.split(/ekle:|yaz:/i);
      const eklenecekNot = parca[1] ? parca[1].trim() : komutMetni;
      const eskiNotlar = localStorage.getItem("lgs_notlar") || "";
      const yeniNotlar = eskiNotlar + "\n- " + eklenecekNot;
      localStorage.setItem("lgs_notlar", yeniNotlar);
      setSiteVerileri(prev => ({ ...prev, notlar: yeniNotlar }));
      cevap = `📝 Notlarına şu maddeyi ekledim: "${eklenecekNot}"`;
    } 
    // 3. Durum Sorgulama
    else if (k.includes("durum") || k.includes("bilgi") || k.includes("istatistik")) {
      cevap = `📊 Güncel Durumun:\n- İsmin: ${siteVerileri.isim}\n- Çözülen Soru: ${siteVerileri.cozulenSoru}\n- Haftalık Hedef: ${siteVerileri.hedef}`;
    } 
    // 4. Genel Motivasyon ve Sohbet
    else {
      cevap = `${siteVerileri.isim}, isteğini aldım! Çalışmalarını bu doğrultuda yönlendiriyorum. Başarılar dilerim!`;
    }

    return cevap;
  };

  return (
    <div style={{ color: "#f8fafc", maxWidth: "800px", margin: "0 auto", height: "calc(100vh - 80px)", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      <div style={{ background: "#111827", padding: "20px", borderRadius: "16px 16px 0 0", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: "0 0 4px 0", fontSize: "20px" }}>🤖 Tam Yetkili Yapay Zeka Koçu</h1>
          <p style={{ color: "#94a3b8", margin: 0, fontSize: "13px" }}>Hedeflerini değiştirebilir, notlarını düzenleyebilir ve seni yönetebilir.</p>
        </div>
        <button 
          onClick={() => setSesliOkuyor(!sesliOkuyor)}
          style={{ background: sesliOkuyor ? "#16a34a" : "#374151", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "8px", cursor: "pointer", fontSize: "12px" }}
        >
          {sesliOkuyor ? "🔊 Ses: Açık" : "🔇 Ses: Kapalı"}
        </button>
      </div>

      <div style={{ flex: 1, background: "#0b0f19", border: "1px solid rgba(255,255,255,0.08)", borderTop: "none", padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "15px" }}>
        {mesajlar.map((m, i) => (
          <div key={i} style={{ alignSelf: m.rol === "kullanici" ? "flex-end" : "flex-start", maxWidth: "75%", background: m.rol === "kullanici" ? "#2563eb" : "#111827", padding: "12px 16px", borderRadius: "12px", border: m.rol === "ai" ? "1px solid rgba(255,255,255,0.08)" : "none", fontSize: "14px", lineHeight: "1.5", whiteSpace: "pre-line" }}>
            {m.icerik}
          </div>
        ))}
        {yukleniyor && (
          <div style={{ alignSelf: "flex-start", background: "#111827", padding: "10px 16px", borderRadius: "12px", color: "#94a3b8", fontSize: "13px" }}>
            İşlem yapılıyor... ⚙️
          </div>
        )}
      </div>

      <form onSubmit={(e) => mesajGonder(e)} style={{ background: "#111827", padding: "15px", borderRadius: "0 0 16px 16px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "10px", alignItems: "center" }}>
        <button 
          type="button" 
          onClick={sesliDinleBaslat}
          style={{ background: dinliyor ? "#dc2626" : "#2563eb", color: "#fff", border: "none", width: "45px", height: "45px", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}
          title="Konuşmak için tıkla"
        >
          {dinliyor ? "🔴" : "🎤"}
        </button>

        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder="Komut ver (Örn: Hedefimi 750 yap, Notlarıma ekle: Fen tekrarı)..."
          style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #374151", background: "#1f2937", color: "#fff", outline: "none", fontSize: "14px" }}
        />
        
        <button type="submit" style={{ padding: "12px 20px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
          Gönder
        </button>
      </form>
    </div>
  );
}