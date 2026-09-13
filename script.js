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

// Enhance native select elements into themed glowing custom dropdowns
document.querySelectorAll("select").forEach((select) => {
  if (select.closest(".custom-select-wrapper")) return;

  // Pre-select based on URL query parameter if present (e.g. ?interest=MCP+Security)
  const urlParams = new URLSearchParams(window.location.search);
  const paramInterest = urlParams.get("interest") || urlParams.get("service");
  if (paramInterest && select.name === "interest") {
    const foundIdx = Array.from(select.options).findIndex(
      (opt) => opt.text.toLowerCase() === paramInterest.toLowerCase() || opt.value.toLowerCase() === paramInterest.toLowerCase()
    );
    if (foundIdx !== -1) {
      select.selectedIndex = foundIdx;
    }
  }

  const wrapper = document.createElement("div");
  wrapper.className = "custom-select-wrapper";
  select.parentNode.insertBefore(wrapper, select);
  wrapper.appendChild(select);
  select.classList.add("custom-select-hidden");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "custom-select-trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");

  const label = document.createElement("span");
  label.className = "custom-select-label";
  label.textContent = select.options[select.selectedIndex]?.text || select.options[0]?.text || "Select an option";

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("class", "custom-select-icon");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("stroke-width", "2.5");
  icon.setAttribute("stroke-linecap", "round");
  icon.setAttribute("stroke-linejoin", "round");
  icon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

  trigger.appendChild(label);
  trigger.appendChild(icon);
  wrapper.appendChild(trigger);

  const dropdown = document.createElement("div");
  dropdown.className = "custom-select-dropdown";
  dropdown.setAttribute("role", "listbox");

  const options = Array.from(select.options);
  options.forEach((opt, idx) => {
    const optBtn = document.createElement("button");
    optBtn.type = "button";
    optBtn.className = "custom-select-option" + (idx === select.selectedIndex ? " is-selected" : "");
    optBtn.setAttribute("role", "option");
    optBtn.setAttribute("aria-selected", String(idx === select.selectedIndex));
    optBtn.textContent = opt.text;

    optBtn.addEventListener("click", () => {
      select.selectedIndex = idx;
      label.textContent = opt.text;
      dropdown.querySelectorAll(".custom-select-option").forEach((o) => {
        o.classList.remove("is-selected");
        o.setAttribute("aria-selected", "false");
      });
      optBtn.classList.add("is-selected");
      optBtn.setAttribute("aria-selected", "true");
      closeDropdown();
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });

    dropdown.appendChild(optBtn);
  });

  wrapper.appendChild(dropdown);

  const openDropdown = () => {
    document.querySelectorAll(".custom-select-wrapper.is-open").forEach((w) => {
      if (w !== wrapper) {
        w.classList.remove("is-open");
        w.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
      }
    });
    wrapper.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
  };

  const closeDropdown = () => {
    wrapper.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
  };

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    if (wrapper.classList.contains("is-open")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wrapper.classList.contains("is-open")) {
      closeDropdown();
    }
  });
});