document.addEventListener("DOMContentLoaded", () => {

  // PYQs button in hero section
  const pyqsBtn = document.querySelector(".b1");
  if (pyqsBtn) {
    pyqsBtn.addEventListener("click", () => {
      window.location.href = "semester.html";
    });
  }
  const btnb2 = document.querySelector(".b2");
  if (btnb2) {
    btnb2.addEventListener("click", () => {
      window.location.href = "maintinance.html";
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