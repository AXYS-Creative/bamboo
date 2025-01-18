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

  // Function to set footer height
  const updateFooterHeight = () => {
    const footerHeight = siteFooter.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      "--footer-height",
      `${footerHeight}px`
    );
  };

  // Handle scroll to bottom on focus
  scrollToBottom.addEventListener("focus", () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth", // doesn't conflict with Lenis
    });
  });

  // Initial footer height set
  updateFooterHeight();

  // Update footer height on window resize
  window.addEventListener("resize", updateFooterHeight);
}

// Detect Safari Browser
export const isSafari = () => {
  let ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") === -1;
};
