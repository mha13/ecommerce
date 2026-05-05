const ENDPOINT_CART = "http://localhost:3000/cart";

// ===== Global Cart + UI Helpers =====
async function getCart() {
  const response = await fetch(ENDPOINT_CART);
  const cart = await response.json();
  return cart;
}

async function aggiornoNumeroCartello() {
  const cartProduct = await getCart();
  const cartElement = document.querySelector("#cartello span");
  if (cartElement) {
    cartElement.textContent = cartProduct.length;
  }
}

function initNewsletter() {
  const newsletterForm = document.getElementById("newletterform");
  const subscribedNotice = document.getElementById("subscribed");

  if (localStorage.getItem("email") && newsletterForm && subscribedNotice) {
    newsletterForm.style.display = "none";
    subscribedNotice.classList.remove("hidden");
  }

  const newsletterBtn = document.getElementById("newletter-btn");
  if (!newsletterBtn) return;

  newsletterBtn.addEventListener("click", () => {
    const email = document.getElementById("email");
    if (!email || !email.value) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: `Please enter your email`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    if (newsletterForm && subscribedNotice) {
      newsletterForm.style.display = "none";
      subscribedNotice.classList.remove("hidden");
    }

    localStorage.setItem("email", email.value);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `Email added to newsletter`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  });
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
    mobileNav.classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNewsletter();
  aggiornoNumeroCartello();
  initMobileMenu();
});
