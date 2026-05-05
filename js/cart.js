document.addEventListener("DOMContentLoaded", () => {
  loadCart();
});

// ===== Fetch & Render Cart =====
async function loadCart() {
  const cart = await getCart();
  updateBadge(cart.length);

  const itemsEl = document.getElementById("cart-items");
  const emptyEl = document.getElementById("cart-empty");
  const summaryEl = document.getElementById("cart-summary");

  itemsEl.innerHTML = "";

  if (cart.length === 0) {
    emptyEl.classList.remove("hidden");
    summaryEl.classList.add("hidden");
    return;
  }

  emptyEl.classList.add("hidden");
  summaryEl.classList.remove("hidden");

  cart.forEach((item) => {
    const qty = item.quantity || 1;
    const row = document.createElement("div");
    row.className =
      "cart-item flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl shadow-sm p-4 transition-all duration-300";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-24 h-24 rounded-xl object-cover flex-none" />
      <div class="flex-1 text-center sm:text-left">
        <h3 class="font-bold text-[#2D1810]">${item.name}</h3>
        <p class="text-gray-400 text-xs mt-0.5">${item.category}</p>
        <p class="text-[#8D4201] font-semibold mt-1">$${item.price.toFixed(2)}</p>
      </div>
      <div class="flex items-center gap-3">
        <button data-id="${item.id}" data-action="dec" class="qty-btn w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100 transition">−</button>
        <span class="w-8 text-center font-semibold">${qty}</span>
        <button data-id="${item.id}" data-action="inc" class="qty-btn w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-100 transition">+</button>
      </div>
      <p class="font-bold text-[#2D1810] w-20 text-right">$${(item.price * qty).toFixed(2)}</p>
      <button data-id="${item.id}" class="delete-btn text-red-400 hover:text-red-600 transition ml-2" title="Remove">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
        </svg>
      </button>
    `;
    itemsEl.appendChild(row);
  });

  // Bind quantity buttons
  document.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const item = cart.find((p) => p.id === id);
      if (!item) return;
      let newQty = (item.quantity || 1) + (action === "inc" ? 1 : -1);
      if (newQty < 1) {
        await deleteItem(id);
      } else {
        await updateQuantity(id, newQty);
      }
      loadCart();
    });
  });

  // Bind delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await deleteItem(btn.dataset.id);
      loadCart();
    });
  });

  // Update summary
  updateSummary(cart);
}

// ===== API Helpers =====
async function getCart() {
  const res = await fetch(ENDPOINT_CART);
  return res.json();
}

async function deleteItem(id) {
  await fetch(`${ENDPOINT_CART}/${id}`, { method: "DELETE" });
}

async function updateQuantity(id, quantity) {
  await fetch(`${ENDPOINT_CART}/${id}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
}

// ===== Summary =====
function updateSummary(cart) {
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * (item.quantity || 1);
  });
  const tasse = subtotal * 0.1; // Tassa di spedizione del 10%

  document.getElementById("subtotal").textContent = `€${subtotal.toFixed(2)}`;
  document.getElementById("tasse").textContent =
    tasse === 0 ? "Free" : `€${tasse.toFixed(2)}`;
  document.getElementById("total").textContent = `€${(subtotal + tasse).toFixed(2)}`;
}

// ===== Badge =====
function updateBadge(count) {
  const badge = document.querySelector("#cartello span");
  if (badge) badge.textContent = count;
}
