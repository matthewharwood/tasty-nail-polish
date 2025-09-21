import { useSignal } from "@preact/signals";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

export default define.page(function Home(ctx) {
  const count = useSignal(3);

  console.log("Shared value " + ctx.state.shared);

  return (
    <div class="px-4 py-8 mx-auto fresh-gradient min-h-screen">
      <Head>
        <title>Tasty Nail Polish</title>
      </Head>
      <h1>Tasty Nail Polish</h1>
    </div>
  );
});
