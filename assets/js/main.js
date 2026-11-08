

const CONFIG = {
  whatsapp: "573160484394",
  company: "Extintores Bogotá"
};

const WHATSAPP_BASE = `https://wa.me/${CONFIG.whatsapp}`;

// Actualizar año automáticamente
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Botones de WhatsApp
document.querySelectorAll("[data-wa]").forEach((link) => {
  const message =
    "Hola, quiero información sobre inspección, mantenimiento o recarga de extintores en Bogotá.";

  link.href = `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Formulario de cotización
const form = document.getElementById("quoteForm");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const value = (id) => {
      const field = document.getElementById(id);
      return field ? field.value.trim() : "";
    };

    const message = [
      "Hola, solicito una cotización de extintores.",
      `Nombre: ${value("nombre")}`,
      `Teléfono: ${value("telefono")}`,
      `Localidad/dirección: ${value("zona")}`,
      `Tipo/cantidad: ${value("equipo")}`,
      `Servicio: ${value("servicio")}`,
      `Observaciones: ${value("detalle") || "Sin observaciones"}`
    ].join("\n");

    const whatsappUrl =
      `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;

    window.location.assign(whatsappUrl);
  });
}

// Animaciones de entrada
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });

} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("show");
  });
}

// Gestión de cookies
(() => {
  const KEY = "extintoresBogotaCookieConsent";

  const banner = document.getElementById("cookieBanner");
  const settings = document.getElementById("cookieSettings");
  const reopen = document.getElementById("cookieReopen");

  if (!banner || !settings || !reopen) return;

  const analytics = document.getElementById("cookieAnalytics");
  const marketing = document.getElementById("cookieMarketing");

  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch (error) {
      return null;
    }
  };

  const apply = (consent) => {
    window.extintoresCookieConsent = {
      necessary: true,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing
    };

    window.dispatchEvent(
      new CustomEvent("extintores:consent", {
        detail: window.extintoresCookieConsent
      })
    );
  };

  const save = (consent) => {
    const value = {
      necessary: true,
      analytics: !!consent.analytics,
      marketing: !!consent.marketing,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(KEY, JSON.stringify(value));
    } catch (error) {
      // Continúa funcionando aunque falle el almacenamiento.
    }

    apply(value);

    banner.hidden = true;
    settings.hidden = true;
    reopen.hidden = false;
  };

  const openSettings = () => {
    const consent = read() || {};

    analytics.checked = !!consent.analytics;
    marketing.checked = !!consent.marketing;

    settings.hidden = false;
  };

  document.getElementById("cookieAccept").onclick = () =>
    save({ analytics: true, marketing: true });

  document.getElementById("cookieReject").onclick = () =>
    save({ analytics: false, marketing: false });

  document.getElementById("cookieCustomize").onclick =
    openSettings;

  document.getElementById("cookieSave").onclick = () =>
    save({
      analytics: analytics.checked,
      marketing: marketing.checked
    });

  document.getElementById("cookieCancel").onclick = () =>
    settings.hidden = true;

  reopen.onclick = openSettings;

  document.querySelectorAll("[data-cookie-open]").forEach((link) => {
    link.onclick = (event) => {
      event.preventDefault();
      openSettings();
    };
  });

  settings.addEventListener("click", (event) => {
    if (event.target === settings) {
      settings.hidden = true;
    }
  });

  const saved = read();

  if (saved) {
    apply(saved);
    reopen.hidden = false;
  } else {
    banner.hidden = false;
  }
})();
