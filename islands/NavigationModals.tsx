import { useEffect, useState } from "preact/hooks";

interface ModalContent {
  title: string;
  emoji: string;
  content: JSX.Element;
  bgColor: string;
  rotation: string;
}

const modals: Record<string, ModalContent> = {
  about: {
    title: "The Lickable Story",
    emoji: "👅",
    bgColor: "var(--color-cherry-pink)",
    rotation: "-2deg",
    content: (
      <>
        <div class="modal-intro">
          <span class="modal-badge">Est. 2025 in a Kitchen Sink</span>
        </div>
        <p class="modal-text">
          <strong>It started with a dare.</strong> Our founder, Cherry Kisses (not her real name),
          was painting her nails during lunch when her toddler asked the forbidden question:
          <em>"Can I taste it?"</em>
        </p>
        <p class="modal-text">
          Instead of saying no like a responsible adult, Cherry thought:
          <strong>"What if nail polish was actually edible?"</strong> 🤔
        </p>
        <div class="modal-highlight">
          <h4>The Secret Sauce (Literally)</h4>
          <ul class="modal-list">
            <li>🧪 6 months of kitchen experiments</li>
            <li>🍒 147 cherry pies sacrificed for science</li>
            <li>👶 1 very happy taste-testing toddler</li>
            <li>💅 0 trips to poison control</li>
          </ul>
        </div>
        <p class="modal-text">
          Today, LICKABLE is the world's first FDA-approved* edible nail polish.
          We've turned beauty into a snack, and honestly, we're not sorry.
        </p>
        <p class="modal-disclaimer">
          *Not actually FDA approved. Please don't report us.
        </p>
        <div class="modal-fun-fact">
          <strong>Fun Fact:</strong> Our office fridge is 90% nail polish, 10% actual food.
        </div>
      </>
    ),
  },
  ingredients: {
    title: "What's Inside?",
    emoji: "🧬",
    bgColor: "var(--color-accent-mint)",
    rotation: "1deg",
    content: (
      <>
        <div class="modal-intro">
          <span class="modal-badge">100% Edible • 0% Toxic</span>
        </div>
        <div class="ingredients-grid">
          <div class="ingredient-card">
            <span class="ingredient-emoji">🍒</span>
            <h4>Real Cherry Extract</h4>
            <p>From actual cherries that lived happy lives in organic orchards</p>
          </div>
          <div class="ingredient-card">
            <span class="ingredient-emoji">🌽</span>
            <h4>Food-Grade Resin</h4>
            <p>Made from corn syrup's sophisticated cousin</p>
          </div>
          <div class="ingredient-card">
            <span class="ingredient-emoji">🥥</span>
            <h4>Coconut Oil</h4>
            <p>For that glossy finish and tropical dreams</p>
          </div>
          <div class="ingredient-card">
            <span class="ingredient-emoji">🍯</span>
            <h4>Organic Beeswax</h4>
            <p>Ethically sourced from bees with 401ks</p>
          </div>
        </div>
        <div class="modal-warning">
          ⚠️ <strong>WARNING:</strong> Side effects may include:
          <ul class="side-effects">
            <li>• Irresistible fingers</li>
            <li>• Sudden nail-biting encouragement</li>
            <li>• Jealous pets</li>
            <li>• Confused manicurists</li>
          </ul>
        </div>
        <div class="modal-fun-fact">
          <strong>Lab Report:</strong> 9 out of 10 toddlers prefer our polish to actual candy.
          The 10th toddler was asleep.
        </div>
        <p class="modal-disclaimer">
          Certified: Vegan • Gluten-Free • Guilt-Free • Reality-Free
        </p>
      </>
    ),
  },
  reviews: {
    title: "Taste Testimonials",
    emoji: "⭐",
    bgColor: "var(--color-accent-yellow)",
    rotation: "-1deg",
    content: (
      <>
        <div class="modal-intro">
          <span class="modal-badge">4.9/5 Tongues</span>
        </div>
        <div class="reviews-container">
          <div class="review-card">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <p class="review-text">
              "My cat and I now share nail polish. This is either the peak or valley of my life."
            </p>
            <p class="review-author">- Sarah M., Professional Cat Lady</p>
          </div>
          <div class="review-card">
            <div class="review-stars">⭐⭐⭐⭐</div>
            <p class="review-text">
              "Finally, a nail polish that matches my wine-drinking aesthetic. Tastes better than my cooking too."
            </p>
            <p class="review-author">- Jessica P., Wine Mom</p>
          </div>
          <div class="review-card">
            <div class="review-stars">⭐⭐⭐⭐⭐</div>
            <p class="review-text">
              "My toddler stopped eating crayons and switched to licking my nails. I call that progress."
            </p>
            <p class="review-author">- Mike D., Exhausted Parent</p>
          </div>
          <div class="review-card">
            <div class="review-stars">⭐⭐⭐</div>
            <p class="review-text">
              "It's good but I was expecting more of a cherry pie situation. Still ate the whole bottle."
            </p>
            <p class="review-author">- Anonymous, Definitely Not Our CEO</p>
          </div>
        </div>
        <div class="modal-stats">
          <div class="stat">
            <span class="stat-number">50K+</span>
            <span class="stat-label">Bottles Licked</span>
          </div>
          <div class="stat">
            <span class="stat-number">0</span>
            <span class="stat-label">Regrets</span>
          </div>
          <div class="stat">
            <span class="stat-number">∞</span>
            <span class="stat-label">Confused Looks</span>
          </div>
        </div>
        <div class="modal-fun-fact">
          <strong>Real Quote:</strong> "Is this legal?" - Our lawyer, constantly
        </div>
      </>
    ),
  },
};

export default function NavigationModals() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check URL hash on mount and handle navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && modals[hash]) {
        setActiveModal(hash);
      } else {
        setActiveModal(null);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeModal]);

  const openModal = (modalId: string) => {
    setIsAnimating(true);
    window.location.hash = modalId;
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeModal = () => {
    setIsAnimating(true);
    setActiveModal(null);
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    // Update nav links to use modal system
    const navLinks = document.querySelectorAll(".nav-link:not(.nav-link--active)");
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === "#") {
        const text = link.textContent?.toLowerCase();
        if (text && modals[text]) {
          link.setAttribute("href", `#${text}`);
        }
      }
    });
  }, []);

  if (!activeModal || !modals[activeModal]) return null;

  const modal = modals[activeModal];

  return (
    <div
      class={`modal-overlay ${isAnimating ? 'modal-animating' : ''}`}
      onClick={closeModal}
    >
      <div
        class="modal-container"
        style={{
          background: modal.bgColor,
          transform: `rotate(${modal.rotation})`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          class="modal-close"
          onClick={closeModal}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div class="modal-header">
          <span class="modal-emoji">{modal.emoji}</span>
          <h2 class="modal-title">{modal.title}</h2>
        </div>

        <div class="modal-content">
          {modal.content}
        </div>
      </div>
    </div>
  );
}