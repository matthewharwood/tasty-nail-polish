import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

export default define.page(function Success() {
  return (
    <div class="px-4 py-8 mx-auto bg-gray-100 min-h-screen">
      <Head>
        <title>Order Successful - Tasty Nail Polish</title>
      </Head>
      <div class="max-w-2xl mx-auto text-center">
        <div class="bg-white rounded-lg shadow-lg p-12">
          <div class="text-6xl mb-4">✅</div>
          <h1 class="text-3xl font-bold text-gray-900 mb-4">Order Successful!</h1>
          <p class="text-gray-600 mb-8">
            Thank you for your purchase of Cherry Kiss nail polish.
            You'll receive an email confirmation shortly.
          </p>
          <a href="/" class="text-blue-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
});