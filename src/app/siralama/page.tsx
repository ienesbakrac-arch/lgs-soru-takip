"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tpemdbruuucesmjnlcuf.supabase.co";
const supabaseKey = "sb_publishable_4lp4K2ohWa9SrqWuI7wlGA_RTiNK-i2";
const client = createClient(supabaseUrl, supabaseKey);

export default function SiralamaSayfasi() {
  const [siralama, setSiralama] = useState<any[]>([]);

  useEffect(() => {
    async function verileriGetir() {
      // Skor (soru sayısı) sütununa göre büyükten küçüğe sırala
      const { data } = await client
        .from('kullanicilar')
        .select('*')
        .order('skor', { ascending: false });

      if (data) setSiralama(data);
    }
    verileriGetir();
  }, []);

  return (
    <div style={{ color: "#fff", padding: "20px" }}>
      <h1>🏆 Sıralama</h1>
      {siralama.map((kisi, index) => (
        <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #374151" }}>
          <span>{index + 1}. {kisi.isim}</span>
          <span>{kisi.skor || 0} Soru</span>
        </div>
      ))}
    </div>
  );
}