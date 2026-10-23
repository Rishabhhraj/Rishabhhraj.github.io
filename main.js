const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const links = [...document.querySelectorAll("[data-nav] a")];
const sections = [...new Set(links.map((link) => link.getAttribute("href")))]
  .map((href) => document.querySelector(href))
  .filter(Boolean);

const setActive = (id) => {
  links.forEach((link) => {
    const on = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", on);
    if (on) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
};

const updateActive = () => {
  const marker = window.scrollY + Math.min(160, window.innerHeight * 0.28);
  let current = sections[0];
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section;
  });
  if (current) setActive(current.id);
};

if (sections.length) {
  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
}

links.forEach((link) => {
  link.addEventListener("click", () => {
    const id = (link.getAttribute("href") || "").slice(1);
    if (id) setActive(id);
  });
});
