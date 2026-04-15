document.addEventListener("DOMContentLoaded", () => {
  // PYQs button in hero section
  const pyqsBtn = document.querySelector(".b1");
  if (pyqsBtn) {
    pyqsBtn.addEventListener("click", () => {
      window.location.href = "semester.html";
    });
  
    
    
  }

  // Navbar links (prevent default to avoid double navigation)
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

  // Download modal logic
  const navDownload = document.querySelector(".nav-download a");
  const modal = document.getElementById("downloadModal");
  if (navDownload && modal) {
    const cancelBtn = modal.querySelector('.cancel');
    const downloadBtn = modal.querySelector('.download');
    navDownload.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
    });
    cancelBtn?.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    downloadBtn?.addEventListener('click', async () => {
      modal.style.display = 'none';
      try {
        const response = await fetch('VBSPU%20PYQ%20Hub.apk');
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'VBSPU-PYQ-Hub.apk';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Download failed:', err);
        alert('Failed to download the app. Please try again later.');
      }
    });
  }
});