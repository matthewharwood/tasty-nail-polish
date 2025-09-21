import { useState } from "preact/hooks";

export default function ReviewButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: "5",
    review: "",
    email: ""
  });

  const openModal = () => {
    setIsModalOpen(true);
    setFormSubmitted(false);
    setFormData({ name: "", rating: "5", review: "", email: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormSubmitted(false);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Just show thank you message, don't actually submit
    setFormSubmitted(true);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReadReviews = () => {
    // Scroll to reviews modal trigger or open reviews modal
    const reviewsLink = document.querySelector('a[href="#reviews"]') as HTMLAnchorElement;
    if (reviewsLink) {
      reviewsLink.click();
    }
  };

  return (
    <>
      <section class="review-buttons-section">
        <div class="review-buttons-container">
          <button
            class="review-button review-button--read"
            onClick={handleReadReviews}
          >
            <span class="review-button-emoji">📖</span>
            <span class="review-button-text">READ REVIEWS</span>
            <span class="review-button-subtitle">See what others licked</span>
          </button>

          <button
            class="review-button review-button--leave"
            onClick={openModal}
          >
            <span class="review-button-emoji">✍️</span>
            <span class="review-button-text">LEAVE REVIEW</span>
            <span class="review-button-subtitle">Share your taste</span>
          </button>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && (
        <div class="review-modal-overlay" onClick={closeModal}>
          <div
            class="review-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              class="review-modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ✕
            </button>

            {!formSubmitted ? (
              <>
                <div class="review-modal-header">
                  <span class="review-modal-emoji">💭</span>
                  <h2 class="review-modal-title">SPILL THE TEA</h2>
                  <p class="review-modal-subtitle">
                    Tell us about your licking experience
                  </p>
                </div>

                <form class="review-form" onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label class="form-label">
                      <span class="form-label-emoji">👤</span>
                      Your Name
                    </label>
                    <input
                      type="text"
                      class="form-input"
                      value={formData.name}
                      onInput={(e) => handleInputChange('name', (e.target as HTMLInputElement).value)}
                      placeholder="Cherry McCherry"
                      required
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <span class="form-label-emoji">📧</span>
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      class="form-input"
                      value={formData.email}
                      onInput={(e) => handleInputChange('email', (e.target as HTMLInputElement).value)}
                      placeholder="cherry@lickable.nail"
                    />
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <span class="form-label-emoji">⭐</span>
                      How many licks?
                    </label>
                    <div class="rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          class={`rating-star ${parseInt(formData.rating) >= star ? 'rating-star--active' : ''}`}
                          onClick={() => handleInputChange('rating', star.toString())}
                        >
                          {parseInt(formData.rating) >= star ? '👅' : '💋'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">
                      <span class="form-label-emoji">💬</span>
                      Your Review
                    </label>
                    <textarea
                      class="form-textarea"
                      value={formData.review}
                      onInput={(e) => handleInputChange('review', (e.target as HTMLTextAreaElement).value)}
                      placeholder="It tasted like my childhood dreams mixed with cherry pie..."
                      rows={4}
                      required
                    />
                  </div>

                  <button type="submit" class="form-submit-button">
                    <span class="form-submit-emoji">🚀</span>
                    SUBMIT REVIEW
                  </button>
                </form>
              </>
            ) : (
              <div class="review-thank-you">
                <div class="thank-you-emoji">🎉</div>
                <h2 class="thank-you-title">THANK YOU!</h2>
                <p class="thank-you-message">
                  Your review has been licked and approved!
                </p>
                <div class="thank-you-confetti">🍒 🎊 💅 🎉 🍒</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}