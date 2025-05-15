import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUniqueDownloads } from "./utils";

export default function Dashboard() {
  const [userInstagram, setUserInstagram] = useState("");
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    document.title = "Dashboard - Revilo";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "View your download stats and top templates on your Revilo dashboard.");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserInstagram(params.get("instagram") || "your_handle");
    let stored;
    try {
      const raw = localStorage.getItem("downloads");
      const parsed = JSON.parse(raw);
      stored = Array.isArray(parsed) ? parsed : [];
    } catch {
      stored = [];
    }
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
    <main className="bg-indigo-900 min-h-screen text-white px-4 py-8 md:px-12 md:py-12 font-sans">
      <Link
        to="/template"
        className="inline-block mb-8 px-6 py-2 bg-gradient-to-r from-pink-200 to-purple-300 text-indigo-900 font-bold text-base rounded-lg shadow-md text-center hover:from-purple-300 hover:to-pink-200 hover:text-white transition"
      >
        ← Back to Templates
      </Link>
      <h1 className="text-3xl md:text-4xl font-serif mb-2">Řevilo</h1>
      <p className="text-base md:text-lg text-purple-200 mb-8">Turn your social comments into stunning review cards.</p>

      <h2 className="text-xl md:text-2xl mb-4">Welcome @{userInstagram} 👋</h2>

      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="flex-1 bg-white text-indigo-900 rounded-lg p-6 shadow">
          <h3 className="font-semibold mb-1">Total Downloads</h3>
          <p className="text-2xl font-bold">{downloads.length}</p>
        </div>
        <div className="flex-1 bg-white text-indigo-900 rounded-lg p-6 shadow">
          <h3 className="font-semibold mb-1">Last 7 Days</h3>
          <p className="text-2xl font-bold">{last7Days.length}</p>
        </div>
        <div className="flex-1 bg-white text-indigo-900 rounded-lg p-6 shadow">
          <h3 className="font-semibold mb-1">Last 30 Days</h3>
          <p className="text-2xl font-bold">{last30Days.length}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Top Templates</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {sortedTemplates.map(([name, count]) => (
            <div key={name} className="bg-white text-indigo-900 px-6 py-3 rounded-lg shadow text-center">
              {name} — {count}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 bg-white text-indigo-900 p-6 rounded-lg shadow max-w-xl mx-auto">
        <h4 className="font-semibold mb-2">Free Plan Notice</h4>
        <p>You've used {getUniqueDownloads(downloads).length} out of 3 available free downloads.</p>
        {getUniqueDownloads(downloads).length >= 3 && (
          <p className="text-red-600 font-bold mt-2">
            You've reached your free download limit. Only <b>Black</b> and <b>White</b> templates remain available. Upgrade to unlock more templates.
          </p>
        )}
      </div>
    </main>
  );
}
