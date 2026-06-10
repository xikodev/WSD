const cartItemsRoot = document.getElementById("cart-items");
const cartCountValue = document.getElementById("cart-count");

const cartBadge = document.getElementById("cart-badge");
const cartHeader = document.getElementById("cart-header-title");

function syncCartHeader(rows) {
    const count = rows.reduce(function (total, row) {
        return total + row.quantity;
    }, 0);
    cartCountValue.textContent = count;
    cartHeader.textContent = count + " products selected";
    syncBadge(cartBadge, count);
}

function renderEmptyCart() {
    cartItemsRoot.innerHTML = `
        <article class="cart-empty emptyState">
            <h3>Your cart is empty</h3>
            <p>Go back to the main page and add some products.</p>
        </article>
    `;

}

function buildCartRow(row) {
    const box = document.createElement("article");
    box.className = "cart-item cartRow";
    box.innerHTML = `
        <div class="cart-item-details cartMeta">
            <img src="${row.product.image}" alt="${row.product.name}">
            <div>
                <h3>${row.product.name}</h3>
                <p>${row.product.categoryName}</p>
            </div>
        </div>
        <div class="cart-quantity-controls qtyControls">
            <button type="button" data-action="minus" data-id="${row.product.id}" >-</button>
            <span>${row.quantity}</span>
            <button type="button" data-action="plus" data-id="${row.product.id}">+</button>
        </div>
    `;

    return box;
}


async function renderCart() {
    const cartResponse = await getCart();
    const rows = cartResponse.items;
    cartItemsRoot.innerHTML = "";
    if (rows.length == 0) {
        renderEmptyCart();
        syncCartHeader([]);
        return;
    }
    for (let i = 0; i < rows.length; i++) {
        cartItemsRoot.appendChild(buildCartRow(rows[i]));
    }

    syncCartHeader(rows);
}

cartItemsRoot.addEventListener("click", async function (event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const id = button.dataset.id;
    const action = button.dataset.action;
    if (action === "plus") {
        await fetchJson("/cart/add/" + encodeURIComponent(id));
    }
    if (action === "minus") {
        await fetchJson("/cart/remove/" + encodeURIComponent(id));
    }

    renderCart();
});

window.addEventListener("focus", renderCart);
window.addEventListener("pageshow", renderCart);



