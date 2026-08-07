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

});
