async function addToCart(product) {
  try {
    const cart = await getCart();
    const productInCart = cart.some((p) => p.title === product.title);
    if (productInCart) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: `Questo evento è già nel carrello!`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    const response = await fetch(ENDPOINT_CART, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ...product, quantity: 1 }),
    });

    if (!response.ok) throw new Error("Failed to add to cart");

    await aggiornoNumeroCartello();

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${product.title} aggiunto al carrello`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    const savedProduct = await response.json();
    return savedProduct;
  } catch (error) {
    console.error("Error adding to cart:", error);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: `Errore nell'aggiunta al carrello`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
}

// ===== Load & Render Products =====
const productsContainer = document.getElementById("products");

fetch("http://localhost:3000/eventi")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "product-card bg-white rounded-2xl overflow-hidden shadow-md border-2 border-white hover:border-black hover:shadow-xl transition-shadow duration-300";
      card.innerHTML = `
        <div class="overflow-hidden">
          <img class="w-full" src="${product.image}" alt="${product.title}" />
        </div>
        <div class="p-5">
          <h3 class="text-lg font-bold text-black mb-1">${product.title}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">${product.description}</p>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold text-gray-800">€${product.price.toFixed(2)}</span>
          </div>
          <div class="flex items-center gap-2 mb-2 mt-3">
            <span class="text-xs font-semibold uppercase tracking-wider bg-gray-700 text-white px-2 py-0.5 rounded-full">${product.date}</span>
            <span class="text-xs font-semibold uppercase tracking-wider bg-gray-600 text-white px-2 py-0.5 rounded-full">${product.location}</span>
          </div>
        </div>
      `;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "btn-cart w-full text-white py-3 font-semibold text-sm tracking-wide bg-black rounded-lg";
      btn.textContent = "agguingi al carrello";
      card.appendChild(btn);
      btn.addEventListener("click", () => addToCart(product));

      productsContainer.appendChild(card);
    });
  });
