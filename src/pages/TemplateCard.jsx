import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TemplateCard({
  template,
  images = [],
  comments = [],
  isLocked,
  onDownload
}) {
  const [commentIndex, setCommentIndex] = useState(0);

  return (
    <div className={`rounded-lg shadow relative overflow-hidden ${isLocked ? "opacity-60" : "bg-white"} transition-all`}>
      <div className="relative">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          onSlideChange={(swiper) => setCommentIndex(swiper.realIndex)}
        >
          {images.map((url, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={url}
                alt={`Slide ${idx + 1}`}
                className="w-full h-56 object-cover rounded-t-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {template.premiumOnly && (
          <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            🔒 Locked
          </span>
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{template.type}</h3>
        <div className="mb-4">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            onSlideChange={(swiper) => setCommentIndex(swiper.realIndex)}
            className="w-full"
          >
            {comments.map((comment, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={comment.profileImage}
                    alt={comment.username}
                    className="w-12 h-12 rounded-full mb-2 object-cover border"
                  />
                  <div className="font-semibold text-sm text-gray-700 mb-1">@{comment.username}</div>
                  <div className="text-gray-600 text-sm mb-2">{comment.commentText}</div>
                  {!isLocked && (
                    <button
                      className="w-full mt-2 bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800 transition"
                      onClick={() => onDownload(template.id, comment)}
                    >
                      Download Template
                    </button>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {isLocked && (
          <>
            <p className="text-sm text-red-600 font-medium">Upgrade to unlock</p>
            <a
              href="/pricing"
              className="block mt-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded w-full shadow-lg hover:from-purple-600 hover:to-pink-500 transition transform hover:scale-105 animate-bounce"
            >
              Upgrade
            </a>
          </>
        )}
      </div>
    </div>
  );
} 