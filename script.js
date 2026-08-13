// Indian Protein Guide — shared front-end behaviour
// Vanilla JS, no dependencies.

document.addEventListener('DOMContentLoaded', function () {
  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- copy UPI ID (payment page) ---- */
  var copyBtn = document.getElementById('copyUpiBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var upiId = copyBtn.getAttribute('data-upi') || '';
      var restore = function () {
        setTimeout(function () {
          copyBtn.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 1600);
      };
      var showCopied = function () {
        copyBtn.textContent = 'Copied';
        copyBtn.classList.add('copied');
        restore();
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(upiId).then(showCopied).catch(function () {
          fallbackCopy(upiId);
          showCopied();
        });
      } else {
        fallbackCopy(upiId);
        showCopied();
      }
    });
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* no-op */ }
    document.body.removeChild(ta);
  }

  /* ---- "I've Paid" button: simple navigation, no fake verification ---- */
  var paidBtn = document.getElementById('paidContinueBtn');
  if (paidBtn) {
    paidBtn.addEventListener('click', function (e) {
      // Purely navigational — this is an honor-system flow.
      // No payment verification happens here or anywhere on this site.
      window.location.href = 'download.html';
    });
  }
});
