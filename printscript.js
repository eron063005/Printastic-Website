// ==============================================================
// TAILWIND CUSTOM CONFIGURATION
// Pinapalawak ang default Tailwind colors at fonts para sa custom theme mo
// ==============================================================
tailwind.config = {
  theme: {
    extend: {
      colors: {
        forest: "#194517", // Pangunahing dark green
        "forest-light": "#2a6b26", // Mas maliwanag na green
        "forest-lighter": "#3d8a38", // Pinakamaliwanag na green shade
        sunny: "#e8ea00", // Bright yellow / main accent color
        "sunny-light": "#f0f240", // Lighter sunny variant
        cream: "#f7f6d9", // Off-white / background cream
        "cream-light": "#fdfcf0", // Mas maliwanag na cream
        "cream-dark": "#e8e5a8", // Darker cream para sa text/icons
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Body text font
        space: ["Space Grotesk", "sans-serif"], // Headings & brand font
      },
    },
  },
};

// ==============================================================
// MOBILE MENU TOGGLE
// ==============================================================
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// ==============================================================
// PRICE TABLE TABS SWITCHER
// ==============================================================
function showPriceTable(tableId) {
  document.querySelectorAll(".price-table").forEach((table) => {
    table.classList.add("hidden");
  });

  const targetTable = document.getElementById(`table-${tableId}`);
  if (targetTable) targetTable.classList.remove("hidden");

  document.querySelectorAll(".price-tab").forEach((tab) => {
    tab.classList.remove("bg-sunny", "text-forest");
    tab.classList.add("bg-forest-light", "text-cream");
  });

  const activeTab = document.getElementById(`tab-${tableId}`);
  if (activeTab) {
    activeTab.classList.remove("bg-forest-light", "text-cream");
    activeTab.classList.add("bg-sunny", "text-forest");
  }
}

// ==============================================================
// MODAL OPEN/CLOSE FUNCTIONS
// ==============================================================
function openBluetoothModal() {
  document.getElementById("bluetooth-modal")?.classList.remove("hidden");
}
function closeBluetoothModal() {
  document.getElementById("bluetooth-modal")?.classList.add("hidden");
}
function openMessageModal() {
  document.getElementById("message-modal")?.classList.remove("hidden");
}
function closeMessageModal() {
  document.getElementById("message-modal")?.classList.add("hidden");
}
function openRateModal() {
  document.getElementById("rate-modal")?.classList.remove("hidden");
}
function closeRateModal() {
  document.getElementById("rate-modal")?.classList.add("hidden");
}

// ==============================================================
// BLUETOOTH FORM SUBMISSION (demo)
// ==============================================================
function submitBluetoothForm(event) {
  event.preventDefault();
  const deviceName =
    document.getElementById("bluetooth-device")?.value || "Unknown";
  showToast(
    `Looking for device: ${deviceName}. Please ensure Bluetooth is enabled!`,
  );
  closeBluetoothModal();
  document.getElementById("bluetooth-form")?.reset();
}

// ==============================================================
// STAR RATING SYSTEM + AVERAGE DISPLAY (ilagay dito)
// ==============================================================
let currentRating = 0;
let totalRating = parseFloat(localStorage.getItem("totalRating")) || 0;
let ratingCount = parseInt(localStorage.getItem("ratingCount")) || 0;

function setRating(rating) {
  currentRating = rating;
  const ratingValue = document.getElementById("rating-value");
  if (ratingValue) ratingValue.value = rating;

  const stars = document.querySelectorAll(".star-rating .star svg");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.remove("text-cream-dark");
      star.classList.add("text-sunny");
    } else {
      star.classList.remove("text-sunny");
      star.classList.add("text-cream-dark");
    }
  });

  const ratingTexts = [
    "Click to rate",
    "Poor",
    "Fair",
    "Good",
    "Very Good",
    "Excellent!",
  ];
  const ratingText = document.getElementById("rating-text");
  if (ratingText) ratingText.textContent = ratingTexts[rating];
}

// ==============================================================
// TOAST NOTIFICATION
// ==============================================================
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove("translate-y-full", "opacity-0");

  setTimeout(() => {
    toast.classList.add("translate-y-full", "opacity-0");
  }, 4000);
}

// ==============================================================
// SMOOTH SCROLL
// ==============================================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ==============================================================
// DRAG & DROP PREVIEW (no real upload)
// ==============================================================
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-upload");
const fileNameDisplay = document.getElementById("file-name-display");
const cloudLinkInput = document.getElementById("cloud-link");

if (dropZone && fileInput) {
  ["dragover", "dragenter"].forEach((event) => {
    dropZone.addEventListener(event, (e) => {
      e.preventDefault();
      dropZone.classList.add("border-sunny", "bg-sunny/10");
    });
  });

  ["dragleave", "drop"].forEach((event) => {
    dropZone.addEventListener(event, (e) => {
      e.preventDefault();
      dropZone.classList.remove("border-sunny", "bg-sunny/10");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInput.files = e.dataTransfer.files;
      showFileName(file.name);
    }
  });

  // Prevent double open when clicking inside
  dropZone.addEventListener("click", (e) => {
    if (e.target.tagName !== "LABEL" && e.target.tagName !== "INPUT") {
      fileInput.click();
    }
  });

  cloudLinkInput?.addEventListener("click", (e) => e.stopPropagation());

  fileInput.addEventListener("change", () => {
    if (fileInput.files[0]) showFileName(fileInput.files[0].name);
  });
}

function showFileName(name) {
  if (fileNameDisplay) {
    fileNameDisplay.textContent = `Preview only: ${name} (use link for actual file)`;
    fileNameDisplay.classList.remove("hidden");
    fileNameDisplay.classList.add("text-yellow-400");
    cloudLinkInput.value = "";
  }
}

// ==============================================================
// EMAILJS SETUP
// ==============================================================
(function () {
  emailjs.init({ publicKey: "psYDvcYX4iyustHWR" });
})();

function sendEmail(templateId, params) {
  emailjs
    .send("print_service", templateId, params)
    .then(() => showToast("✅ Sent successfully! Check your email."))
    .catch((err) => {
      console.error("EmailJS error:", err);
      showToast("❌ Failed to send. Check console.");
    });
}

// ==============================================================
// PRINT REQUEST SUBMISSION
// ==============================================================
document.getElementById("order-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const params = {
    name: form.querySelector("#customer-name")?.value.trim() || "N/A",
    studentNumber: form.querySelector("#student-number")?.value.trim() || "N/A",
    college: form.querySelector("#college")?.value || "N/A",
    yearSection:
      form.querySelector("#student-year-section")?.value.trim() || "N/A",
    contact: form.querySelector("#contact-number")?.value.trim() || "N/A",
    email: form.querySelector("#email")?.value.trim() || "N/A",
    pickupLocation: form.querySelector("#pickup-location")?.value || "N/A",
    pickupTime: form.querySelector("#pickup-time")?.value || "N/A",
    paperSize: form.querySelector("#paper-size")?.value || "N/A",
    colorMode: form.querySelector("#color-mode")?.value || "N/A",
    copies: form.querySelector("#copies")?.value || "N/A",
    paymentMethod: form.querySelector("#payment-method")?.value || "N/A",
    instructions:
      form.querySelector("#special-instructions")?.value.trim() || "None",
    cloudLink:
      form.querySelector("#cloud-link")?.value.trim() || "No link provided",
  };

  if (!params.name || params.name === "N/A" || !params.email.includes("@")) {
    showToast("Please fill name and valid email.");
    return;
  }

  if (params.paymentMethod === "N/A") {
    showToast("Please select payment method.");
    return;
  }

  console.log("Sending Print Request:", params);
  sendEmail("print_request", params);

  form.reset();
  showToast("Print request submitted!");
});

// ==============================================================
// GENERAL CONTACT (Message + Rating)
// ==============================================================
function sendGeneralContact(type, extraParams = {}) {
  const params = {
    type: type.replace(/\//g, " or "),
    name: extraParams.name || "Anonymous",
    contact: extraParams.contact || "N/A",
    email: extraParams.email || "N/A",
    message: extraParams.message || "",
    comment: extraParams.comment || "",
    rating: extraParams.rating || "",
  };

  console.log(`Sending ${type}:`, params);
  sendEmail("general_contact", params);
}

// ==============================================================
// MESSAGE FORM
// ==============================================================
function submitMessageForm(event) {
  event.preventDefault();

  const params = {
    name: document.getElementById("message-name")?.value.trim() || "Anonymous",
    contact: document.getElementById("message-contact")?.value.trim() || "N/A",
    message:
      document.getElementById("message-content")?.value.trim() || "No message",
  };

  sendGeneralContact("Message or Inquiry", params);

  closeMessageModal();
  document.getElementById("message-form")?.reset();
  showToast("Message sent! We'll reply soon.");
}

// ==============================================================
// RATE FORM SUBMISSION (with Anonymous + Name support)
// ==============================================================
function submitRateForm(event) {
  event.preventDefault();

  if (currentRating === 0) {
    showToast("Please select a rating first!");
    return;
  }

  const isAnonymous = document.getElementById("anonymous-check").checked;
  const reviewerName = document.getElementById("reviewer-name").value.trim();

  const comment =
    document.getElementById("rate-comment").value.trim() || "No comment";

  // Save review
  const reviews = JSON.parse(localStorage.getItem("printasticReviews")) || [];

  const newReview = {
    name: isAnonymous ? "Anonymous" : reviewerName || "Anonymous",
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    comment: comment,
    rating: currentRating,
  };

  reviews.unshift(newReview);
  localStorage.setItem("printasticReviews", JSON.stringify(reviews));

  // Update average
  totalRating += currentRating;
  ratingCount += 1;
  localStorage.setItem("totalRating", totalRating);
  localStorage.setItem("ratingCount", ratingCount);

  const average = (totalRating / ratingCount).toFixed(1);
  const displayElement = document.getElementById("rating-display");
  if (displayElement)
    displayElement.innerHTML = `Average Rating: ${average} ⭐ (${ratingCount} votes)`;

  sendGeneralContact("Feedback", {
    rating: currentRating,
    comment: comment,
    name: newReview.name,
  });

  closeRateModal();
  document.getElementById("rate-form").reset();
  setRating(0);
  showToast(`Thank you! Current average: ${average} stars`);

  renderReviews();
}

// ==============================================================
// REVIEWS DISPLAY + DELETE BUTTON (Admin only)
// ==============================================================
function renderReviews() {
  const reviews = JSON.parse(localStorage.getItem("printasticReviews")) || [];
  const container = document.getElementById("review-content");
  const totalEl = document.getElementById("total-reviews");

  if (reviews.length === 0) {
    container.innerHTML = `<p class="text-forest/60 italic">No reviews yet. Be the first to rate us!</p>`;
    totalEl.textContent = "0";
    return;
  }

  const review = reviews[currentReviewIndex];

  container.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <div class="flex justify-center gap-1 text-3xl text-sunny mb-4">
        ${Array(5)
          .fill(0)
          .map((_, i) => (i < review.rating ? "★" : "☆"))
          .join("")}
      </div>
      <p class="text-forest text-lg leading-relaxed italic mb-6">"${review.comment}"</p>
      <p class="font-medium text-forest">${review.name}</p>
      <p class="text-forest/60 text-sm">${review.date}</p>
    </div>
  `;

  totalEl.textContent = reviews.length;
}

// Delete all reviews (Admin only)
function deleteAllReviews() {
  if (confirm("Delete ALL reviews? This cannot be undone.")) {
    localStorage.removeItem("printasticReviews");
    localStorage.removeItem("totalRating");
    localStorage.removeItem("ratingCount");
    totalRating = 0;
    ratingCount = 0;
    currentReviewIndex = 0;
    renderReviews();
    showToast("All reviews have been deleted.");
  }
}

// Toggle delete button visibility
let isDeleteVisible = false;
function toggleDeleteButton() {
  isDeleteVisible = !isDeleteVisible;
  const btn = document.getElementById("delete-reviews-btn");
  if (btn) btn.classList.toggle("hidden", !isDeleteVisible);
}

// Navigation
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prev-review");
  const nextBtn = document.getElementById("next-review");
  const deleteBtn = document.getElementById("delete-reviews-btn");

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      const reviews =
        JSON.parse(localStorage.getItem("printasticReviews")) || [];
      if (reviews.length === 0) return;
      currentReviewIndex =
        (currentReviewIndex - 1 + reviews.length) % reviews.length;
      renderReviews();
    });

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      const reviews =
        JSON.parse(localStorage.getItem("printasticReviews")) || [];
      if (reviews.length === 0) return;
      currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
      renderReviews();
    });

  if (deleteBtn) deleteBtn.addEventListener("click", deleteAllReviews);

  // Show delete button when clicking Printastic logo in nav
  const logo = document.getElementById("nav-title");
  if (logo) logo.style.cursor = "pointer";
  if (logo) logo.addEventListener("click", toggleDeleteButton);

  renderReviews();
});
