document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");
    let current = "home";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 140) current = section.id;
    });
    links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  const genericModal = document.getElementById("genericModal");
  genericModal.addEventListener("show.bs.modal", event => {
    const project = event.relatedTarget?.dataset.project || "Project";
    genericModal.querySelector(".modal-title").textContent = project;
    genericModal.querySelector("#genericProjectText").textContent =
      `${project} — portfolio project details and demo links can be added here.`;
  });

  document.querySelectorAll(".placeholder-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      alert(`${link.dataset.placeholder} link is a placeholder. Replace "#" in index.html with your real profile URL.`);
    });
  });
});
