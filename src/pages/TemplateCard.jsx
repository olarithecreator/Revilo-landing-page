import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Textfit } from '@ataverascrespo/react18-ts-textfit';

const templateStyles = {
  Black: {
    bg: "bg-[#000000]",
    comment: "text-[#ffffff] italic",
    generated: "text-[#ffffff] font-bold",
    name: "text-[#ffffff] font-bold",
    stars: "text-[#f7aa04]",
    handle: "text-[#ffffff]",
  },
  Minimal: {
    bg: "bg-[#f5e6da]",
    comment: "text-[#393634] italic",
    generated: "text-[#9ca3af] font-bold",
    name: "text-[#1a1a1a] font-bold",
    stars: "text-[#f7aa04]",
    handle: "text-[#1a1a1a]",
  },
  Elegant: {
    bg: "bg-[#fdf2c6]",
    comment: "text-[#6b240e] italic",
    generated: "text-[#cb7920] font-bold",
    name: "text-[#cb7920] font-bold",
    stars: "text-[#f7aa04]",
    handle: "text-[#cb7920]",
  },
  Lucid: {
    bg: "bg-[#e4d3c5]",
    comment: "text-[#393634] italic",
    generated: "text-[#000000] font-bold",
    name: "text-[#1a1a1a] font-bold",
    stars: "text-[#f7aa04]",
    handle: "text-[#1a1a1a]",
  },
  White: {
    bg: "bg-[#fff8f0]",
    comment: "text-[#000000] italic",
    generated: "text-[#000000] font-bold",
    name: "text-[#000000] font-bold",
    stars: "text-[#f7aa04]",
    handle: "text-[#000000]",
  },
  Vibrant: {
    bg: "bg-[#f2e7fe]",
    comment: "text-[#802fbf] italic",
    generated: "text-[#802fbf] font-bold",
    name: "text-[#802fbf] font-bold",
    stars: "text-[#f7aa04]",
    handle: "text-[#802fbf]",
  },
  Modern: {
    bg: "bg-[#e3e3e3]",
    comment: "text-[#2a151d] italic",
    generated: "text-[#2a151d] font-bold",
    name: "text-[#2a151d] font-bold",
    stars: "text-[#f7aa04]",
    handle: "text-[#2a151d]",
  },
};

const fallbackProfile = "/default-avatar.png"; // Place a default avatar in your public folder

export default function TemplateCard({
  template,
  comments = [],
  isLocked,
  onDownload
}) {
  const styles = templateStyles[template.type] || templateStyles.White;
  const fallbackProfile = "/default-avatar.png";

  // Debug logs
  console.log('All comments:', comments);
  if (comments && comments.length > 0) {
    console.log('First comment:', comments[0]);
  }

  // Extract color code from styles.comment for inline style
  const commentColor = styles.comment.match(/#(?:[0-9a-fA-F]{3}){1,2}/)?.[0] || "#393634";

  return (
    <div className="flex flex-col items-center">
      {/* Template Name */}
      <div className="text-lg font-bold uppercase tracking-wide mb-4 text-center">
        {template.type}
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        className="w-full max-w-[400px] min-w-[250px]"
      >
        {Array.isArray(comments) && comments.map((comment, idx) => (
          <SwiperSlide key={idx}>
            <div className={`rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between aspect-square w-full h-full mx-auto p-6 ${styles.bg} ${styles.text}`}>
              {/* Top: Profile and Name */}
              <div className="flex items-center mb-8">
                <img
                  src={comment.profileImage || fallbackProfile}
                  alt={comment.username ? `${comment.username}'s profile` : 'Instagram user'}
                  className={`w-20 h-20 rounded-full border-4 ${styles.border} mr-4 object-cover`}
                  loading="lazy"
                  onError={e => { e.target.onerror = null; e.target.src = fallbackProfile; }}
                />
                <div>
                  <div
                    className={`font-bold text-2xl ${styles.name}`}
                    style={{
                      maxWidth: '160px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      display: 'block',
                      fontSize: '18px'
                    }}
                    title={comment.username || 'Instagram User'}
                  >
                    {comment.username || 'Instagram User'}
                  </div>
                  <div className={`text-base ${styles.handle}`}>@{comment.username || 'user'} · Instagram</div>
                </div>
              </div>
              {/* Center: Comment */}
              <Textfit
                mode="multi"
                min={10}
                max={28}
                style={{
                  height: '120px',
                  fontStyle: 'italic',
                  fontFamily: 'sans-serif',
                  fontWeight: 'normal',
                  textAlign: 'center',
                  marginBottom: '2rem',
                  padding: '0 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: commentColor
                }}
              >
                {comment.commentText || "No comment found"}
              </Textfit>
              {/* Bottom: Stars and Generated by revilo */}
              <div className="flex justify-between items-center mt-8 w-full">
                <div className={`flex items-center gap-1 ${styles.stars}`} aria-label="5 star rating">
                  {Array(5).fill(0).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div className={`font-semibold ${styles.generated}`} style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px' }}>Generated by revilo</div>
              </div>
              {template.premiumOnly && (
                <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  🔒 Locked
                </span>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Buttons outside the card */}
      <div className="w-full flex flex-col items-center mt-4">
        {!isLocked ? (
          <button
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold shadow-xl hover:scale-105 hover:from-indigo-700 hover:to-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
            onClick={() => onDownload(template.id, comments[0])}
            aria-label="Download this review card"
            disabled={!comments[0] || !comments[0].commentText}
            style={{ fontSize: '1.1rem', letterSpacing: '0.01em' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" /></svg>
            Download Template
          </button>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="mb-3 w-full text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm font-semibold shadow-lg animate-fade-in">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                Unlock premium templates with Pro or Business
              </span>
            </div>
            <a
              href="/pricing"
              className="w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white shadow-xl hover:scale-105 hover:from-indigo-700 hover:to-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
              style={{ fontSize: '1.1rem', letterSpacing: '0.01em' }}
              aria-label="Upgrade to unlock premium templates"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Upgrade Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
} 