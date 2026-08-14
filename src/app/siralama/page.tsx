"use client";

export default function Siralama() {
  const ogrenciler = [
    { sira: 1, isim: "Ahmet Y. (Sen)", soru: 450, puan: 980 },
    { sira: 2, isim: "Zeynep K.", soru: 420, puan: 920 },
    { sira: 3, isim: "Mehmet D.", soru: 390, puan: 880 },
    { sira: 4, isim: "Elif S.", soru: 350, puan: 790 },
    { sira: 5, isim: "Mustafa A.", soru: 310, puan: 710 },
  ];

  return (
    <div style={{ color: "#f8fafc", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>🥇 Liderlik Sıralaması</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>LGS hazırlık sürecindeki diğer öğrencilerle yarış ve zirveye yerleş!</p>

      <div style={{ backgroundColor: "#111827", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ backgroundColor: "#1f2937", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#94a3b8", fontSize: "13px" }}>
              <th style={{ padding: "14px 16px" }}>Sıra</th>
              <th style={{ padding: "14px 16px" }}>Öğrenci</th>
              <th style={{ padding: "14px 16px" }}>Çözülen Soru</th>
              <th style={{ padding: "14px 16px" }}>Puan</th>
            </tr>
          </thead>
          <tbody>
            {ogrenciler.map((item) => (
              <tr key={item.sira} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", backgroundColor: item.sira === 1 ? "rgba(37, 99, 235, 0.1)" : "transparent" }}>
                <td style={{ padding: "14px 16px", fontWeight: "bold" }}>#{item.sira}</td>
                <td style={{ padding: "14px 16px" }}>{item.isim}</td>
                <td style={{ padding: "14px 16px" }}>{item.soru} Soru</td>
                <td style={{ padding: "14px 16px", color: "#38bdf8", fontWeight: "bold" }}>{item.puan} Puan</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}