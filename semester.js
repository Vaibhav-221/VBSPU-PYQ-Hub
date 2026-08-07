document.addEventListener("DOMContentLoaded", () => {
    const navigateAfterTap = (button, url) => {
      if (window.playSiteButtonTap) {
        window.playSiteButtonTap(button, () => {
          window.location.href = url;
        });
        return;
      }

      window.setTimeout(() => {
        window.location.href = url;
      }, 180);
    };

    for (let i = 1; i <= 8; i++) {
      const btn = document.getElementById(`sem-${i}`);
  
      if (btn) {
        btn.addEventListener("click", (event) => {
          event.preventDefault();
          navigateAfterTap(btn, `subject.html?semester=${i}`);
        });
      }
    }
  });
  
