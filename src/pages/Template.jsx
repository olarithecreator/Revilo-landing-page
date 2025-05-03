import { useState, useEffect } from "react";

const templates = [
  { type: "Black", id: "Black", access: "free" },
  { type: "White", id: "White", access: "locked" },
  { type: "Minimal", id: "Minimal", access: "free" },
  { type: "Vibrant", id: "Vibrant", access: "locked" },
  { type: "Modern", id: "Modern", access: "locked" },
  { type: "Elegant", id: "Elegant", access: "locked" },
  { type: "Lucid", id: "Lucid", access: "locked" },
];

const scrapedComments = [
  "Super fast delivery, love it!",
  "Great customer care and communication.",
  "Very professional and timely!",
  "Loved my outfit, exactly as described.",
  "Excellent packaging and presentation!",
  "My friends keep asking where I ordered from.",
  "This is now my go-to page for all gifts!"
];

export default function Template() {
  const [userInstagram, setUserInstagram] = useState("");
  const [downloads, setDownloads] = useState([]);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareTemplate, setShareTemplate] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserInstagram(params.get("instagram") || "your_handle");
    const storedDownloads = JSON.parse(localStorage.getItem("downloads")) || [];
    setDownloads(storedDownloads);
  }, []);

  useEffect(() => {
    document.title = "Templates - Revilo";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "Browse our stunning review card templates.");
  }, []);

  const handleDownload = (template) => {
    const freeDownloads = downloads.filter(d => d.access === "free").length;
    if (template.access === "locked") {
      alert("This template is for paid users only.");
      return;
    }
    if (template.access === "free" && freeDownloads >= 2) {
      alert("Free users can only download 2 templates (Minimal and Black). Please upgrade.");
      return;
    }

    window.open(`/templates/${template.id}.png`, "_blank");

    const newDownload = {
      templateId: template.id,
      templateName: template.type,
      date: new Date().toISOString(),
      instagram: userInstagram,
      access: template.access
    };
    const updated = [...downloads, newDownload];
    localStorage.setItem("downloads", JSON.stringify(updated));
    setDownloads(updated);
    setShareTemplate(template);
    setShowSharePopup(true);
  };

  const getTopUsers = () => {
    const map = {};
    downloads.forEach(d => {
      map[d.instagram] = (map[d.instagram] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px",
        backgroundColor: "#1e1b4b",
        color: "#fff",
        padding: "30px 20px"
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", marginBottom: "20px" }}>Řevilo</h2>
        <p style={{ fontSize: "14px", marginBottom: "40px" }}>
          Turn your social comments into stunning review cards.
        </p>
        <nav style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <a href="#templates" style={{
            background: "#f4f4c6",
            padding: "10px",
            borderRadius: "6px",
            color: "#111",
            textAlign: "center",
            fontWeight: "bold",
            textDecoration: "none"
          }}>Templates</a>
          <a href="#dashboard" style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #fff",
            textAlign: "center",
            color: "#fff",
            textDecoration: "none"
          }}>Dashboard</a>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, background: "#f8f8fc", padding: "40px" }}>
        {/* Top users scrolling line */}
        <div style={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          marginBottom: "30px",
          background: "#eee",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "14px",
          animation: "scroll 15s linear infinite"
        }}>
          <style>{`@keyframes scroll {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }`}</style>
          🏆 Top Users: {getTopUsers().map(([user, count], idx) => (
            <span key={user} style={{ marginRight: "30px" }}>
              #{idx + 1} @{user} — {count} downloads
            </span>
          ))}
        </div>

        <h1 style={{ fontSize: "28px", color: "#333", marginBottom: "20px" }}>Templates</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {templates.map((t, i) => {
            const isLocked = t.access === "locked";
            const comment = scrapedComments[i % scrapedComments.length];
            return (
              <div key={t.id} style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                filter: isLocked ? "blur(1.5px) grayscale(0.6)" : "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
              }}>
                <img src={`/templates/${t.id}.png`} alt={t.type} style={{ width: "100%", marginBottom: "10px" }} />
                <h3>{t.type}</h3>
                <p style={{ fontSize: "13px", fontStyle: "italic", minHeight: "40px" }}>{comment}</p>
                <p style={{ fontSize: "12px", marginTop: "10px", opacity: 0.6 }}>
                  Generated by {t.access === "free" ? "revilo" : `@${userInstagram}`}
                </p>
                {isLocked ? (
                  <button disabled style={{
                    marginTop: "10px",
                    background: "#ccc",
                    color: "#fff",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "none"
                  }}>🔒 Locked</button>
                ) : (
                  <button onClick={() => handleDownload(t)} style={{
                    marginTop: "10px",
                    background: "#1e1b4b",
                    color: "#fff",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "none"
                  }}>Download</button>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
} 