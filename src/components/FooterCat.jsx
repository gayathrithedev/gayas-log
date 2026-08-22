import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

export default function FooterCat({ path = "/lottie/black-cat.json", className = "" }) {
  const sentinelRef = useRef(null);
  const animationRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!sentinelRef.current) return undefined;

    let cancelled = false;
    let animation;

    import("lottie-web").then(({ default: player }) => {
      if (cancelled || !sentinelRef.current) return;

      animation = player.loadAnimation({
        container: sentinelRef.current,
        renderer: "svg",
        loop: !reduce,
        autoplay: !reduce,
        path,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });

      if (reduce) {
        animation.addEventListener("DOMLoaded", () => animation.goToAndStop(0, true));
      }

      animationRef.current = animation;
    });

    return () => {
      cancelled = true;
      animation?.destroy();
      animationRef.current = null;
    };
  }, [path, reduce]);

  return (
    <div
      ref={sentinelRef}
      className={`flex translate-y-0 items-center justify-center opacity-100 ${className}`}
    >
      <span className="sr-only">A black cat animation near the footer.</span>
    </div>
  );
}
