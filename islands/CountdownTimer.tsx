import { useEffect, useState } from "preact/hooks";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState("23:59:59");

  useEffect(() => {
    // Set a random end time between 1-24 hours from now
    const endTime = new Date().getTime() + (Math.random() * 24 + 1) * 60 * 60 * 1000;

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        // Reset with new random time when expired
        window.location.reload();
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span class="promo-timer">{timeLeft}</span>;
}