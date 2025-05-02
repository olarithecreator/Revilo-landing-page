import { useState, useEffect } from "react";

export default function Dashboard() {
  const [userInstagram, setUserInstagram] = useState("");
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserInstagram(params.get("instagram") || "your_handle");
    const stored = JSON.parse(localStorage.getItem("downloads")) || [];
    setDownloads(stored);
  }, []);

  const last7Days = downloads.filter(d => {
    const daysAgo = new Date().getTime() - new Date(d.date).getTime();
    return daysAgo < 7 * 24 * 60 * 60 * 1000;
  });

  const last30Days = downloads.filter(d => {
    const daysAgo = new Date().getTime() - new Date(d.date).getTime();
    return daysAgo < 30 * 24 * 60 * 60 * 1000;
  });

  const topTemplates = {};
  downloads.forEach(d => {
    topTemplates[d.templateId] = (topTemplates[d.templateId] || 0) + 1;
  });
  const sortedTemplates = Object.entries(topTemplates).sort((a, b) => b[1] - a[1]).slice(0, 3);

  return (
    <div style={{
      backgroundColor: "#1e1b4b",
      minHeight: "100vh",
      color: "#fff",
      padding: "40px",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ fontSize: "36px", fontFamily: "'Playfair Display', serif", marginBottom: "10px" }}>Řevilo</h1>
      <p style={{ fontSize: "16px", color: "#cfc7f8", marginBottom: "30px" }}>
        Turn your social comments into stunning review cards.
      </p>

      <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>Welcome @{userInstagram} 👋</h2>

      <div style={{
        display: "flex",
        gap: "40px",
        flexWrap: "wrap",
        marginBottom: "30px"
      }}>
        <div>
          <h3>Total Downloads</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{downloads.length}</p>
        </div>
        <div>
          <h3>Last 7 Days</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{last7Days.length}</p>
        </div>
        <div>
          <h3>Last 30 Days</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold" }}>{last30Days.length}</p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Top Templates</h3>
        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          {sortedTemplates.map(([name, count]) => (
            <div key={name} style={{
              background: "#fff",
              color: "#1e1b4b",
              padding: "10px 20px",
              borderRadius: "8px"
            }}>
              {name} — {count}
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: "40px",
        background: "#fff",
        color: "#1e1b4b",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "500px"
      }}>
        <h4>Free Plan Notice</h4>
        <p>You’ve used {downloads.length} out of 2 available free downloads.</p>
        {downloads.length >= 2 && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            You’ve reached your limit. Upgrade to unlock more templates.
          </p>
        )}
      </div>
    </div>
  );
}
