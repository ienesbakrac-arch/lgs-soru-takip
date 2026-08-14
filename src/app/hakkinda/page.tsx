export default function Hakkinda() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#1e3a8a", marginBottom: "8px" }}>
          🚀 Soru Takip Platformu Hakkında
        </h1>
        <p style={{ color: "#64748b", fontSize: "16px" }}>
          Öğrencilerin LGS ve ders başarısını zirveye taşımak için tasarlandı.
        </p>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b", marginBottom: "12px" }}>
          🎯 Misyonumuz
        </h2>
        <p style={{ color: "#475569", lineHeight: "1.6", marginBottom: "20px" }}>
          5, 6, 7 ve 8. sınıf öğrencilerinin çalışma disiplini kazanmalarını, günlük ve haftalık soru hedeflerini kolayca takip etmelerini sağlamak amacıyla geliştirilmiş yenilikçi bir eğitim platformudur. Karmaşık tablolardan uzak, modern ve kullanımı son derece pratik bir arayüz sunar.
        </p>

        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e293b", marginBottom: "12px" }}>
          🌟 Öne Çıkan Özellikler
        </h2>
        <ul style={{ color: "#475569", lineHeight: "1.8", paddingLeft: "20px" }}>
          <li><strong>Günlük & Haftalık Takip:</strong> Çözülen soruları anında kaydetme ve hedef yüzdesini canlı görme.</li>
          <li><strong>LGS Hesaplama Motoru:</strong> Güncel MEB katsayılarıyla anında net ve puan analizi.</li>
          <li><strong>Kaynak Yönetimi:</strong> Soru bankalarının bitme oranlarını görsel grafiklerle takip etme.</li>
          <li><strong>Ders İstatistikleri:</strong> Eksik kalınan dersleri tespit edip nokta atışı çalışma imkanı.</li>
        </ul>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "32px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
};