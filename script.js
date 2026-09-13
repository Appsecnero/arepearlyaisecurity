const serviceGrid = document.getElementById("service-grid");
const menuButton = document.querySelector(".menu-button");
const siteNav = document.getElementById("site-nav");
const lightbox = document.querySelector("[data-lightbox-modal]");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("figcaption");
const lightboxCloseButton = lightbox?.querySelector("button");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const openLightbox = (image) => {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || "";
  lightboxCaption.textContent = image.dataset.caption || image.alt || "";
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  lightboxCloseButton?.focus();
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  lightbox.hidden = true;
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.classList.remove("lightbox-open");
};

document.querySelectorAll("[data-lightbox]").forEach((image) => {
  image.addEventListener("click", () => openLightbox(image));
  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.closest("[data-lightbox-close]")) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});

if (serviceGrid && window.ArapearlySiteData?.services) {
  serviceGrid.innerHTML = window.ArapearlySiteData.services
    .map(
      (service) => `
        <article class="card service-card reveal in-view">
          <p class="card-kicker">Service</p>
          <h3>${service.title}</h3>
          <p>${service.text}</p>
          <a class="button secondary" href="${service.href}">Read up</a>
        </article>
      `
    )
    .join("");

  serviceGrid.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}