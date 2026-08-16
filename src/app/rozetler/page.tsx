export default function RozetlerPage() {
  const rozetler = [
    { ad: "🚀 İlk Adım", aciklama: "LGS & Staj asistanı platformuna ilk adımını attın.", kazanildi: true },
    { ad: "⏱️ Pomodoro Ustası", aciklama: "İlk 40 dakikalık odak seansını başarıyla tamamla.", kazanildi: true },
    { ad: "📚 Soru Avcısı", aciklama: "Sisteme toplamda 100 soru kaydet.", kazanildi: false },
    { ad: "🎯 Hedef Canavarı", aciklama: "Haftalık soru hedefini %100 tamamla.", kazanildi: false },
    { ad: "🔥 İstikrar Abidesi", aciklama: "3 gün üst üste aralıksız çalışma seansı yap.", kazanildi: false },
    { ad: "📝 Deneme Kurdu", aciklama: "En az 5 adet deneme sonucu kaydet.", kazanildi: false },
    { ad: "🛠️ Stajyer Lider", aciklama: "Staj ve ders dengesini 1 hafta boyunca başarıyla yönet.", kazanildi: false },
    { ad: "👑 LGS Şampiyonu", aciklama: "Tüm hedefleri tamamla ve zirveye yerleş.", kazanildi: false },
  ];

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>🏆 Başarı Rozetlerim</h1>
      <p style={{ color: "#94a3b8", marginBottom: "30px" }}>Çalışmalarını sürdür, hedeflerine ulaştıkça rozetlerin kilidini aç!</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        {rozetler.map((r, i) => (
          <div key={i} style={{ background: "#0b1120", border: `1px solid ${r.kazanildi ? "rgba(56, 189, 248, 0.4)" : "rgba(255,255,255,0.06)"}`, padding: "20px", borderRadius: "14px", opacity: r.kazanildi ? 1 : 0.55, boxShadow: r.kazanildi ? "0 4px 20px rgba(56, 189, 248, 0.08)" : "none" }}>
            <h3 style={{ fontSize: "16px", color: r.kazanildi ? "#38bdf8" : "#94a3b8", marginBottom: "6px" }}>{r.ad}</h3>
            <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "0 0 14px 0", lineHeight: "1.4" }}>{r.aciklama}</p>
            <span style={{ display: "inline-block", fontSize: "11px", padding: "4px 10px", borderRadius: "6px", background: r.kazanildi ? "rgba(56, 189, 248, 0.15)" : "rgba(255,255,255,0.04)", color: r.kazanildi ? "#38bdf8" : "#64748b", fontWeight: "600" }}>
              {r.kazanildi ? "Kazanıldı ✅" : "Kilitli 🔒"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}