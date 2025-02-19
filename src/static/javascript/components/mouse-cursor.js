import { mqMouse, isSafari } from "../utility.js";
import { cubicBezier } from "../global/animations.js";

const cursor = document.querySelector(".mouse-cursor");
const hideMouse = document.querySelectorAll(".hide-mouse");
const teamAccordions = document.querySelectorAll(".team .accordion-btn");
const cursorImages = document.querySelectorAll(".mouse-cursor__img");

if (mqMouse.matches) {
  let mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2,
    cursorX = mouseX,
    cursorY = mouseY,
    lastMouseX = mouseX,
    deltaX = 0,
    velocityX = 0,
    progress = 0,
    startX = cursorX,
    startY = cursorY;

  const easeFunction = cubicBezier(0.29, 1.01, 0.16, 1.09);
  const duration = isSafari() ? 0.05 : 0.03;

  // Limit range of mouse-cursor
  const lerp = (start, end, t) => start + (end - start) * t;

  const animateCursor = () => {
    if (progress < 1) {
      progress = Math.min(progress + duration, 1);
      const easeFactor = easeFunction(progress);

      let mappedX = lerp(
        window.innerWidth * 0.4, // Adjust range limits here
        window.innerWidth * 0.65, // Adjust range limits here
        mouseX / window.innerWidth
      );

      let mappedY = lerp(cursorY, mouseY, 0.8); // adjust for easing

      cursorX = lerp(startX, mappedX, easeFactor);
      cursorY = lerp(startY, mappedY, easeFactor);

      deltaX = mouseX - lastMouseX;
      velocityX = deltaX * 0.5; // Adjust sensitivity
      const rotation = Math.max(-5, Math.min(5, -velocityX));

      cursor.style.translate = `calc(${cursorX}px - 50%) calc(${cursorY}px - 50%)`;
      cursor.style.rotate = `${rotation}deg`;

      lastMouseX = mouseX;
    }

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  document.addEventListener("mousemove", (e) => {
    cursor.style.opacity = 1;

    startX = cursorX;
    startY = cursorY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    progress = 0;
  });

  // Handle cursor image swapping for accordion buttons
  teamAccordions.forEach((el, index) => {
    el.addEventListener("mousemove", () => {
      if (cursorImages[index]) {
        cursorImages[index].classList.remove("hidden");
      }

      // Check if accordion is expanded
      if (el.getAttribute("aria-expanded") === "true") {
        cursorImages[index].classList.add("expanded");
      } else {
        cursorImages[index].classList.remove("expanded");
      }
    });

    el.addEventListener("mouseleave", () => {
      cursorImages.forEach((img) => img.classList.add("hidden"));
    });

    // Listen for accordion toggle
    el.addEventListener("click", () => {
      const isExpanded = el.getAttribute("aria-expanded") === "true";

      // Reset all images first
      cursorImages.forEach((img) => img.classList.remove("expanded"));

      if (isExpanded && cursorImages[index]) {
        cursorImages[index].classList.add("expanded");
      }
    });
  });

  // Hide mouse on specific elements
  hideMouse.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hidden");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hidden");
    });
  });
}
