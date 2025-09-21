import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import ProductDisplay from "../islands/ProductDisplay.tsx";
import FloatingDecorations from "../islands/FloatingDecorations.tsx";

export default define.page(function Home() {
  return (
    <>
      <Head>
        <title>Tasty Nail Polish - Cherry Kiss</title>
        <link rel="stylesheet" href="/assets/vars.css" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <div class="page-wrapper">
        {/* Floating Decorations with Parallax */}
        <FloatingDecorations />

        {/* Background Pattern */}
        <div class="background-pattern"></div>

        {/* Header Section */}
        <header class="header">
          {/* Brand Badge */}
          <div class="viral-badge">
            🍒 Viral Sensation 2025
          </div>

          {/* Main Title */}
          <h1 class="main-title">
            <span className="">👄</span>
            <span className="title-shadow">
              <span className="title-shadow-text">Tasty</span>
              <span className="title-shadow-duplicate">Tasty</span>
            </span>{" "}
            <span className="title-accent">Nail</span>{" "}
            <span className="title-shadow">
              <span className="title-shadow-text">Polish</span>
              <span className="title-shadow-duplicate">Polish</span>
            </span>
          </h1>

          {/* Tagline */}
          <p class="tagline">
            The viral sensation you can
            <span class="tagline-highlight">actually taste!</span>
          </p>

          {/* Feature Pills */}
          <div class="feature-pills">
            <span class="feature-pill feature-pill--pink">💅 Food-Safe</span>
            <span class="feature-pill feature-pill--mint">🍒 Real Cherry</span>
            <span class="feature-pill feature-pill--pink">✨ Non-Toxic</span>
            <span class="feature-pill feature-pill--mint">🌱 Vegan</span>
          </div>
        </header>

        {/* Product Display Section */}
        <main class="main-content">
          <ProductDisplay />
        </main>

        {/* Footer */}
        <footer class="footer">
          <p class="footer-text">
            Built for Speed • Ready for Scale • Powered by Deno
          </p>
        </footer>
      </div>
    </>
  );
});
