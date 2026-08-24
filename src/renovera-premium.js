function normalizeWhatsAppButton(attempt = 0) {
  const float = document.querySelector(".whatsapp-float");
  if (!float && attempt < 20) {
    setTimeout(() => normalizeWhatsAppButton(attempt + 1), 50);
    return;
  }
  const existing = float || [...document.querySelectorAll("a[href*='wa.me'], a[href*='whatsapp']")].at(-1);
  const link = existing || document.createElement("a");
  if (!existing) {
    link.className = "whatsapp-float";
    link.href = "https://wa.me/5519996514827";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Falar com a Renovera no WhatsApp");
    link.innerHTML = '<svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.4-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.9 0-3.1-1.2-6.1-3.4-8.3Zm-8.4 18.2h-.1c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.2C1.9 6.4 6.4 2 12 2c2.7 0 5.1 1 7 2.9a9.9 9.9 0 0 1 2.9 7c0 5.5-4.4 9.9-9.8 9.9Z"/></svg>';
    document.body.append(link);
  }
  link.classList.add("rv-whatsapp-premium");
}

function init() {
  normalizeWhatsAppButton();
  const button = document.createElement("button");
  button.className = "rv-scroll-top";
  button.type = "button";
  button.setAttribute("aria-label", "Voltar ao topo");
  button.title = "Voltar ao topo";
  button.innerHTML = "<span aria-hidden=\"true\">↑</span>";
  button.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.append(button);
  const progress = document.createElement("div");
  progress.className = "rv-page-progress";
  document.body.append(progress);
  const sections = [...document.querySelectorAll("main > section, section, .card")];
  sections.forEach((section, index) => { section.classList.add("rv-reveal"); if (index % 4) section.style.transitionDelay = `${(index % 4) * 60}ms`; });
  const observer = new IntersectionObserver((entries, current) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); current.unobserve(entry.target); } }), { threshold: .12 });
  sections.forEach((section) => observer.observe(section));
  addEventListener("scroll", () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${max ? scrollY / max : 0})`; button.classList.toggle("is-visible", scrollY > 560); }, { passive: true });
}
if (document.readyState === "loading") addEventListener("DOMContentLoaded", () => setTimeout(init, 0), { once: true }); else setTimeout(init, 0);
