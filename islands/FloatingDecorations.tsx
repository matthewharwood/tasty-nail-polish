import { useEffect, useRef } from "preact/hooks";

export default function FloatingDecorations() {
  const decorationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!decorationsRef.current) return;

      const scrollY = window.scrollY;
      const elements = decorationsRef.current.querySelectorAll('.floating-element');

      elements.forEach((element: Element) => {
        const el = element as HTMLElement;
        const speed = parseFloat(el.dataset.parallaxSpeed || '1');
        const yPos = -(scrollY * speed * 0.1);

        // Apply transform with existing animations
        el.style.transform = `${el.style.transform?.replace(/translateY\([^)]*\)/, '') || ''} translateY(${yPos}px)`;
      });
    };

    // Throttle scroll events
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div ref={decorationsRef} class="floating-decorations">
      {/* Cherry emojis */}
      <span class="floating-element cherry-1 parallax-slow" data-parallax-speed="0.5">🍒</span>
      <span class="floating-element cherry-2 parallax-medium" data-parallax-speed="0.8">🍒</span>
      <span class="floating-element cherry-3 parallax-slow" data-parallax-speed="0.5">🍒</span>
      <span class="floating-element cherry-4 parallax-fast" data-parallax-speed="1.2">🍒</span>
      <span class="floating-element cherry-5 parallax-medium" data-parallax-speed="0.8">🍒</span>
      <span class="floating-element cherry-6 parallax-slow" data-parallax-speed="0.5">🍒</span>

      {/* Foot images */}
      <img
        src="/foot.png"
        alt=""
        class="floating-element foot-1 parallax-medium"
        data-parallax-speed="0.8"
        loading="lazy"
      />
      <img
        src="/foot.png"
        alt=""
        class="floating-element foot-2 parallax-slow"
        data-parallax-speed="0.5"
        loading="lazy"
      />
      <img
        src="/foot.png"
        alt=""
        class="floating-element foot-3 parallax-fast"
        data-parallax-speed="1.2"
        loading="lazy"
      />
      <img
        src="/foot.png"
        alt=""
        class="floating-element foot-4 parallax-medium"
        data-parallax-speed="0.8"
        loading="lazy"
      />
    </div>
  );
}