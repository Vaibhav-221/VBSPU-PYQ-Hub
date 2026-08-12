document.addEventListener("DOMContentLoaded", () => {
  const actionSelector = [
    ".resource-action",
    ".semester-card button",
    ".subject-card button",
    ".pyq-download-btn",
    "#pdf-modal-download",
    "#support-popup-now",
    "#support-popup-later",
    "#razorpay-btn",
    "#razorpay-btn-secondary",
    ".contact-form button[type='submit']"
  ].join(",");

  const clearSiteButtonTap = (button) => {
    button.classList.remove("is-clicked");
    button.blur();
  };

  const playSiteButtonTap = (button, callback) => {
    button.classList.remove("is-clicked");
    void button.offsetWidth;
    button.classList.add("is-clicked");

    if (typeof callback === "function") {
      window.setTimeout(() => {
        button.blur();
        callback();
      }, 180);
    }
  };

  window.playSiteButtonTap = playSiteButtonTap;

  document.addEventListener("click", (event) => {
    const button = event.target.closest(actionSelector);
    if (!button || button.disabled) return;
    playSiteButtonTap(button);
  });

  document.addEventListener("animationend", (event) => {
    if (event.animationName === "siteButtonTapPulse") {
      clearSiteButtonTap(event.target);
    }
  });

  window.addEventListener("pageshow", () => {
    document.querySelectorAll(".is-clicked").forEach(clearSiteButtonTap);
  });

  // PYQs button in hero section
  const pyqsBtn = document.querySelector(".b1");
  if (pyqsBtn) {
    pyqsBtn.addEventListener("click", (event) => {
      event.preventDefault();
      playSiteButtonTap(pyqsBtn, () => {
        window.location.href = "semester.html";
      });
    });
  }
  const btnb2 = document.querySelector(".b2");
  if (btnb2) {
    btnb2.addEventListener("click", (event) => {
      event.preventDefault();
      playSiteButtonTap(btnb2, () => {
        window.location.href = "maintinance.html";
      });
    });
  }

  // Explore button
  const btn1 = document.querySelector(".explore-btn");
  if (btn1) {
    btn1.addEventListener("click", () => {
      window.location.href = "semester.html";
    });
  }

  // Navbar links
  const navHome = document.querySelector(".nav-home a");
  if (navHome) {
    navHome.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "index.html";
    });
  }

  const navPyq = document.querySelector(".nav-btn a");
  if (navPyq) {
    navPyq.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "semester.html";
    });
  }

  const navContact = document.querySelector(".script-btn a");
  if (navContact) {
    navContact.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "contact.html";
    });
  }

  // ── Newsletter subscription (W3 form, no redirect) ──────────────────────
  function showNewsletterToast(type, title, message) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "true");
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-notif ${type}`;
    toast.setAttribute("role", type === "success" ? "status" : "alert");

    const icon = document.createElement("div");
    icon.className = "toast-icon-circle";
    icon.textContent = type === "success" ? "OK" : "!";

    const body = document.createElement("div");
    body.className = "toast-body";

    const toastTitle = document.createElement("p");
    toastTitle.className = "toast-title";
    toastTitle.textContent = title;

    const toastMsg = document.createElement("p");
    toastMsg.className = "toast-msg";
    toastMsg.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.className = "toast-close-btn";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close notification");
    closeBtn.textContent = "x";

    const progress = document.createElement("div");
    progress.className = "toast-progress";

    body.append(toastTitle, toastMsg);
    toast.append(icon, body, closeBtn, progress);
    container.appendChild(toast);

    const removeToast = () => {
      toast.classList.add("toast-hide");
      window.setTimeout(() => toast.remove(), 350);
    };

    closeBtn.addEventListener("click", removeToast);
    window.setTimeout(removeToast, 4000);
  }

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    const submitBtn = newsletterForm.querySelector("button[type='submit']");
    const emailInput = document.getElementById("footer-email");

    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.6";
      }

      try {
        const formData = new FormData(newsletterForm);
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showNewsletterToast(
            "success",
            "Subscribed!",
            "You have successfully subscribed. We'll notify you when new papers are uploaded."
          );
          if (emailInput) emailInput.value = "";
        } else {
          showNewsletterToast(
            "error",
            "Subscription Failed",
            data.message || "Something went wrong. Please try again."
          );
        }
      } catch (err) {
        showNewsletterToast(
          "error",
          "Network Error",
          "Could not connect. Please check your internet and try again."
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = "";
        }
      }
    });
  }

});
