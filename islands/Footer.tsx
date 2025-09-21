import { useState } from "preact/hooks";

interface FooterModal {
  id: string;
  title: string;
  emoji: string;
  content: JSX.Element;
}

const footerModals: FooterModal[] = [
  {
    id: "blog",
    title: "The Lickable Blog",
    emoji: "📝",
    content: (
      <>
        <div class="footer-modal-content">
          <h3>Coming Soon: Tales from the Nail Polish Lab</h3>
          <p>
            Our blog is currently marinating in cherry juice. Soon you'll be able to read:
          </p>
          <ul>
            <li>🧪 Behind the scenes of edible cosmetics</li>
            <li>🍒 Cherry farming adventures</li>
            <li>💅 DIY nail art you can eat</li>
            <li>👶 Toddler taste-testing diaries</li>
            <li>🎨 The science of making food pretty</li>
          </ul>
          <p class="footer-modal-cta">
            <strong>Subscribe to get notified when we launch!</strong>
          </p>
          <p class="footer-modal-disclaimer">
            (We promise not to spam you with anything that doesn't taste good)
          </p>
        </div>
      </>
    )
  },
  {
    id: "store-locator",
    title: "Find Us In The Wild",
    emoji: "📍",
    content: (
      <>
        <div class="footer-modal-content">
          <h3>Where to Lick Our Polish</h3>
          <div class="store-locations">
            <div class="store-card">
              <h4>🏪 Whole Foods</h4>
              <p>Beauty aisle, next to the kombucha</p>
              <p class="store-address">Nationwide • USA</p>
            </div>
            <div class="store-card">
              <h4>🛍️ Target</h4>
              <p>Between the candy and cosmetics (naturally)</p>
              <p class="store-address">Select stores • Check availability</p>
            </div>
            <div class="store-card">
              <h4>🏬 Sephora</h4>
              <p>The "Wait, What?" section</p>
              <p class="store-address">Coming Q2 2025</p>
            </div>
            <div class="store-card">
              <h4>🍭 Dylan's Candy Bar</h4>
              <p>Is it candy? Is it polish? Yes.</p>
              <p class="store-address">NYC, LA, Chicago</p>
            </div>
          </div>
          <p class="footer-modal-disclaimer">
            * Not actually available in stores yet. We're working on it!
          </p>
        </div>
      </>
    )
  },
  {
    id: "help-center",
    title: "Help & Support",
    emoji: "🆘",
    content: (
      <>
        <div class="footer-modal-content">
          <h3>How Can We Help You Not Eat All Your Polish?</h3>
          <div class="help-topics">
            <div class="help-topic">
              <h4>📦 Shipping & Delivery</h4>
              <p>We ship worldwide! Orders arrive in 3-5 business days, wrapped in cherry-scented paper.</p>
            </div>
            <div class="help-topic">
              <h4>↩️ Returns & Exchanges</h4>
              <p>30-day return policy, even if you've already licked it (please don't actually lick it first).</p>
            </div>
            <div class="help-topic">
              <h4>💳 Payment & Billing</h4>
              <p>We accept all major cards, PayPal, and IOUs from your toddler.</p>
            </div>
            <div class="help-topic">
              <h4>🎨 Product Information</h4>
              <p>Yes, it's really edible. No, it won't replace your lunch. Maybe don't tell your dentist.</p>
            </div>
          </div>
          <p class="footer-modal-cta">
            Still need help? Email us at <strong>help@lickable.nail</strong>
          </p>
        </div>
      </>
    )
  },
  {
    id: "ingredients",
    title: "What's Really Inside",
    emoji: "🧪",
    content: (
      <>
        <div class="footer-modal-content">
          <h3>The Full Ingredient List</h3>
          <div class="ingredients-detailed">
            <div class="ingredient-item">
              <h4>🍒 Organic Cherry Extract (25%)</h4>
              <p>From cherries that lived their best life in Oregon</p>
            </div>
            <div class="ingredient-item">
              <h4>🌽 Food-Grade Polymer Resin (30%)</h4>
              <p>The same stuff in chewing gum, but prettier</p>
            </div>
            <div class="ingredient-item">
              <h4>🥥 Virgin Coconut Oil (15%)</h4>
              <p>For that glossy finish and tropical vibes</p>
            </div>
            <div class="ingredient-item">
              <h4>🍯 Organic Beeswax (10%)</h4>
              <p>Ethically sourced from union-represented bees</p>
            </div>
            <div class="ingredient-item">
              <h4>🌈 Natural Food Coloring (10%)</h4>
              <p>From beets, berries, and other things that stain</p>
            </div>
            <div class="ingredient-item">
              <h4>✨ Vitamin E & Natural Preservatives (10%)</h4>
              <p>To keep your nails healthy and your polish fresh</p>
            </div>
          </div>
          <p class="footer-modal-disclaimer">
            * Certified organic, vegan, gluten-free, and confusion-inducing
          </p>
        </div>
      </>
    )
  },
  {
    id: "refer-friend",
    title: "Spread the Lick",
    emoji: "💌",
    content: (
      <>
        <div class="footer-modal-content">
          <h3>Refer a Friend & Both Get Treats!</h3>
          <div class="refer-steps">
            <div class="refer-step">
              <span class="step-number">1</span>
              <h4>Share Your Code</h4>
              <p>Your unique code: <strong>LICK2025</strong></p>
              <button class="copy-code-btn">Copy Code 📋</button>
            </div>
            <div class="refer-step">
              <span class="step-number">2</span>
              <h4>They Get 20% Off</h4>
              <p>Your friend saves on their first order of edible beauty</p>
            </div>
            <div class="refer-step">
              <span class="step-number">3</span>
              <h4>You Get $10 Credit</h4>
              <p>For every friend who orders, you get $10 to spend on more polish</p>
            </div>
          </div>
          <div class="refer-share">
            <p>Share via:</p>
            <div class="share-buttons">
              <button class="share-btn">📧 Email</button>
              <button class="share-btn">💬 Text</button>
              <button class="share-btn">📱 WhatsApp</button>
              <button class="share-btn">🐦 Twitter</button>
            </div>
          </div>
          <p class="footer-modal-disclaimer">
            * Not a pyramid scheme, just a nail polish party
          </p>
        </div>
      </>
    )
  },
  {
    id: "contact",
    title: "Get In Touch",
    emoji: "📮",
    content: (
      <>
        <div class="footer-modal-content">
          <h3>We'd Love to Hear From You!</h3>
          <div class="contact-info">
            <div class="contact-method">
              <h4>📧 Email Us</h4>
              <p><strong>General:</strong> hello@lickable.nail</p>
              <p><strong>Support:</strong> help@lickable.nail</p>
              <p><strong>Press:</strong> media@lickable.nail</p>
              <p><strong>Wholesale:</strong> bulk@lickable.nail</p>
            </div>
            <div class="contact-method">
              <h4>📞 Call Us</h4>
              <p><strong>1-800-LICK-NOW</strong></p>
              <p>Mon-Fri: 9am-5pm PST</p>
              <p>(Yes, this is a real number*)</p>
              <p class="small">*No it's not</p>
            </div>
            <div class="contact-method">
              <h4>📬 Mail Us</h4>
              <p>Lickable Beauty Co.</p>
              <p>123 Cherry Lane</p>
              <p>Flavor Town, CA 90210</p>
              <p>USA</p>
            </div>
            <div class="contact-method">
              <h4>🏢 Visit Our HQ</h4>
              <p>Our office/lab/taste-testing facility is located in a converted candy factory in San Francisco.</p>
              <p>Tours available by appointment (bring your kids!)</p>
            </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: "terms",
    title: "Terms of Service",
    emoji: "📜",
    content: (
      <>
        <div class="footer-modal-content legal-content">
          <h3>The Legal Stuff (But Fun)</h3>
          <h4>1. Acceptance of Terms</h4>
          <p>By licking our polish, you agree to these terms. If you don't agree, please don't lick.</p>

          <h4>2. Use of Products</h4>
          <p>Our nail polish is intended for external use on nails. The fact that it's edible is just a bonus feature. Please don't use it as a meal replacement.</p>

          <h4>3. Age Restrictions</h4>
          <p>You must be old enough to understand that nail polish goes on nails, not in smoothies.</p>

          <h4>4. Liability</h4>
          <p>We're not responsible if you become addicted to licking your nails. That's on you.</p>

          <h4>5. Returns</h4>
          <p>We accept returns within 30 days, even if you've taste-tested (but please don't).</p>

          <h4>6. Intellectual Property</h4>
          <p>Our cherry formula is top secret. Attempts to reverse-engineer will result in us sending you store-bought cherry syrup.</p>

          <h4>7. Dispute Resolution</h4>
          <p>All disputes will be settled by a taste test. Best flavor wins.</p>

          <p class="footer-modal-disclaimer">
            Last updated: Yesterday, probably
          </p>
        </div>
      </>
    )
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    emoji: "🔒",
    content: (
      <>
        <div class="footer-modal-content legal-content">
          <h3>Your Privacy Matters (Unlike Your Nail Polish Flavor Preferences)</h3>

          <h4>What We Collect</h4>
          <p>• Your name (so we know who to ship to)</p>
          <p>• Your address (so we know where to ship)</p>
          <p>• Your flavor preferences (for science)</p>
          <p>• How many times you've licked our polish (just kidding, we can't track that... yet)</p>

          <h4>What We Don't Collect</h4>
          <p>• Your deepest secrets</p>
          <p>• Your browser history (we don't want to know)</p>
          <p>• Photos of your nails (unless you tag us)</p>

          <h4>How We Use Your Data</h4>
          <p>We use your information to send you delicious nail polish and occasional emails about new flavors. We promise not to sell your data to Big Cherry.</p>

          <h4>Cookies</h4>
          <p>We use cookies, but not the edible kind (working on it). These help us remember your cart and preferences.</p>

          <h4>Third Parties</h4>
          <p>We only share your info with shipping companies and our taste-testing panel of toddlers.</p>

          <h4>Your Rights</h4>
          <p>You can request to see, update, or delete your data anytime. Just email us at privacy@lickable.nail</p>

          <p class="footer-modal-disclaimer">
            This policy is GDPR, CCPA, and LMAO compliant
          </p>
        </div>
      </>
    )
  },
  {
    id: "refund",
    title: "Refund Policy",
    emoji: "💰",
    content: (
      <>
        <div class="footer-modal-content legal-content">
          <h3>Our No-Questions-Asked (Okay, Maybe One Question) Refund Policy</h3>

          <h4>30-Day Satisfaction Guarantee</h4>
          <p>Not satisfied? Return it within 30 days for a full refund. We'll only ask one question: "Why?" (For research purposes)</p>

          <h4>Eligible for Refund:</h4>
          <p>✅ Didn't taste as expected</p>
          <p>✅ Color doesn't match your tongue</p>
          <p>✅ Your toddler ate the whole bottle</p>
          <p>✅ You ordered the wrong flavor</p>
          <p>✅ Any reason, really</p>

          <h4>Not Eligible for Refund:</h4>
          <p>❌ You ate it all and want more (buy another!)</p>
          <p>❌ Your cat liked it too much</p>
          <p>❌ It worked too well</p>

          <h4>How to Return</h4>
          <p>1. Email refund@lickable.nail</p>
          <p>2. We'll send you a prepaid label</p>
          <p>3. Ship it back (half-eaten bottles accepted)</p>
          <p>4. Get your refund in 3-5 days</p>

          <h4>Exchanges</h4>
          <p>Want a different flavor? We'll exchange it free of charge. Cherry not cherry enough? Try Extra Cherry!</p>

          <p class="footer-modal-disclaimer">
            * Refunds issued in money, not nail polish
          </p>
        </div>
      </>
    )
  },
  {
    id: "subscription",
    title: "Subscription Policy",
    emoji: "🔄",
    content: (
      <>
        <div class="footer-modal-content legal-content">
          <h3>The Lickable Subscription Box</h3>

          <h4>How It Works</h4>
          <p>Get fresh flavors delivered monthly! Each box includes:</p>
          <p>• 3 seasonal polish flavors</p>
          <p>• 1 limited edition surprise flavor</p>
          <p>• Nail art stickers you can also eat (working on it)</p>
          <p>• Recipe card for polish-inspired desserts</p>

          <h4>Subscription Tiers</h4>
          <div class="subscription-tiers">
            <div class="tier-card">
              <h5>🥉 Nibbler - $19/month</h5>
              <p>2 bottles + surprises</p>
            </div>
            <div class="tier-card">
              <h5>🥈 Licker - $35/month</h5>
              <p>4 bottles + exclusive flavors</p>
            </div>
            <div class="tier-card">
              <h5>🥇 Gobbler - $59/month</h5>
              <p>6 bottles + early access + merch</p>
            </div>
          </div>

          <h4>Billing</h4>
          <p>Charged monthly on the day you subscribed. Your card will be gently, lovingly charged.</p>

          <h4>Pausing</h4>
          <p>Going on vacation? Pause anytime. Your nails will miss you.</p>

          <h4>Cancellation</h4>
          <p>Cancel anytime, no hard feelings. We'll still be here when you're ready to lick again.</p>

          <p class="footer-modal-disclaimer">
            * Subscription addiction is real and we're not responsible
          </p>
        </div>
      </>
    )
  }
];

export default function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleLinkClick = (id: string) => {
    if (id === "about") {
      // Trigger the about modal from NavigationModals
      window.location.hash = "about";
    } else if (id === "faqs") {
      // Scroll to FAQ section
      const faqSection = document.querySelector('.faq-section');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Open footer modal
      setActiveModal(id);
    }
  };

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer class="footer-main">
        <div class="footer-container">
          {/* Top Section with Brand */}
          <div class="footer-brand-section">
            <div class="footer-brand">
              <img src="/foot.png" alt="" class="footer-logo" />
              <span class="footer-brand-name">LICKABLE</span>
              <span class="footer-tagline">Beauty You Can Taste™</span>
            </div>
          </div>

          {/* Main Footer Content */}
          <div class="footer-content">
            {/* Column 1: Company */}
            <div class="footer-column">
              <h3 class="footer-column-title">
                <span class="footer-title-emoji">🏢</span>
                Company
              </h3>
              <ul class="footer-links">
                <li><button onClick={() => handleLinkClick("about")} class="footer-link">About Us</button></li>
                <li><button onClick={() => handleLinkClick("blog")} class="footer-link">Blog</button></li>
                <li><button onClick={() => handleLinkClick("store-locator")} class="footer-link">Store Locator</button></li>
                <li><button onClick={() => handleLinkClick("contact")} class="footer-link">Contact</button></li>
              </ul>
            </div>

            {/* Column 2: Support */}
            <div class="footer-column">
              <h3 class="footer-column-title">
                <span class="footer-title-emoji">💗</span>
                Support
              </h3>
              <ul class="footer-links">
                <li><button onClick={() => handleLinkClick("faqs")} class="footer-link">FAQs</button></li>
                <li><button onClick={() => handleLinkClick("help-center")} class="footer-link">Help Center</button></li>
                <li><button onClick={() => handleLinkClick("ingredients")} class="footer-link">Ingredients</button></li>
                <li><button onClick={() => handleLinkClick("refer-friend")} class="footer-link">Refer a Friend</button></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div class="footer-column">
              <h3 class="footer-column-title">
                <span class="footer-title-emoji">⚖️</span>
                Legal
              </h3>
              <ul class="footer-links">
                <li><button onClick={() => handleLinkClick("terms")} class="footer-link">Terms of Service</button></li>
                <li><button onClick={() => handleLinkClick("privacy")} class="footer-link">Privacy Policy</button></li>
                <li><button onClick={() => handleLinkClick("refund")} class="footer-link">Refund Policy</button></li>
                <li><button onClick={() => handleLinkClick("subscription")} class="footer-link">Subscription Policy</button></li>
              </ul>
            </div>

            {/* Column 4: Connect */}
            <div class="footer-column">
              <h3 class="footer-column-title">
                <span class="footer-title-emoji">🌈</span>
                Connect
              </h3>
              <div class="footer-social">
                <button class="social-link" aria-label="Instagram">📷</button>
                <button class="social-link" aria-label="TikTok">🎵</button>
                <button class="social-link" aria-label="Pinterest">📌</button>
                <button class="social-link" aria-label="YouTube">📺</button>
                <button class="social-link" aria-label="Facebook">👤</button>
              </div>
              <div class="footer-selectors">
                <select
                  class="footer-select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry((e.target as HTMLSelectElement).value)}
                >
                  <option value="USA">🇺🇸 United States</option>
                  <option value="CAN">🇨🇦 Canada</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="AUS">🇦🇺 Australia</option>
                  <option value="JP">🇯🇵 Japan</option>
                </select>
                <select
                  class="footer-select"
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency((e.target as HTMLSelectElement).value)}
                >
                  <option value="USD">$ USD</option>
                  <option value="EUR">€ EUR</option>
                  <option value="GBP">£ GBP</option>
                  <option value="CAD">$ CAD</option>
                  <option value="AUD">$ AUD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div class="footer-bottom">
            <p class="footer-copyright">
              © 2025 Lickable Beauty Co. All rights reserved.
              <span class="footer-disclaimer">Not responsible for addiction to nail licking.</span>
            </p>
            <p class="footer-tech">
              Built with 💅 and Deno Fresh
            </p>
          </div>
        </div>
      </footer>

      {/* Footer Modals */}
      {activeModal && (
        <div class="footer-modal-overlay" onClick={closeModal}>
          <div class="footer-modal" onClick={(e) => e.stopPropagation()}>
            <button class="footer-modal-close" onClick={closeModal}>✕</button>
            <div class="footer-modal-header">
              <span class="footer-modal-emoji">
                {footerModals.find(m => m.id === activeModal)?.emoji}
              </span>
              <h2 class="footer-modal-title">
                {footerModals.find(m => m.id === activeModal)?.title}
              </h2>
            </div>
            <div class="footer-modal-body">
              {footerModals.find(m => m.id === activeModal)?.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}