function init() {
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
