document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const hero = document.getElementById("hero");
  if (hero) {
    const texts = Array.from(hero.querySelectorAll(".hero__slide-text"));
    const portraits = Array.from(hero.querySelectorAll(".hero__portrait"));
    const prevBtn = hero.querySelector(".hero__arrow--prev");
    const nextBtn = hero.querySelector(".hero__arrow--next");
    let current = 0;
    let timer = null;

    function goTo(index) {
      const total = texts.length;
      current = (index + total) % total;
      texts.forEach((el, i) => el.classList.toggle("is-active", i === current));
      portraits.forEach((el, i) => el.classList.toggle("is-active", i === current));
    }

    function restartAutoplay() {
      if (timer) clearInterval(timer);
      if (texts.length > 1) {
        timer = setInterval(() => goTo(current + 1), 5000);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goTo(current - 1);
        restartAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goTo(current + 1);
        restartAutoplay();
      });
    }

    restartAutoplay();
  }

  // Accessible tabs (gallery locations + photo/video sub-tabs).
  // Markup works with JS disabled (all panels visible); JS hides inactive panels.
  function setupTabs(container) {
    const tablist = container.querySelector(":scope > [role='tablist']");
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll(":scope > [role='tab']"));
    const panels = tabs.map((tab) =>
      document.getElementById(tab.getAttribute("aria-controls"))
    );

    function selectTab(tab) {
      tabs.forEach((t, i) => {
        const selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        if (panels[i]) panels[i].hidden = !selected;
      });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => selectTab(tab));
      tab.addEventListener("keydown", (e) => {
        let newIndex = null;
        if (e.key === "ArrowRight") newIndex = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft") newIndex = (i - 1 + tabs.length) % tabs.length;
        if (newIndex !== null) {
          e.preventDefault();
          tabs[newIndex].focus();
          selectTab(tabs[newIndex]);
        }
      });
    });

    selectTab(tabs[0]);
  }

  document.querySelectorAll("[data-tabs]").forEach(setupTabs);
});
