export const root = document.documentElement; // See portfolio for examples

export const mqMouse = window.matchMedia("(hover: hover) and (pointer: fine)");

// Get current year for copyright
{
  const yearText = document.querySelector(".year-text");
  const currentYear = new Date().getFullYear();

  yearText.innerHTML = currentYear;
  yearText.setAttribute("datetime", currentYear);
}

// Fetch footer height & handle bottom scroll
{
  const siteFooter = document.querySelector(".site-footer"),
    scrollToBottom = document.querySelector(".scroll-bottom");

  scrollToBottom.addEventListener("focus", () => {
    window.scrollTo({
      top: document.body.scrollHeight - footerHeight,
      behavior: "smooth", // works with lenis, wow
    });
  });

  const footerHeight = siteFooter.getBoundingClientRect().height;

  document.documentElement.style.setProperty(
    "--footer-height",
    `${footerHeight}px`
  );
}

// Detect Safari Browser
export const isSafari = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1;
};
