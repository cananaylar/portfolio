// Mobile nav
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close nav on link click (mobile)
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Reveal on scroll (lightweight)
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => io.observe(el));

// Copy email
const copyBtn = document.getElementById("copyEmail");
const copyHint = document.getElementById("copyHint");

if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.getAttribute("data-email") || "emailadresin@ornek.com";
    try {
      await navigator.clipboard.writeText(email);
      if (copyHint) copyHint.textContent = "E-posta kopyalandı.";
      setTimeout(() => { if (copyHint) copyHint.textContent = ""; }, 1800);
    } catch {
      if (copyHint) copyHint.textContent = "Kopyalama başarısız. Manuel olarak seçip kopyalayabilirsin.";
      setTimeout(() => { if (copyHint) copyHint.textContent = ""; }, 2500);
    }
  });
}

// Tag click micro-interaction (purely aesthetic)
document.querySelectorAll(".tag").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.style.transform = "translateY(-2px)";
    setTimeout(() => (btn.style.transform = ""), 160);
  });
});


/* ======================================================
   2️⃣ HERO IMAGE – VERY SOFT PARALLAX (DESKTOP ONLY)
   ====================================================== */

const heroImage = document.querySelector(".hero-image");

if (heroImage && window.matchMedia("(pointer: fine)").matches) {
  let latestScroll = 0;
  let ticking = false;

  const updateParallax = () => {
    const offset = Math.min(latestScroll * 0.08, 14); // max ~14px
    heroImage.style.transform = `translateY(${offset}px)`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    latestScroll = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}


/* ======================================================
   5️⃣ CONTACT SECTION – FOCUS EFFECT ON VIEW
   ====================================================== */

const contactBox = document.querySelector(".contact-box");

if (contactBox) {
  const contactObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        contactBox.classList.add("contact-focus");
      }
    },
    {
      threshold: 0.35
    }
  );

  contactObserver.observe(contactBox);
}
