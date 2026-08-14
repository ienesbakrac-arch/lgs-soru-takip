export default function Yapimci() {
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div style={cardStyle}>
        <div style={{ textDecoration: "none", textAlign: "center", marginBottom: "24px" }}>
          <div style={{
            width: "90px",
            height: "90px",
            backgroundColor: "#1e3a8a",
            color: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            margin: "0 auto 16px auto",
            fontWeight: "bold"
          }}>
            💻
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3a8a", marginBottom: "4px" }}>
            İsmail Enes BAKRAÇ
          </h1>
          <span style={{ fontSize: "14px", color: "#2563eb", fontWeight: "600", backgroundColor: "#dbeafe", padding: "4px 12px", borderRadius: "12px" }}>
            Kurucu & Yazılım Geliştirici
          </span>
        </div>

        <div style={{ color: "#475569", lineHeight: "1.7", fontSize: "15px" }}>
          <p style={{ marginBottom: "16px" }}>
            Merhaba! Ben <strong>[SENİN ADIN]</strong>. Teknolojiyi ve yazılımı kullanarak öğrencilerin hayatını kolaylaştıran dijital çözümler üretiyorum.
          </p>
          <p style={{ marginBottom: "16px" }}>
            Bu platformu geliştirirken temel amacım; öğrencilerin ders çalışma süreçlerini eğlenceli, düzenli ve ölçülebilir bir hale getirmekti. Modern web teknolojilerini kullanarak tasarladığım bu sistem sayesinde binlerce öğrenci hedeflerine bir adım daha yaklaşıyor.
          </p>
          <p>
            Eğitimde dijital dönüşüme inanıyor, sürekli kendimi geliştirerek gençlere ilham verecek projeler üretmeye devam ediyorum! 🚀
          </p>
        </div>

        <hr style={{ border: "0.5px solid #e2e8f0", margin: "24px 0" }} />

        <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e3a8a", margin: 0 }}>Next.js 14</h3>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Teknoloji</span>
          </div>
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#16a34a", margin: 0 }}>%100</h3>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Yerli Geliştirme</span>
          </div>
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#d97706", margin: 0 }}>LGS 2026</h3>
            <span style={{ fontSize: "12px", color: "#64748b" }}>Uyumlu</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "36px",
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
};