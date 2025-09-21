import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import ProductDisplay from "../islands/ProductDisplay.tsx";

export default define.page(function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-gray-100 min-h-screen">
      <Head>
        <title>Tasty Nail Polish - Cherry Kiss</title>
      </Head>
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Tasty Nail Polish</h1>
        <p class="text-gray-600">The viral sensation you can actually taste!</p>
      </div>
      <ProductDisplay />
    </div>
  );
});
