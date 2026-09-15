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

    import("lottie-web")
      .then((module) => {
        if (cancelled || !sentinelRef.current) return;

        const player = module.default ?? module;

        // Lottie uses this location when resolving SVG references. Safari can
        // otherwise leave a loaded animation on its first frame.
        if (typeof player.setLocationHref === "function") {
          player.setLocationHref(window.location.href);
        }

        animation = player.loadAnimation({
          container: sentinelRef.current,
          renderer: "svg",
          loop: !reduce,
          autoplay: !reduce,
          path,
          rendererSettings: {
            hideOnTransparent: true,
            progressiveLoad: false,
            preserveAspectRatio: "xMidYMid meet",
          },
        });

        animation.addEventListener("DOMLoaded", () => {
          if (reduce) {
            animation.goToAndStop(0, true);
          } else {
            // Start explicitly after the SVG is ready; this avoids Safari
            // occasionally leaving an autoplaying Lottie on frame zero.
            animation.goToAndPlay(0, true);
          }
        });

        animationRef.current = animation;
      })
      .catch(() => {
        // Keep the footer layout intact if the optional animation chunk cannot
        // be loaded (for example, while offline or with a content blocker).
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
