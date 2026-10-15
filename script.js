
(() => {
  "use strict";

  // Product gallery auto-slide
  const photoPaths = ["./images/shyamora-1.png", "./images/shyamora-2.png"];
  const mainPhoto = document.getElementById("mainProductPhoto");
  const thumbnails = Array.from(document.querySelectorAll(".product-thumbnails .thumbnail"));
  let currentPhotoIndex = 0;
  let galleryTimer;

  function showProductPhoto(index) {
    if (!mainPhoto) return;

    currentPhotoIndex = (index + photoPaths.length) % photoPaths.length;
    mainPhoto.style.opacity = "0.45";

    window.setTimeout(() => {
      mainPhoto.src = photoPaths[currentPhotoIndex];
      mainPhoto.alt = `Shyamora Herbal Hair Oil product photo ${currentPhotoIndex + 1}`;
      mainPhoto.style.opacity = "1";
    }, 130);

    thumbnails.forEach((button, i) => {
      button.classList.toggle("active", i === currentPhotoIndex);
    });
  }

  thumbnails.forEach((button, index) => {
    button.addEventListener("click", () => {
      showProductPhoto(index);
      startGalleryAutoSlide();
    });
  });

  function startGalleryAutoSlide() {
    window.clearInterval(galleryTimer);

    if (photoPaths.length > 1 && mainPhoto) {
      galleryTimer = window.setInterval(() => {
        showProductPhoto(currentPhotoIndex + 1);
      }, 4000);
    }
  }

  startGalleryAutoSlide();

  // Pack selection and WhatsApp ordering
  const waNumber = "918849741920";
  let selectedPack = "Single bottle (200 ml) - ₹550";

  const one = document.getElementById("packOne");
  const two = document.getElementById("packTwo");
  const price = document.getElementById("stickyPrice");

  function selectPack(which) {
    const combo = which === "two";

    selectedPack = combo
      ? "Combo pack (2 x 200 ml) - ₹1,000"
      : "Single bottle (200 ml) - ₹550";

    if (one) one.classList.toggle("selected", !combo);
    if (two) two.classList.toggle("selected", combo);
    if (price) price.textContent = combo ? "₹1,000" : "₹550";
  }

  if (one) one.addEventListener("click", () => selectPack("one"));
  if (two) two.addEventListener("click", () => selectPack("two"));

  function orderOnWhatsApp() {
    const message = `Hi Shyamora, I want to order ${selectedPack}. Please confirm delivery charges, delivery time and COD availability for my PIN code.`;

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const orderBtn = document.getElementById("orderBtn");
  const stickyOrderBtn = document.getElementById("stickyOrderBtn");

  if (orderBtn) orderBtn.addEventListener("click", orderOnWhatsApp);
  if (stickyOrderBtn) stickyOrderBtn.addEventListener("click", orderOnWhatsApp);

  // Hero video fallback
  const video = document.getElementById("heroVideo");
  const videoMissing = document.getElementById("videoMissing");

  if (video && videoMissing) {
    video.addEventListener("error", () => {
      videoMissing.style.display = "block";
    });

    const source = video.querySelector("source");

    if (source) {
      source.addEventListener("error", () => {
        videoMissing.style.display = "block";
      });
    }

    video.play().catch(() => {});
  }

  // Sample purchase notification preview.
  // These are sample entries, not verified customer orders.
  const demoCustomers = [
    ["Aarohi", 1], ["Diya", 2], ["Kavya", 1], ["Meera", 2],
    ["Anaya", 1], ["Isha", 1], ["Riya", 2], ["Priya", 1],
    ["Nisha", 2], ["Pooja", 1], ["Sneha", 2], ["Aditi", 1],
    ["Khushi", 1], ["Neha", 2], ["Jiya", 1], ["Mahi", 2],
    ["Sana", 1], ["Tanvi", 1], ["Simran", 2], ["Anjali", 1],
    ["Reema", 2], ["Palak", 1], ["Hetal", 1], ["Krisha", 2],
    ["Sonal", 1], ["Mira", 2], ["Avni", 1], ["Bhavya", 1],
    ["Riddhi", 2], ["Vanya", 1]
  ];

  const toast = document.getElementById("purchaseToast");
  const toastName = document.getElementById("toastName");
  const toastMessage = document.getElementById("toastMessage");
  const toastClose = document.getElementById("toastClose");

  // Start at a random customer instead of always starting with Aarohi.
  let customerIndex = Math.floor(Math.random() * demoCustomers.length);
  let toastDismissed = false;
  let hideTimer;
  let repeatTimer;

  function showDemoToast() {
    if (
      !toast ||
      !toastName ||
      !toastMessage ||
      toastDismissed ||
      document.hidden
    ) {
      return;
    }

    // Select a random customer for each popup.
    const randomIndex = Math.floor(Math.random() * demoCustomers.length);
    customerIndex = randomIndex;

    const [name, qty] = demoCustomers[customerIndex];

    toastName.textContent = `${name}`;
    toastMessage.textContent =
      ` ${qty} bottle${qty === 1 ? "" : "s"} of Shyamora Herbal Hair Oil Bought`;

    toast.hidden = false;
    toast.classList.remove("toast-visible");

    requestAnimationFrame(() => {
      toast.classList.add("toast-visible");
    });

    window.clearTimeout(hideTimer);

    // Hide before the next 3-second popup.
    hideTimer = window.setTimeout(() => {
      toast.classList.remove("toast-visible");

      window.setTimeout(() => {
        toast.hidden = true;
      }, 250);
    }, 2500);
  }

  if (toast && toastClose) {
    toastClose.addEventListener("click", () => {
      toastDismissed = true;
      toast.classList.remove("toast-visible");
      toast.hidden = true;

      window.clearTimeout(hideTimer);
      window.clearInterval(repeatTimer);
    });

    // First popup after 3 seconds.
    window.setTimeout(showDemoToast, 3000);

    // Repeat every 3 seconds.
    repeatTimer = window.setInterval(showDemoToast, 150000);
  }
})();
