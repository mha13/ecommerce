document.addEventListener("DOMContentLoaded", async () => {
    const cart = await fetch(ENDPOINT_CART).then((r) => r.json());
    const itemsEl = document.getElementById("order-items");

    if (cart.length === 0) {
        // Show success
        document.getElementById("checkout-form-container").classList.add("hidden");
        document.getElementById("checkout-success").classList.remove("hidden");
        document.getElementById("order-number").textContent = Math.random().toString(36).substring(2, 10).toUpperCase();
    }

    let subtotal = 0;
    cart.forEach((item) => {
        const qty = item.quantity || 1;
        subtotal += item.price * qty;
        itemsEl.innerHTML += `
            <div class="flex items-center gap-3">
              <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium truncate">${item.name}</p>
                <p class="text-xs text-gray-400">x${qty}</p>
              </div>
              <p class="text-sm font-semibold">€${(item.price * qty).toFixed(2)}</p>
            </div>`;
    });

    const tasse = subtotal * 0.1; // Tassa di spedizione del 10%
    document.getElementById("order-subtotal").textContent = `€${subtotal.toFixed(2)}`;
    document.getElementById("order-tasse").textContent = `€${tasse.toFixed(2)}`;
    document.getElementById("order-total").textContent = `€${(subtotal + tasse).toFixed(2)}`;

    function checkForm() {
        payment = document.querySelector('#payment-method');
        if (!payment.value) {
            return "seleziona un metodo di pagamento";
        }
        if (payment.value === "card") {
            const zip = document.getElementById("zip-code");
            const cardNumber = document.getElementById("card-number");
            const cardExpiry = document.getElementById("card-expiry");
            const cardCvv = document.getElementById("card-cvv");
            var reOnlyDigits = /^\d+$/;
            var reExpiry = /^\d{2}\/\d{2}$/;

            if (!zip.value || zip.value.length !== 5 || !reOnlyDigits.test(zip.value)) {
                return "zip errato";
            }
            if (!cardNumber.value || cardNumber.value.length !== 16 || !reOnlyDigits.test(cardNumber.value)) {
                return "numero della carta errato";
            }
            if (!cardExpiry.value || !reExpiry.test(cardExpiry.value)) {
                return "data di scadenza della carta errata";
            }
            if (!cardCvv.value || cardCvv.value.length !== 3 || !reOnlyDigits.test(cardCvv.value)) {
                return "CVV della carta errato";
            }
            return true;
        }else{
            const zip = document.getElementById("zip-code");
            var reOnlyDigits = /^\d+$/;

            if (!zip.value || zip.value.length !== 5 || !reOnlyDigits.test(zip.value)) {
                return "zip errato";
            }
            return true;
        }
    }

    document.querySelector('#payment-method').addEventListener('change', (e) => {   
        const cardDetails = document.getElementById("card-details");
        if (e.target.value === "card") {
            cardDetails.classList.remove("hidden");
        } else {
            cardDetails.classList.add("hidden");
        }   
    });


    // Place order
    document.getElementById("checkout-form").addEventListener("submit", async (e) => {
        if (document.getElementById("checkout-form").checkValidity() && checkForm() === true) {
            e.preventDefault();
            const btn = document.getElementById("place-order-btn");
            btn.textContent = "Processing...";
            btn.disabled = true;

            // Simulate processing delay
            await new Promise((r) => setTimeout(r, 1500));

            // Clear cart
            for (const item of cart) {
                await fetch(`${ENDPOINT_CART}/${item.id}`, { method: "DELETE" });
            }
        } else {
            e.preventDefault();
            Swal.fire({
                icon: "error",
                title: `Errore nel inserimento dei dati` + (typeof checkForm() === "string" ? `: ${checkForm()}` : ""),
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
            });
        }


    });
});