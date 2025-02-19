import { mqMouse, isSafari } from "../utility.js";
import { cubicBezier } from "../global/animations.js";

const cursor = document.querySelector(".mouse-cursor");
const hideMouse = document.querySelectorAll(".hide-mouse");
const teamAccordions = document.querySelectorAll(".team .accordion-btn");
const cursorImages = document.querySelectorAll(".mouse-cursor__img"); // Ensure images exist

if (mqMouse.matches) {
  let mouseX = 0,
    mouseY = 0,
    cursorX = 0,
    cursorY = 0,
    startX = 0,
    startY = 0,
    progress = 0,
    lastMouseX = 0,
    deltaX = 0,
    velocityX = 0;

  const easeFunction = cubicBezier(0.29, 1.01, 0.16, 1.09);
  const duration = isSafari() ? 0.05 : 0.03;

  const animateCursor = () => {
    if (progress < 1) {
      progress = Math.min(progress + duration, 1);

      const easeFactor = easeFunction(progress);

      cursorX = startX + (mouseX - startX) * easeFactor;
      cursorY = startY + (mouseY - startY) * easeFactor;

      deltaX = mouseX - lastMouseX;
      velocityX = deltaX * 0.5;
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
