(function () {
  const EMAILJS_PUBLIC_KEY = "GRT0ChZ_TnyQdtNg6";
  const EMAILJS_SERVICE_ID = "service_ldsch2g";
  const EMAILJS_TEMPLATE_ID = "template_2lmfazk";

  function getButtonParts(button) {
    return {
      text: button.querySelector("[data-btn-text]") || button.querySelector("#btn-text"),
      spinner: button.querySelector("[data-btn-spinner]") || button.querySelector("#btn-spinner")
    };
  }

  function setButtonLoading(button, isLoading) {
    const parts = getButtonParts(button);

    button.disabled = isLoading;
    button.setAttribute("aria-busy", String(isLoading));

    if (parts.text) {
      parts.text.style.display = isLoading ? "none" : "inline";
    }

    if (parts.spinner) {
      parts.spinner.style.display = isLoading ? "inline-flex" : "none";
    }
  }

  function getEmailJSErrorMessage(error) {
    const rawMessage = [
      error && error.text,
      error && error.message,
      error && error.status ? `Status ${error.status}` : ""
    ].filter(Boolean).join(" ");

    if (String(error && error.status) === "412" || /invalid grant/i.test(rawMessage)) {
      return "Email service is not connected. Please reconnect Gmail in EmailJS and try again.";
    }

    if (String(error && error.status) === "400") {
      return "Email details are missing or incorrect. Please check your EmailJS service, template, and form fields.";
    }

    if (String(error && error.status) === "429") {
      return "Too many requests. Please wait a moment before sending again.";
    }

    return "Something went wrong. Please try again in a moment.";
  }

  function showToast(type, title, message) {
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

    const toastMessage = document.createElement("p");
    toastMessage.className = "toast-msg";
    toastMessage.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.className = "toast-close-btn";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Close notification");
    closeButton.textContent = "x";

    const progress = document.createElement("div");
    progress.className = "toast-progress";

    body.append(toastTitle, toastMessage);
    toast.append(icon, body, closeButton, progress);
    container.appendChild(toast);

    const removeToast = function () {
      toast.classList.add("toast-hide");
      window.setTimeout(function () {
        toast.remove();
      }, 350);
    };

    closeButton.addEventListener("click", removeToast);
    window.setTimeout(removeToast, 4000);
  }

  function attachEmailForm(form) {
    const sendButton = form.querySelector("button[type='submit']");

    if (!sendButton || form.dataset.emailjsReady === "true") return;

    form.dataset.emailjsReady = "true";

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (sendButton.disabled) return;

      setButtonLoading(sendButton, true);

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(function () {
          showToast("success", "Message Sent", "Thanks for reaching out. We will get back to you soon.");
          form.reset();
        })
        .catch(function (error) {
          console.error("EmailJS send failed:", error);
          showToast("error", "Failed to Send", getEmailJSErrorMessage(error));
        })
        .finally(function () {
          setButtonLoading(sendButton, false);
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("#contact-form, #assist-form, .contact-form");

    if (!forms.length) return;

    if (!window.emailjs) {
      showToast("error", "Email Not Ready", "EmailJS did not load. Check your internet connection or script URL.");
      return;
    }

    emailjs.init(EMAILJS_PUBLIC_KEY);
    forms.forEach(attachEmailForm);
  });
})();
