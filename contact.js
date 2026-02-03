(function () {
    emailjs.init("avzY1mepCB4cKvjOB"); // from EmailJS
  })();
  
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    emailjs.sendForm(
      "service_gopa72a",
      "template_2lmfazk",
      this
    )
    .then(() => {
      alert("Message sent successfully!");
      this.reset();
    })
    .catch(() => {
      alert("Failed to send message. Try again.");
    });
  });
  