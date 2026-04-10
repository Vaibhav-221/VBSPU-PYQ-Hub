(function () {
  emailjs.init("avzY1mepCB4cKvjOB");
})();

function showToast(type, title, message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const icon = type === "success" ? "✓" : "✕";

  const toast = document.createElement("div");
  toast.className = "toast-notif " + type;
  toast.innerHTML = `
    <div class="toast-icon-circle">${icon}</div>
    <div class="toast-body">
      <p class="toast-title">${title}</p>
      <p class="toast-msg">${message}</p>
    </div>
    <button class="toast-close-btn" aria-label="Close">×</button>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  // Close on X click
  toast.querySelector(".toast-close-btn").addEventListener("click", () => {
    toast.remove();
  });

  // Auto-dismiss after 4s
  setTimeout(() => {
    toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const btn = document.getElementById("send-btn");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");

  btn.disabled = true;
  btnText.style.display = "none";
  btnSpinner.style.display = "inline";

  emailjs.sendForm("service_gopa72a", "template_2lmfazk", this)
    .then(() => {
      showToast("success", "Message Sent!", "Thanks for reaching out. We'll get back to you soon.");
      this.reset();
    })
    .catch(() => {
      showToast("error", "Failed to Send", "Something went wrong. Please try again.");
    })
    .finally(() => {
      btn.disabled = false;
      btnText.style.display = "inline";
      btnSpinner.style.display = "none";
    });
});