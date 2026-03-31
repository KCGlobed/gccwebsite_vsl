 function toggleFaq(el) {
      var item = el.parentElement;
      var isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });
      // Open clicked if it was closed
      if (!isOpen) item.classList.add('open');
    }
    // ── LOCKED CTA COUNTDOWN — 30 seconds ──
    var LOCK_SECONDS = 10;
    var lockRemaining = LOCK_SECONDS;
    var lockInterval = null;

    function startLockCountdown() {
      var countdownEl = document.getElementById('btnCountdown');
      var msgEl = document.getElementById('btnActivateMsg');
      var btn = document.getElementById('mainCtaBtn');

      lockInterval = setInterval(function () {
        lockRemaining--;

        if (lockRemaining > 0) {
          if (countdownEl) countdownEl.textContent = lockRemaining;
        } else {
          // Activate the button
          clearInterval(lockInterval);
          btn.disabled = false;
          btn.classList.remove('cta-btn-locked');
          btn.classList.add('cta-btn-active');
          if (msgEl) msgEl.style.display = 'none';

          // Re-enable click
          btn.onclick = function () {
            var bc = document.getElementById('buy-section');
            if (bc) bc.scrollIntoView({ behavior: 'smooth', block: 'start' });
          };
        }
      }, 1000);
    }

    // Start countdown on page load
    window.addEventListener('DOMContentLoaded', function () {
      startLockCountdown();
    });

    // ── DUAL CTA TIMER — reveals after 5 minutes ──
    var TIMER_SECONDS = 300;

    function startVideoTimer() {
      setTimeout(function () {
        var dc = document.getElementById('dualCta');
        if (dc) {
          dc.classList.add('visible');
          dc.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, TIMER_SECONDS * 1000);
    }

    // Fallback: show dual CTA when user scrolls to 75%
    window.addEventListener('scroll', function () {
      var scrollBottom = window.scrollY + window.innerHeight;
      var docHeight = document.documentElement.scrollHeight;
      if (scrollBottom > docHeight * 0.75) {
        var dc = document.getElementById('dualCta');
        if (dc && !dc.classList.contains('visible')) {
          dc.classList.add('visible');
        }
      }
    });



    const cashfree = new Cashfree(
      CFEnvironment.PRODUCTION,
      "{Client ID}",
      "{Client Secret Key}"
    );

    function createOrder() {
      var request = {
        order_amount: "1",
        order_currency: "INR",
        customer_details: {
          customer_id: "node_sdk_test",
          customer_name: "",
          customer_email: "example@gmail.com",
          customer_phone: "9999999999",
        },
        order_meta: {
          return_url:
            "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123",
        },
        order_note: "",
      };

      cashfree
        .PGCreateOrder(request)
        .then((response) => {
          var a = response.data;
          console.log(a);
        })
        .catch((error) => {
          console.error("Error setting up order request:", error.response.data);
        });
    }