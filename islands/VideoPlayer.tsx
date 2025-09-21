import { useState } from "preact/hooks";

export default function VideoPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  const openVideo = () => setIsOpen(true);
  const closeVideo = () => setIsOpen(false);

  return (
    <>
      {/* Video Play Button */}
      <div class="video-section">
        <button
          class="video-play-button"
          onClick={openVideo}
          aria-label="Play video"
        >
          <div class="play-icon-wrapper">
            <svg class="play-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 3l14 9-14 9V3z" fill="currentColor"/>
            </svg>
          </div>
          <span class="video-button-text">Watch How It's Made</span>
          <span class="video-duration">2:47</span>
        </button>

        <div class="video-decorations">
          <span class="video-badge video-badge--left">🎬 MUST WATCH</span>
          <span class="video-badge video-badge--right">VIRAL VIDEO 🔥</span>
        </div>
      </div>

      {/* Video Modal */}
      {isOpen && (
        <div class="video-modal-overlay" onClick={closeVideo}>
          <div class="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              class="video-modal-close"
              onClick={closeVideo}
              aria-label="Close video"
            >
              ✕
            </button>

            <div class="video-wrapper">
              <img
                class="video-gif"
                src="/dashiki.gif"
                alt="LICKABLE Nail Polish - How It's Made"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}