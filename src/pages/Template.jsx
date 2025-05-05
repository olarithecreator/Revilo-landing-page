import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getUniqueDownloads, getUserState, isTemplateLocked } from "./utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TemplateCard from "./TemplateCard";

const templates = [
  {
    id: "Black",
    type: "Black",
    premiumOnly: false,
    images: [
      {
        url: "/generated/Black_1.png",
        profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
        username: "john_doe",
        commentText: "Super fast delivery, love it!"
      },
      {
        url: "/generated/Black_2.png",
        profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
        username: "jane_smith",
        commentText: "Great customer care and communication."
      }
    ]
  },
  {
    id: "White",
    type: "White",
    premiumOnly: false,
    images: [
      {
        url: "/generated/White_1.png",
        profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
        username: "mike_lee",
        commentText: "Very professional and timely!"
      },
      {
        url: "/generated/White_2.png",
        profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
        username: "susan_chen",
        commentText: "Loved my outfit, exactly as described."
      }
    ]
  },
  {
    id: "Minimal",
    type: "Minimal",
    premiumOnly: false,
    images: [
      {
        url: "/generated/Minimal_1.png",
        profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
        username: "david_ross",
        commentText: "Excellent packaging and presentation!"
      },
      {
        url: "/generated/Minimal_2.png",
        profileImage: "https://randomuser.me/api/portraits/women/36.jpg",
        username: "emily_jones",
        commentText: "My friends keep asking where I ordered from."
      },
      {
        url: "/generated/Minimal_3.png",
        profileImage: "https://randomuser.me/api/portraits/men/77.jpg",
        username: "alex_kim",
        commentText: "This is now my go-to page for all gifts!"
      }
    ]
  },
  {
    id: "Vibrant",
    type: "Vibrant",
    premiumOnly: true,
    images: [
      {
        url: "/generated/Vibrant_1.png",
        profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
        username: "john_doe",
        commentText: "Super fast delivery, love it!"
      },
      {
        url: "/generated/Vibrant_2.png",
        profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
        username: "jane_smith",
        commentText: "Great customer care and communication."
      }
    ]
  },
  {
    id: "Modern",
    type: "Modern",
    premiumOnly: true,
    images: [
      {
        url: "/generated/Modern_1.png",
        profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
        username: "mike_lee",
        commentText: "Very professional and timely!"
      },
      {
        url: "/generated/Modern_2.png",
        profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
        username: "susan_chen",
        commentText: "Loved my outfit, exactly as described."
      }
    ]
  },
  {
    id: "Elegant",
    type: "Elegant",
    premiumOnly: true,
    images: [
      {
        url: "/generated/Elegant_1.png",
        profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
        username: "david_ross",
        commentText: "Excellent packaging and presentation!"
      },
      {
        url: "/generated/Elegant_2.png",
        profileImage: "https://randomuser.me/api/portraits/women/36.jpg",
        username: "emily_jones",
        commentText: "My friends keep asking where I ordered from."
      }
    ]
  },
  {
    id: "Lucid",
    type: "Lucid",
    premiumOnly: true,
    images: [
      {
        url: "/generated/Lucid_1.png",
        profileImage: "https://randomuser.me/api/portraits/men/77.jpg",
        username: "alex_kim",
        commentText: "This is now my go-to page for all gifts!"
      },
      {
        url: "/generated/Lucid_2.png",
        profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
        username: "john_doe",
        commentText: "Super fast delivery, love it!"
      }
    ]
  }
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

const testimonials = [
  "The premium templates made my brand stand out instantly!",
  "Super easy to use and the designs are top-notch.",
  "Upgrading was the best decision for my business."
];

const sampleComments = [
  {
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "john_doe",
    commentText: "Super fast delivery, love it!"
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    username: "jane_smith",
    commentText: "Great customer care and communication."
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
    username: "mike_lee",
    commentText: "Very professional and timely!"
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
    username: "susan_chen",
    commentText: "Loved my outfit, exactly as described."
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/12.jpg",
    username: "david_ross",
    commentText: "Excellent packaging and presentation!"
  },
  {
    profileImage: "https://randomuser.me/api/portraits/women/36.jpg",
    username: "emily_jones",
    commentText: "My friends keep asking where I ordered from."
  },
  {
    profileImage: "https://randomuser.me/api/portraits/men/77.jpg",
    username: "alex_kim",
    commentText: "This is now my go-to page for all gifts!"
  }
];

export default function Template() {
  const [userInstagram, setUserInstagram] = useState("");
  const [downloads, setDownloads] = useState([]);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareTemplate, setShareTemplate] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = (templateId, comment) => {
    // You can use templateId and comment as needed for download logic
    // For now, just show a toast for demo
    toast.success(`Download for template ${templateId} with comment by @${comment.username}`);
    // ...existing download logic if needed
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
          {/* Testimonial Carousel */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center shadow transition-all">
              <span className="text-purple-900 text-base italic block min-h-[32px]">{testimonials[carouselIndex]}</span>
              <div className="flex justify-center mt-2 gap-1">
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    className={`inline-block w-2 h-2 rounded-full ${carouselIndex === idx ? 'bg-purple-600' : 'bg-purple-200'}`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {templates.map((t, i) => {
              const isLocked = isTemplateLocked(t.id, downloads);
              const showFreeBadge = ["Black", "White"].includes(t.id);
              const showLockedInfo = isLocked && uniqueDownloads.length >= 3 && !["Black", "White"].includes(t.id);
              return (
                <TemplateCard
                  key={t.id}
                  template={t}
                  isLocked={isLocked}
                  onDownload={handleDownload}
                  showFreeBadge={showFreeBadge}
                  showLockedInfo={showLockedInfo}
                  slides={t.images}
                />
              );
            })}
          </div>
        </main>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
} 