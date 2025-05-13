import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getUniqueDownloads, getUserState, isTemplateLocked } from "./utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TemplateCard from "./TemplateCard";

const templates = [
  { id: "Minimal", type: "Minimal", previewImage: "/generated/Minimal_1.png", premiumOnly: false },
  { id: "Elegant", type: "Elegant", previewImage: "/generated/Elegant_1.png", premiumOnly: true },
  { id: "Black", type: "Black", previewImage: "/generated/Black_1.png", premiumOnly: false },
  { id: "White", type: "White", previewImage: "/generated/White_1.png", premiumOnly: false },
  { id: "Vibrant", type: "Vibrant", previewImage: "/generated/Vibrant_1.png", premiumOnly: true },
  { id: "Modern", type: "Modern", previewImage: "/generated/Modern_1.png", premiumOnly: true },
  { id: "Lucid", type: "Lucid", previewImage: "/generated/Lucid_1.png", premiumOnly: true }
];

export default function Template() {
  const [userInstagram, setUserInstagram] = useState("");
  const [downloads, setDownloads] = useState([]);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareTemplate, setShareTemplate] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [instagramHandle, setInstagramHandle] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const fetchComments = async (handle) => {
    const url = `https://sheetdb.io/api/v1/o92oikd6sosbr/search?Instagram%20handle=${encodeURIComponent(handle)}`;
        const response = await fetch(url);
        const data = await response.json();
    return data.map(row => ({
          username: row['username'],
          profileImage: row['commenter profile picture'],
          commentText: row['Comment']
        }));
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const fetchedComments = await fetchComments(instagramHandle);
      console.log('Fetched comments:', fetchedComments);
      setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
      if (!Array.isArray(fetchedComments) || fetchedComments.length === 0) {
        setError("No comments found for this Instagram handle yet.");
      }
    } catch (err) {
      setError("Failed to fetch comments. Please try again.");
      }
    setLoading(false);
  };

  const handleDownload = async (templateId, comment) => {
    // Respect free user limits (example: 3 free downloads)
    const userDownloads = downloads.filter(d => d.templateId === templateId);
    if (userDownloads.length >= 3) {
      alert('You have reached your free download limit for this template.');
      return;
    }
    try {
      const apiKey = import.meta.env.VITE_BANNERBEAR_API_KEY;
      if (!apiKey) throw new Error("Bannerbear API key not set");
      const response = await fetch(`https://api.bannerbear.com/v2/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          template: templateId, // Pass the template UID
          modifications: [
            { name: "comment", text: comment.commentText },
            { name: "username", text: comment.username },
            { name: "profile_image", image_url: comment.profileImage }
          ]
        })
      });
      const data = await response.json();
      if (data.image_url) {
        // Download the image
        const link = document.createElement("a");
        link.href = data.image_url;
        link.download = `template_${templateId}_${comment.username}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Store in localStorage
        const downloadRecord = {
          templateId,
          username: comment.username,
          comment: comment.commentText,
          date: new Date().toISOString()
        };
        const prev = JSON.parse(localStorage.getItem("downloads")) || [];
        localStorage.setItem("downloads", JSON.stringify([...prev, downloadRecord]));
        setDownloads([...downloads, downloadRecord]);
      } else {
        throw new Error("Image generation failed");
      }
    } catch (err) {
      alert("Image generation failed: " + (err.message || err));
    }
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

  const sortedTemplates = [
    ...templates.filter(t => t.id === 'Black' || t.id === 'White'),
    ...templates.filter(t => t.id !== 'Black' && t.id !== 'White')
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 w-full bg-indigo-900 text-white flex items-center justify-between px-4 py-3 z-50 shadow-lg">
        <span className="font-serif text-xl font-bold">Řevilo</span>
        <button
          className="focus:outline-none"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {/* Slide-in Mobile Nav */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex flex-col w-64 bg-white text-indigo-900 shadow-lg h-full p-6 animate-slide-in-right relative">
            <button
              className="absolute top-3 right-3 text-indigo-900 text-2xl focus:outline-none"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close navigation menu"
            >
              ×
            </button>
            <h2 className="font-serif text-2xl mb-5">Řevilo</h2>
            <p className="text-sm mb-10">Turn your social comments into stunning review cards.</p>
            <nav className="flex flex-col gap-4 mb-8">
              <Link to="/template" className="bg-yellow-100 text-indigo-900 py-2 rounded font-bold text-center hover:bg-yellow-200 transition" onClick={() => setMobileNavOpen(false)}>Templates</Link>
              <Link to="/dashboard" className="py-2 rounded border border-indigo-900 text-center hover:bg-indigo-900 hover:text-white transition" onClick={() => setMobileNavOpen(false)}>Dashboard</Link>
            </nav>
            <a
              href="https://reviloapp.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto py-3 bg-gradient-to-r from-purple-300 to-pink-200 text-indigo-900 font-bold text-base rounded-lg shadow-md text-center hover:from-pink-200 hover:to-purple-300 hover:text-white transition"
            >
              ← Back to Revilo Home
            </a>
          </div>
          <div className="flex-1 bg-black bg-opacity-40" onClick={() => setMobileNavOpen(false)}></div>
        </div>
      )}
      <div className="flex flex-col md:flex-row min-h-screen font-sans pt-14 md:pt-0">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex w-full md:w-56 bg-indigo-900 text-white p-6 flex-col justify-between md:min-h-screen">
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
          {/* Instagram handle input form */}
          <form onSubmit={handleFetch} className="mb-8 flex gap-2 justify-center">
            <input
              value={instagramHandle}
              onChange={e => setInstagramHandle(e.target.value)}
              placeholder="Enter your Instagram handle"
              className="border px-3 py-2 rounded shadow"
            />
            <button type="submit" className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800 transition">Fetch Comments</button>
          </form>
          {loading && (
            <div className="text-center my-8">
              <span className="animate-spin inline-block w-6 h-6 border-4 border-indigo-700 border-t-transparent rounded-full"></span>
              <div>Loading comments...</div>
            </div>
          )}
          {error && !loading && (
            <div className="text-center my-8 text-red-600 font-medium">{error}</div>
          )}
          {/* User Progress Indicator */}
          <div className="mb-6 text-center">
            <span className="inline-block bg-indigo-100 text-indigo-800 font-semibold px-4 py-2 rounded-full">
              {userState.hasReachedFreeLimit
                ? 'You have used all 3 free downloads. Only free templates are available.'
                : `You have ${3 - userState.uniqueDownloaded.length}/3 free downloads left`}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                comments={comments}
                isLocked={isTemplateLocked(template, userState)}
                onDownload={handleDownload}
              />
            ))}
          </div>
        </main>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
} 