import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getUniqueDownloads, getUserState, isTemplateLocked } from "./utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TemplateCard from "./TemplateCard";

const templates = [
  { id: "Black", type: "Black", alwaysFree: true, premiumOnly: false, description: "Classic black review card.", image: "/templates/Black.png" },
  { id: "White", type: "White", alwaysFree: false, premiumOnly: false, description: "Clean white review card.", image: "/templates/White.png" },
  { id: "Minimal", type: "Minimal", alwaysFree: false, premiumOnly: false, description: "Minimalist review card.", image: "/templates/Minimal.png" },
  { id: "Vibrant", type: "Vibrant", alwaysFree: false, premiumOnly: true, description: "Vibrant colors for standout reviews.", image: "/templates/Vibrant.png" },
  { id: "Modern", type: "Modern", alwaysFree: false, premiumOnly: true, description: "Modern style review card.", image: "/templates/Modern.png" },
  { id: "Elegant", type: "Elegant", alwaysFree: false, premiumOnly: true, description: "Elegant and refined design.", image: "/templates/Elegant.png" },
  { id: "Lucid", type: "Lucid", alwaysFree: false, premiumOnly: true, description: "Lucid, clear, and simple.", image: "/templates/Lucid.png" },
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
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

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
    const { uniqueDownloaded, hasReachedFreeLimit } = getUserState(downloads);
    const isFreeAfterLimit = template.id === "Black" || template.id === "White";
    if (hasReachedFreeLimit && !isFreeAfterLimit) {
      toast.info("After 3 free downloads, only Black and White templates remain available for free users. Please upgrade for more.");
      return;
    }
    if (hasReachedFreeLimit && isFreeAfterLimit) {
      if (downloads.some(d => d.templateId === template.id)) {
        toast.warning("You have already downloaded this template. Please upgrade for more.");
        return;
      }
    }
    if (!hasReachedFreeLimit && downloads.some(d => d.templateId === template.id)) {
      toast.warning("You have already downloaded this template.");
      return;
    }
    window.open(`/templates/${template.id}.png`, "_blank");
    const newDownload = {
      templateId: template.id,
      templateName: template.type,
      date: new Date().toISOString(),
      instagram: userInstagram,
      access: hasReachedFreeLimit && isFreeAfterLimit ? "free" : (hasReachedFreeLimit ? "locked" : "free")
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

  const uniqueDownloads = useMemo(() => getUniqueDownloads(downloads), [downloads]);
  const userState = useMemo(() => getUserState(downloads), [downloads]);

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen font-sans">
        {/* Sidebar */}
        <aside className="w-full md:w-56 bg-indigo-900 text-white p-6 flex flex-col justify-between md:min-h-screen">
          <div>
            <h2 className="font-serif text-2xl mb-5">Řevilo</h2>
            <p className="text-sm mb-10">Turn your social comments into stunning review cards.</p>
            <nav className="flex flex-col gap-4">
              <Link to="/template" className="bg-yellow-100 text-indigo-900 py-2 rounded font-bold text-center hover:bg-yellow-200 transition">Templates</Link>
              <Link to="/dashboard" className="py-2 rounded border border-white text-center hover:bg-white hover:text-indigo-900 transition">Dashboard</Link>
            </nav>
          </div>
          <a
            href="https://reviloapp.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 py-3 bg-gradient-to-r from-purple-300 to-pink-200 text-indigo-900 font-bold text-base rounded-lg shadow-md text-center hover:from-pink-200 hover:to-purple-300 hover:text-white transition"
          >
            ← Back to Revilo Home
          </a>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 p-6">
          <h1 className="text-2xl md:text-3xl text-gray-800 mb-6">Templates</h1>
          {/* Why Go Pro Section */}
          <div className="mb-8 p-6 bg-purple-50 border border-purple-200 rounded-lg max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-bold text-purple-800 mb-2">Why Go Pro?</h2>
            <ul className="text-purple-900 text-base mb-2 list-disc list-inside">
              <li>Unlock all premium templates</li>
              <li>Unlimited downloads</li>
              <li>Stand out with exclusive designs</li>
              <li>Priority support</li>
            </ul>
            <span className="text-sm text-purple-700">Upgrade now and take your brand to the next level!</span>
          </div>
          {/* Progress Bar for Free Downloads */}
          <div className="mb-6 max-w-md mx-auto">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-indigo-900">Free Downloads</span>
              <span className="text-sm font-medium text-indigo-900">{uniqueDownloads.length} / 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all"
                style={{ width: `${(uniqueDownloads.length / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((t, i) => {
              const isLocked = isTemplateLocked(t.id, downloads);
              const comment = scrapedComments[i % scrapedComments.length];
              const showFreeBadge = t.id === "Black";
              const showLockedInfo = isLocked && uniqueDownloads.length >= 3 && t.id !== "Black";
              return (
                <TemplateCard
                  key={t.id}
                  template={t}
                  isLocked={isLocked}
                  comment={comment}
                  onDownload={() => handleDownload(t)}
                  showFreeBadge={showFreeBadge}
                  showLockedInfo={showLockedInfo}
                  onUpgradeClick={() => setShowUpgradeModal(true)}
                />
              );
            })}
          </div>
        </main>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowUpgradeModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Unlock Pro Features</h2>
            {/* Feature Comparison Table */}
            <table className="w-full mb-4 text-sm border border-gray-200 rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-2 text-left">Feature</th>
                  <th className="py-2 px-2">Free</th>
                  <th className="py-2 px-2">Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-2">Black Template</td>
                  <td className="text-green-600 font-bold">✔️</td>
                  <td className="text-green-600 font-bold">✔️</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">All Templates</td>
                  <td className="text-red-500 font-bold">❌</td>
                  <td className="text-green-600 font-bold">✔️</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Unlimited Downloads</td>
                  <td className="text-red-500 font-bold">❌</td>
                  <td className="text-green-600 font-bold">✔️</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">Priority Support</td>
                  <td className="text-red-500 font-bold">❌</td>
                  <td className="text-green-600 font-bold">✔️</td>
                </tr>
              </tbody>
            </table>
            {/* Testimonials */}
            <div className="mb-4">
              <h3 className="font-semibold text-indigo-800 mb-2">What our users say:</h3>
              <div className="bg-purple-50 p-3 rounded mb-2 text-purple-900 text-sm italic">“The premium templates made my brand stand out instantly!”</div>
              <div className="bg-purple-50 p-3 rounded mb-2 text-purple-900 text-sm italic">“Super easy to use and the designs are top-notch.”</div>
              <div className="bg-purple-50 p-3 rounded text-purple-900 text-sm italic">“Upgrading was the best decision for my business.”</div>
            </div>
            <Link
              to="/pricing"
              className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded shadow-lg text-center text-lg hover:from-purple-600 hover:to-pink-500 transition transform hover:scale-105 animate-bounce"
              onClick={() => setShowUpgradeModal(false)}
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
} 