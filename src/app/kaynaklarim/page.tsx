
"use client";

import { useState } from "react";

interface Kaynak {
  id: number;
  ad: string;
  ders: string;
  toplamSayfa: number;
  cozulenSayfa: number;
}

export default function Kaynaklarim() {
  // Varsayılan başlangıç kaynakları (3 adet)
  const [kaynaklar, setKaynaklar] = useState<Kaynak[]>([
    { id: 1, ad: "Soru Bankası A", ders: "Matematik", toplamSayfa: 200, cozulenSayfa: 45 },
    { id: 2, ad: "Paragraf Dünyası", ders: "Türkçe", toplamSayfa: 150, cozulenSayfa: 80 },
    { id: 3, ad: "Fen Nesil Sorular", ders: "Fen Bilimleri", toplamSayfa: 180, cozulenSayfa: 20 }
  ]);

  // Yeni kaynak ekleme form state'leri
  const [yeniAd, setYeniAd] = useState("");
  const [yeniDers, setYeniDers] = useState("Matematik");
  const [yeniToplamSayfa, setYeniToplamSayfa] = useState("");

  // Kaynak Ekleme Fonksiyonu
  const kaynakEkle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeniAd.trim() || !yeniToplamSayfa) return;

    const yeniKaynak: Kaynak = {
      id: Date.now(),
      ad: yeniAd,
      ders: yeniDers,
      toplamSayfa: Number(yeniToplamSayfa),
      cozulenSayfa: 0
    };

    setKaynaklar([...kaynaklar, yeniKaynak]);

    // Formu temizle
    setYeniAd("");
    setYeniToplamSayfa("");
  };

  // Kaynak Silme Fonksiyonu
  const kaynakSil = (id: number) => {
    setKaynaklar(kaynaklar.filter((k) => k.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Kaynaklarım</h1>

      {/* YENİ KAYNAK EKLEME FORMU */}
      <form onSubmit={kaynakEkle} className="bg-slate-800 text-white p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs mb-1 opacity-80">Kaynak Adı</label>
          <input
            type="text"
            placeholder="Örn: Limit Türkçe Soru Bankası"
            value={yeniAd}
            onChange={(e) => setYeniAd(e.target.value)}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
            required
          />
        </div>

        <div className="w-full md:w-40">
          <label className="block text-xs mb-1 opacity-80">Ders</label>
          <select
            value={yeniDers}
            onChange={(e) => setYeniDers(e.target.value)}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
          >
            <option value="Matematik">Matematik</option>
            <option value="Türkçe">Türkçe</option>
            <option value="Fen Bilimleri">Fen Bilimleri</option>
            <option value="T.C. İnkılap">T.C. İnkılap</option>
            <option value="İngilizce">İngilizce</option>
            <option value="Din Kültürü">Din Kültürü</option>
          </select>
        </div>

        <div className="w-full md:w-32">
          <label className="block text-xs mb-1 opacity-80">Toplam Sayfa</label>
          <input
            type="number"
            placeholder="200"
            value={yeniToplamSayfa}
            onChange={(e) => setYeniToplamSayfa(e.target.value)}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded font-medium transition"
        >
          Ekle
        </button>
      </form>

      {/* KAYNAKLAR LİSTESİ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kaynaklar.map((kaynak) => (
          <div key={kaynak.id} className="border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">
                {kaynak.ders}
              </span>
              <h3 className="font-bold text-lg mt-1">{kaynak.ad}</h3>
              <p className="text-sm opacity-70">
                İlerleme: {kaynak.cozulenSayfa} / {kaynak.toplamSayfa} Sayfa
              </p>
            </div>
            <button
              onClick={() => kaynakSil(kaynak.id)}
              className="text-red-500 hover:bg-red-50 p-2 rounded transition text-sm"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}