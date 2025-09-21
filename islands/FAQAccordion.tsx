import { useState } from "preact/hooks";

interface FAQ {
  question: string;
  answer: string;
  emoji: string;
}

const faqs: FAQ[] = [
  {
    question: "Can I actually eat this nail polish?",
    answer: "YES! Our nail polish is 100% food-safe and tastes like actual cherries. We use food-grade ingredients including real cherry extract, organic beeswax, and corn-based resin. It's basically candy for your nails. Your toddler will thank you (or maybe not, because now they'll want to eat your manicure).",
    emoji: "👅"
  },
  {
    question: "How long does it last on my nails?",
    answer: "About 3-5 days of normal wear, or approximately 47 minutes if you can't stop licking your fingers. Pro tip: Apply two coats for longer wear, three coats for better flavor intensity. We're not responsible if your pets start following you around more than usual.",
    emoji: "⏰"
  },
  {
    question: "Is this some kind of joke?",
    answer: "No, but also yes? We're dead serious about our edible nail polish, but we're not serious about taking ourselves seriously. Life's too short for toxic beauty products and boring marketing copy. Plus, our CEO's toddler is our head taste tester, so we're legally obligated to make this work.",
    emoji: "🤔"
  },
  {
    question: "Will this stain my teeth if I bite my nails?",
    answer: "Nope! Our formula is designed to dissolve cleanly without staining. However, we can't guarantee you won't get addicted to the taste and develop a concerning nail-biting habit. Side effects may include: compliments, confused looks, and jealous friends asking where you got it.",
    emoji: "🦷"
  },
  {
    question: "Is it safe for kids and pregnant women?",
    answer: "Absolutely! It's literally safer than most candy. We use only food-grade, organic ingredients. No formaldehyde, toluene, or any of those scary chemicals you can't pronounce. If you can eat a cherry, you can wear (and eat) our polish. Pediatricians hate this one weird trick!",
    emoji: "👶"
  },
  {
    question: "Can I use it as a dessert topping?",
    answer: "While we don't officially recommend drizzling nail polish on your ice cream, we also won't judge you. One customer told us they use it as cherry syrup for cocktails. We're not saying you should, but we're also not NOT saying you should. Live your truth.",
    emoji: "🍨"
  },
  {
    question: "Do you ship internationally?",
    answer: "YES! We ship worldwide because everyone deserves edible nails. Shipping is FREE because we're already charging you for nail polish you're going to eat. International orders may take 7-14 days, or longer if customs agents get curious and taste test your package.",
    emoji: "🌍"
  },
  {
    question: "What if my cat licks my nails?",
    answer: "Your cat will be fine! In fact, they might become your new manicure buddy. We've had reports of cats, dogs, and one particularly adventurous hamster enjoying our polish. No animals were harmed in the making of this product, but several were delighted.",
    emoji: "🐱"
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section class="faq-section">
      <div class="faq-header">
        <h2 class="faq-title">
          <span class="faq-title-accent">FREQUENTLY</span>
          <span class="faq-title-main">LICKED</span>
          <span class="faq-title-accent">QUESTIONS</span>
        </h2>
        <p class="faq-subtitle">
          Real questions from confused customers
          <span class="faq-subtitle-emoji">🤷‍♀️</span>
        </p>
      </div>

      <div class="faq-container">
        {faqs.map((faq, index) => (
          <div
            key={index}
            class={`faq-item ${openIndex === index ? 'faq-item--open' : ''}`}
            style={{
              transform: `rotate(${index % 2 === 0 ? '-1' : '1'}deg)`,
            }}
          >
            <button
              class="faq-question"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span class="faq-question-emoji">{faq.emoji}</span>
              <span class="faq-question-text">{faq.question}</span>
              <span class="faq-toggle-icon">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            <div
              id={`faq-answer-${index}`}
              class="faq-answer"
              style={{
                display: openIndex === index ? 'block' : 'none'
              }}
            >
              <p class="faq-answer-text">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div class="faq-footer">
        <p class="faq-footer-text">
          Still confused? Email us at
          <a href="mailto:help@lickable.nail" class="faq-footer-link">
            help@lickable.nail
          </a>
          <span class="faq-footer-disclaimer">
            (yes, that's a real email)
          </span>
        </p>
      </div>
    </section>
  );
}