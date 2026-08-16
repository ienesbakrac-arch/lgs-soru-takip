"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SoruEkle() {
  const [soru, setSoru] = useState("");
  const router = useRouter();

  const kaydet = () => {
    const isim = localStorage.getItem("lgs_gercek_kullanici_adi");
    if (!isim) return alert("Önce isim girmelisin!");

    const yeniSoruSayisi = parseInt(soru);
    if (isNaN(yeniSoruSayisi)) return;

    // 1. Kişisel toplamı güncelle
    const mevcutSoru = Number(localStorage.getItem("lgs_cozulen_soru") || 0);
    localStorage.setItem("lgs_cozulen_soru", (mevcutSoru + yeniSoruSayisi).toString());

    // 2. Genel sıralama listesini güncelle
    const tumListe = JSON.parse(localStorage.getItem("lgs_tüm_ogrenciler") || "[]");
    const index = tumListe.findIndex((k: any) => k.isim === isim);

    if (index > -1) {
      tumListe[index].cozulenSoru += yeniSoruSayisi;
    } else {
      tumListe.push({ isim: isim, cozulenSoru: yeniSoruSayisi });
    }
    localStorage.setItem("lgs_tüm_ogrenciler", JSON.stringify(tumListe));

    alert("Eklendi!");
    router.push("/");
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Soru Ekle</h1>
      <input type="number" value={soru} onChange={(e) => setSoru(e.target.value)} placeholder="Soru sayısı" style={{ color: "black", padding: "10px" }} />
      <button onClick={kaydet} style={{ padding: "10px", background: "blue", color: "white" }}>Kaydet</button>
    </div>
  );
}