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
      const { data } = await client
        .from('kullanicilar')
        .select('*')
        .order('skor', { ascending: false });

      if (data) {
        // Aynı isimli kullanıcıları birleştirip en yüksek skorunu alma garantisi
        const benzersizMap = new Map();
        data.forEach((item) => {
          if (!benzersizMap.has(item.isim) || benzersizMap.get(item.isim).skor < (item.skor || 0)) {
            benzersizMap.set(item.isim, item);
          }
        });
        setSiralama(Array.from(benzersizMap.values()).sort((a, b) => (b.skor || 0) - (a.skor || 0)));
      }
    }
    verileriGetir();
  }, []);

  return (
    <div style={{ color: "#fff", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>🏆 Sıralama Tablosu</h1>
      <div style={{ background: "#111827", borderRadius: "12px", padding: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
        {siralama.map((kisi, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "space-between", padding: "12px", borderBottom: index !== siralama.length - 1 ? "1px solid #374151" : "none" }}>
            <span>{index + 1}. {kisi.isim}</span>
            <span style={{ fontWeight: "bold", color: "#38bdf8" }}>{kisi.skor || 0} Soru</span>
          </div>
        ))}
      </div>
    </div>
  );
}