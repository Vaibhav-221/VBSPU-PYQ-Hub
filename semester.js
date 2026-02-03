document.addEventListener("DOMContentLoaded", () => {
    for (let i = 1; i <= 8; i++) {
      const btn = document.getElementById(`sem-${i}`);
  
      if (btn) {
        btn.addEventListener("click", () => {
          window.location.href = `subject.html?semester=${i}`;
        });
      }
    }
  });
  