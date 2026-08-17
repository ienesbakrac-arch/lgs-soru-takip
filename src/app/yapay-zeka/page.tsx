"use client";

import React, { useState, useEffect, useRef } from "react";

interface Mesaj {
  id: string;
  gonderen: "kullanici" | "asistan";
  metin: string;
}

interface Soru {
  id: string;
  tur: "haftalik" | "yanlis";
  metin: string;
}

interface Hedef {
  id: string;
  metin: string;
  tamamlandi: boolean;
}

interface Not {
  id: string;
  icerik: string;
}

export default function KomutaMerkeziPage() {
  const [mesajlar, setMesajlar] = useState<Mesaj[]>([
    {
      id: "1",
      gonderen: "asistan",
      metin: "Selam Enes! Komut sistemim güncellendi. Artık 'Haftalık hedef ekle [metin]', 'Yanlış soru ekle [metin]', 'Not ekle [metin]' veya 'Haftalık soru ekle [metin]' diyerek her şeyi anında ilgili panellere ve ana sayfaya işleyebilirsin. Sesli ya da yazılı komut verebilirsin!"
    }
  ]);
  const [girdi, setGirdi] = useState("");
  const [yaziyor, setYaziyor] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Veriler
  const [haftalikSorular, setHaftalikSorular] = useState<Soru[]>([]);
  const [yanlisSorular, setYanlisSorular] = useState<Soru[]>([]);
  const [haftalikHedefler, setHaftalikHedefler] = useState<Hedef[]>([]);
  const [notlar, setNotlar] = useState<Not[]>([]);

  const sonMesajRef = useRef<HTMLDivElement>(null);

  // Verileri localStorage'dan yükle ve senkronize et
  useEffect(() => {
    const kHaftalikSoru = localStorage.getItem("tm_haftalik_sorular");
    const kYanlisSoru = localStorage.getItem("tm_yanlis_sorular");
    const kHedefler = localStorage.getItem("tm_haftalik_hedefler");
    const kNotlar = localStorage.getItem("tm_notlar");

    if (kHaftalikSoru) setHaftalikSorular(JSON.parse(kHaftalikSoru));
    if (kYanlisSoru) setYanlisSorular(JSON.parse(kYanlisSoru));
    if (kHedefler) setHaftalikHedefler(JSON.parse(kHedefler));
    if (kNotlar) setNotlar(JSON.parse(kNotlar));
  }, []);

  useEffect(() => {
    sonMesajRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mesajlar, yaziyor]);

  // Sesli Okuma (Text-to-Speech)
  const sesliSoyle = (metin: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(metin);
    utterance.lang = "tr-TR";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Akıllı Komut İşleme ve Panele Aktarma Motoru
  const komutuIsle = (komutMetni: string) => {
    const m = komutMetni.toLowerCase();
    let cevap = "";

    // 1. HAFTALIK HEDEF EKLEME
    if (m.includes("haftalık hedef ekle") || m.includes("haftaya hedef ekle")) {
      const icerik = komutMetni.replace(/haftalık hedef ekle|haftaya hedef ekle/gi, "").trim() || "Yeni Haftalık Hedef";
      const yeni: Hedef = { id: Date.now().toString(), metin: icerik, tamamlandi: false };
      const guncel = [yeni, ...haftalikHedefler];
      setHaftalikHedefler(guncel);
      localStorage.setItem("tm_haftalik_hedefler", JSON.stringify(guncel));
      cevap = `🎯 Haftalık hedeflere başarıyla eklendi: "${icerik}"`;
    }
    // 2. YANLIŞ SORU EKLEME (Yanlış Defteri)
    else if (m.includes("yanlış soru ekle") || m.includes("yanlış kaydet") || m.includes("yanlış defterine ekle")) {
      const icerik = komutMetni.replace(/yanlış soru ekle|yanlış kaydet|yanlış defterine ekle/gi, "").trim() || "Genel Yanlış Soru";
      const yeni: Soru = { id: Date.now().toString(), tur: "yanlis", metin: icerik };
      const guncel = [yeni, ...yanlisSorular];
      setYanlisSorular(guncel);
      localStorage.setItem("tm_yanlis_sorular", JSON.stringify(guncel));
      cevap = `❌ Yanlış soru defterine kaydedildi: "${icerik}"`;
    }
    // 3. HAFTALIK SORU EKLEME
    else if (m.includes("haftalık soru ekle") || m.includes("haftaya soru ekle")) {
      const icerik = komutMetni.replace(/haftalık soru ekle|haftaya soru ekle/gi, "").trim() || "Genel Haftalık Soru";
      const yeni: Soru = { id: Date.now().toString(), tur: "haftalik", metin: icerik };
      const guncel = [yeni, ...haftalikSorular];
      setHaftalikSorular(guncel);
      localStorage.setItem("tm_haftalik_sorular", JSON.stringify(guncel));
      cevap = `✅ Haftalık soru listesine eklendi: "${icerik}"`;
    }
    // 4. NOT EKLEME (Notlar / Sol Panel)
    else if (m.includes("not ekle") || m.includes("not al")) {
      const icerik = komutMetni.replace(/not ekle|not al/gi, "").trim() || "Önemli Not";
      const yeni: Not = { id: Date.now().toString(), icerik };
      const guncel = [yeni, ...notlar];
      setNotlar(guncel);
      localStorage.setItem("tm_notlar", JSON.stringify(guncel));
      cevap = `📌 Not defterine kaydedildi: "${icerik}"`;
    }
    // 5. GENEL SOHBET
    else {
      if (m.includes("merhaba") || m.includes("selam")) {
        cevap = "Aleykümselam Enes! Hangi alanda işlem yapmak istiyorsun? Hedef, yanlış soru veya not ekleyebilirim.";
      } else {
        cevap = `"${komutMetni}" komutunu aldım ancak tam olarak hangi kategoriye (hedef, yanlış soru, not, haftalık soru) eklemem gerektiğini anlamadım. Lütfen komutun başına eklemek istediğin yeri belirt (Örn: Haftalık hedef ekle...).`;
      }
    }

    sesliSoyle(cevap);
    return cevap;
  };

  // Sesli Dinleme (SpeechRecognition)
  const sesliDinlemeyiBaslat = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Tarayıcınız sesli komut özelliğini desteklemiyor.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "tr-TR";
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const metin = event.results[0][0].transcript;
      setIsListening(false);

      const kMesaj: Mesaj = { id: Date.now().toString(), gonderen: "kullanici", metin: `🎤 ${metin}` };
      setMesajlar((prev) => [...prev, kMesaj]);
      setYaziyor(true);

      setTimeout(() => {
        const cevap = komutuIsle(metin);
        const aMesaj: Mesaj = { id: (Date.now() + 1).toString(), gonderen: "asistan", metin: cevap };
        setMesajlar((prev) => [...prev, aMesaj]);
        setYaziyor(false);
      }, 600);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const mesajGonder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!girdi.trim() || yaziyor) return;

    const kullaniciMetni = girdi;
    const kMesaj: Mesaj = { id: Date.now().toString(), gonderen: "kullanici", metin: kullaniciMetni };
    setMesajlar((prev) => [...prev, kMesaj]);
    setGirdi("");
    setYaziyor(true);

    setTimeout(() => {
      const cevap = komutuIsle(kullaniciMetni);
      const aMesaj: Mesaj = { id: (Date.now() + 1).toString(), gonderen: "asistan", metin: cevap };
      setMesajlar((prev) => [...prev, aMesaj]);
      setYaziyor(false);
    }, 600);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 20px", fontFamily: "sans-serif", color: "#f8fafc" }}>
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "6px" }}>⚡ Tam Senkronize AI Komuta Merkezi</h1>
        <p style={{ color: "#94a3b8", fontSize: "14px" }}>Sesli veya yazılı komut ver; hedefler, yanlış sorular, notlar ve haftalık sorular anında panellere ve ana sayfaya işlensin!</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "20px" }}>
        
        {/* SOL: SOHBET VE SES MOTORU */}
        <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", height: "600px", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
          
          <div style={{ padding: "15px 20px", background: "#020617", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#38bdf8" }}>💬 Aktif Sohbet & Komut Motoru</span>
            <button 
              onClick={sesliDinlemeyiBaslat}
              style={{
                background: isListening ? "#ef4444" : "#22c55e",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              {isListening ? "🔴 Dinleniyor..." : "🎤 Sesli Komut Ver"}
            </button>
          </div>

          <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px" }}>
            {mesajlar.map((m) => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.gonderen === "kullanici" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "12px 16px",
                  borderRadius: "14px",
                  background: m.gonderen === "kullanici" ? "#2563eb" : "#1e293b",
                  color: "#f8fafc",
                  fontSize: "14px",
                  lineHeight: "1.5"
                }}>
                  {m.metin}
                </div>
              </div>
            ))}
            {yaziyor && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "12px 16px", borderRadius: "14px", background: "#1e293b", color: "#94a3b8", fontSize: "13px" }}>
                  İşleniyor ve seslendiriliyor... 🔊
                </div>
              </div>
            )}
            <div ref={sonMesajRef} />
          </div>

          <form onSubmit={mesajGonder} style={{ display: "flex", padding: "15px", background: "#020617", borderTop: "1px solid rgba(255,255,255,0.06)", gap: "10px" }}>
            <input 
              type="text" 
              value={girdi}
              onChange={(e) => setGirdi(e.target.value)}
              placeholder="Örn: Haftalık hedef ekle Matematik tekrarı yap..."
              style={{ flex: 1, padding: "12px 16px", borderRadius: "12px", border: "1px solid #334155", background: "#0f172a", color: "#fff", outline: "none", fontSize: "14px" }}
            />
            <button type="submit" style={{ background: "#2563eb", color: "#fff", border: "none", padding: "0 20px", borderRadius: "12px", fontWeight: "650", cursor: "pointer" }}>
              Gönder 🚀
            </button>
          </form>
        </div>

        {/* SAĞ: TÜM SİTE İÇİ PANELLER VE LİSTELER */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", maxHeight: "600px", overflowY: "auto" }}>
          
          {/* 1. Haftalık Hedefler */}
          <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "10px", color: "#facc15" }}>🎯 Haftalık Hedefler ({haftalikHedefler.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "120px", overflowY: "auto" }}>
              {haftalikHedefler.length === 0 ? (
                <p style={{ fontSize: "12px", color: "#64748b" }}>Henüz haftalık hedef eklenmedi.</p>
              ) : (
                haftalikHedefler.map((h) => (
                  <div key={h.id} style={{ background: "#1e293b", padding: "8px 10px", borderRadius: "8px", fontSize: "12px" }}>
                    🎯 {h.metin}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. Yanlış Soru Defteri */}
          <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "10px", color: "#ef4444" }}>❌ Yanlış Soru Defteri ({yanlisSorular.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "120px", overflowY: "auto" }}>
              {yanlisSorular.length === 0 ? (
                <p style={{ fontSize: "12px", color: "#64748b" }}>Henüz yanlış soru eklenmedi.</p>
              ) : (
                yanlisSorular.map((s) => (
                  <div key={s.id} style={{ background: "#1e293b", padding: "8px 10px", borderRadius: "8px", fontSize: "12px", borderLeft: "3px solid #ef4444" }}>
                    ❌ {s.metin}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 3. Haftalık Sorular */}
          <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "10px", color: "#38bdf8" }}>📝 Haftalık Sorular ({haftalikSorular.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "120px", overflowY: "auto" }}>
              {haftalikSorular.length === 0 ? (
                <p style={{ fontSize: "12px", color: "#64748b" }}>Henüz haftalık soru eklenmedi.</p>
              ) : (
                haftalikSorular.map((s) => (
                  <div key={s.id} style={{ background: "#1e293b", padding: "8px 10px", borderRadius: "8px", fontSize: "12px", borderLeft: "3px solid #38bdf8" }}>
                    ✅ {s.metin}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 4. Notlar */}
          <div style={{ background: "#0b1120", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "10px", color: "#4ade80" }}>📌 Notlar ({notlar.length})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "120px", overflowY: "auto" }}>
              {notlar.length === 0 ? (
                <p style={{ fontSize: "12px", color: "#64748b" }}>Henüz not eklenmedi.</p>
              ) : (
                notlar.map((n) => (
                  <div key={n.id} style={{ background: "#1e293b", padding: "8px 10px", borderRadius: "8px", fontSize: "12px" }}>
                    📌 {n.icerik}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}