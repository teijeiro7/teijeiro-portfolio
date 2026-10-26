/* Site behaviour: theme, header state, mobile sheet, reveal, clock, copy, filters, mailto. */

const root = document.documentElement;

/* ---------------------------------- theme --------------------------------- */

const themeToggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

const applyThemeColor = () => {
  if (themeColor) {
    themeColor.content = root.dataset.theme === "dark" ? "#0d0c0b" : "#f5f3ee";
  }
};

themeToggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  applyThemeColor();
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage can be unavailable; the theme still applies for this page */
  }
});

/* --------------------------- scroll progress + header --------------------- */

const bar = document.querySelector<HTMLElement>(".progress span");
const nav = document.querySelector<HTMLElement>(".nav");

if (bar) {
  const update = () => {
    const max = root.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.scale = `${progress} 1`;
    if (nav) nav.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
}

/* -------------------------------- mobile sheet ---------------------------- */

const sheet = document.querySelector<HTMLElement>("[data-sheet]");
const menuButton = document.querySelector<HTMLButtonElement>("[data-menu]");

if (sheet && menuButton) {
  const setOpen = (open: boolean) => {
    sheet.dataset.open = open ? "true" : "false";
    menuButton.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";

    if (open) {
      sheet.querySelector<HTMLElement>("a")?.focus();
    } else if (sheet.contains(document.activeElement)) {
      menuButton.focus();
    }
  };

  menuButton.addEventListener("click", () => {
    setOpen(sheet.dataset.open !== "true");
  });

  sheet.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sheet.dataset.open === "true") setOpen(false);
  });

  /* The sheet belongs to the mobile breakpoint; close it when the layout grows. */
  const desktop = window.matchMedia("(min-width: 981px)");
  const closeOnDesktop = () => {
    if (desktop.matches) setOpen(false);
  };

  desktop.addEventListener("change", closeOnDesktop);
  closeOnDesktop();
}

/* ---------------------------------- reveal -------------------------------- */

const revealNodes = document.querySelectorAll<HTMLElement>(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px -8% 0px" }
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("in"));
}

/* ----------------------------------- clock -------------------------------- */

const clocks = document.querySelectorAll<HTMLElement>("[data-clock]");

if (clocks.length) {
  const tick = () => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Madrid",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).formatToParts(new Date());

    const hour = parts.find((part) => part.type === "hour")?.value ?? "";
    const minute = parts.find((part) => part.type === "minute")?.value ?? "";
    const zone = parts.find((part) => part.type === "timeZoneName")?.value ?? "CET";

    clocks.forEach((clock) => {
      clock.textContent = `${hour}:${minute} ${zone}`;
    });
  };

  tick();
  window.setInterval(tick, 30_000);
}

/* -------------------------------- copy email ------------------------------ */

const copyButton = document.querySelector<HTMLButtonElement>("[data-copy]");

if (copyButton) {
  const label = copyButton.querySelector("span");
  const idleLabel = copyButton.dataset.copyLabel ?? "Copy";
  const doneLabel = copyButton.dataset.copiedLabel ?? "Copied";

  copyButton.addEventListener("click", () => {
    const value = copyButton.dataset.copy ?? "";
    const done = () => {
      copyButton.classList.add("is-done");
      if (label) label.textContent = doneLabel;
      window.setTimeout(() => {
        copyButton.classList.remove("is-done");
        if (label) label.textContent = idleLabel;
      }, 1600);
    };

    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).then(done).catch(done);
    } else {
      done();
    }
  });
}

/* --------------------------------- filters -------------------------------- */

document.querySelectorAll<HTMLElement>("[data-filter]").forEach((barElement) => {
  const buttons = barElement.querySelectorAll<HTMLButtonElement>(".filter");
  const target = document.querySelector<HTMLElement>(
    barElement.dataset.filter ?? "#project-list"
  );

  if (!target) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");

      const kind = button.dataset.kind ?? "all";
      target.querySelectorAll<HTMLElement>("[data-kind]").forEach((item) => {
        const show = kind === "all" || item.dataset.kind === kind;
        item.style.display = show ? "" : "none";
      });
    });
  });
});

/* ------------------------------ contact form ------------------------------ */

const form = document.querySelector<HTMLFormElement>("[data-mail-form]");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const to = form.dataset.mailTo ?? "";
    const defaultSubject = form.dataset.mailSubject ?? "Hello";
    const body = [message, "", `- ${name}`, email].join("\n");

    const href = `mailto:${to}?subject=${encodeURIComponent(
      subject || defaultSubject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  });
}
