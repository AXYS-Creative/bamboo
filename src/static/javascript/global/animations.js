// Cubic Bézier easing function (for cross-browser compatible animations)
export const cubicBezier = (p1x, p1y, p2x, p2y) => {
  // Example: const ease = cubicBezier(0.09, 0.9, 0.5, 1);
  return function (t) {
    t = Math.max(0, Math.min(1, t));

    const t2 = t * t;
    const t3 = t2 * t;
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;

    const x = 3 * mt2 * t * p1x + 3 * mt * t2 * p2x + t3;
    const y = 3 * mt2 * t * p1y + 3 * mt * t2 * p2y + t3;

    return y;
  };
};

// GSAP
{
  gsap.registerPlugin(ScrollTrigger);

  let responsiveGsap = gsap.matchMedia();

  responsiveGsap.add(
    {
      maxSm: "(max-width: 480px)",
      maxMd: "(max-width: 768px)",
      maxLg: "(max-width: 1024px)",
      minMd: "(min-width: 769px)",
    },
    (context) => {
      let { maxSm, maxMd, maxLg, minMd } = context.conditions;

      // Footer
      {
        // Footer Scrub
        gsap.fromTo(
          ".site-footer",
          { y: "50%" },
          {
            y: "0%",
            scrollTrigger: {
              trigger: ".main-content",
              start: "bottom bottom",
              end: "+=750",
              scrub: true,
              // markers: true,
            },
          }
        );
      }

      // GLOBAL - Animate any element with the class 'gsap-animate' using the 'animate' companion class
      {
        const targetElements = document.querySelectorAll(".gsap-animate");

        targetElements.forEach((targetElem) => {
          gsap.to(targetElem, {
            scrollTrigger: {
              trigger: targetElem,
              start: "top 98%",
              end: "bottom top",
              onEnter: () => targetElem.classList.add("animate"),
              onLeave: () => targetElem.classList.remove("animate"),
              onEnterBack: () => targetElem.classList.add("animate"),
              onLeaveBack: () => targetElem.classList.remove("animate"),
            },
          });
        });
      }

      // Fill Text - Scrub only
      {
        // Use 'fill-text' for default, then 'quick-fill' or 'slow-fill' to modify animation end
        const fillText = document.querySelectorAll(".fill-text");

        if (fillText) {
          fillText.forEach((el) => {
            let end = "bottom 60%";

            // Modifier classes –— Higher percentage ends the animation faster
            if (el.classList.contains("quick-fill")) {
              end = "bottom 80%";
            } else if (el.classList.contains("slow-fill")) {
              end = "bottom 40%";
            }

            gsap.fromTo(
              el,
              {
                backgroundSize: "0%",
              },
              {
                backgroundSize: "100%",
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  end: end,
                  scrub: 1,
                },
              }
            );
          });
        }
      }

      // Marquee animations
      {
        let marqueeSpeed = maxSm ? 16 : maxMd ? 20 : 24;

        // Standard
        {
          const autoMarquees = gsap.utils.toArray(".marquee-inner");

          const marqueeTweens = autoMarquees.map((elem) =>
            gsap
              .to(elem, {
                xPercent: -50,
                repeat: -1,
                duration: marqueeSpeed,
                ease: "linear",
              })
              .totalProgress(0.5)
          );

          let currentScroll = 0;
          const adjustTimeScale = () => {
            const isScrollingDown = window.scrollY > currentScroll;
            marqueeTweens.forEach((tween, index) =>
              gsap.to(tween, {
                timeScale: (index % 2 === 0) === isScrollingDown ? 1 : -1,
              })
            );
            currentScroll = window.scrollY;
          };

          window.addEventListener("scroll", adjustTimeScale);
        }

        // Scrub, use 'marquee_scrub' boolean prop
        {
          const scrubMarquees = gsap.utils.toArray(".marquee--scrub");
          let sensitivity = 5;

          scrubMarquees.forEach((scrubElem) => {
            const marqueeInners = scrubElem.querySelectorAll(".marquee-inner");

            marqueeInners.forEach((inner, index) => {
              gsap.fromTo(
                inner,
                {
                  x: index % 2 === 0 ? "0%" : `-${sensitivity}%`,
                },
                {
                  x: index % 2 === 0 ? `-${sensitivity}%` : "0%",
                  scrollTrigger: {
                    trigger: scrubElem,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                }
              );
            });
          });
        }
      }
    }
  );

  // Refresh ScrollTrigger instances on page load and resize
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // Greater than 520 so it doesn't refresh on  mobile(dvh)
  if (window.innerWidth > 520) {
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });
  }
}
