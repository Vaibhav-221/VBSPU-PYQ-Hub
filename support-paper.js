(function () {
  const MUTE_KEY = 'pyq_popup_mute_until';
  const COUNT_KEY = 'pyq_download_count';
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

  const popup = document.getElementById('support-popup');
  const list = document.getElementById('pyq-list');
  if (!popup || !list) return;

  const isMuted = () => Date.now() < Number(localStorage.getItem(MUTE_KEY) || 0);
  const getCount = () => Number(localStorage.getItem(COUNT_KEY) || 0);
  const setCount = (n) => localStorage.setItem(COUNT_KEY, String(n));

  const showPopup = () => {
    popup.classList.remove('hidden');
    popup.classList.add('flex');
  };
  const hidePopup = () => {
    popup.classList.add('hidden');
    popup.classList.remove('flex');
  };

  let pendingUrl = null;

  // Event delegation — works even though cards are injected later by papers.js
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.pyq-download-btn');
    if (!btn) return;

    if (isMuted()) return; // let it download normally

    const nextCount = getCount() + 1;

    if (nextCount < 3) {
      setCount(nextCount);
      return; // let it download normally
    }

    // 3rd click — block download, show popup instead
    e.preventDefault();
    pendingUrl = btn.getAttribute('data-href');
    setCount(0); // reset immediately so next 3-cycle starts fresh
    showPopup();
  });

  document.getElementById('support-popup-later').addEventListener('click', () => {
    localStorage.setItem(MUTE_KEY, String(Date.now() + SEVEN_DAYS));
    hidePopup();
    if (pendingUrl) {
      window.open(pendingUrl, '_blank');
      pendingUrl = null;
    }
  });

  document.getElementById('support-popup-now').addEventListener('click', () => {
    hidePopup();
    window.location.href = 'support.html';
    // note: pending download is intentionally NOT opened here —
    // user goes to support.html and can re-click download after returning
  });
})();