


const cartItemsDiv = document.getElementById("cart-items");
const cartCountText = document.getElementById("cart-count");
const cartTotalText = document.getElementById("cart-total");

const cartBadge = document.getElementById("cart-badge");
const cartTitle = document.getElementById("cart-header-title");


const everyProduct = getAllProducts();

function findProduct(id) {
    for (let i = 0; i < everyProduct.length; i++ ) {
        if (everyProduct[i].id === id) {
            return everyProduct[i];
        }
    }

    return null;
}

function getRows() {
    const cart = getCart();
    const rows = [ ];

    for (const id in cart) {
        const product = findProduct(id);
        if (product ) {
            rows.push({
                product: product,
                quantity: cart[id]
            }
            );
        }
    }


    return rows;
}

function updateCartInfo(rows)
{
    let count = 0;
    let total = 0;


    for (let i = 0; i < rows.length; i++) {
        count += rows[i].quantity;
        total += rows[i].quantity * rows[i].product.price;
    }
    cartCountText.textContent = count ;
    cartTotalText.textContent = formatPrice(total);
    cartTitle.textContent = count + " products selected" ;
    showBadge(cartBadge, count);
}

function showEmptyMessage() {
    cartItemsDiv.innerHTML = `
        <article class="cart-empty">
            <h3>Your cart is empty</h3>
            <p>Go back to the main page and add some products.</p>
        </article>
    `;

}

function makeCartBox(row) {
    const box = document.createElement("article");

    box.className = "cart-item";
    box.innerHTML = `
        <div class="cart-item-details">
            <img src="${row.product.image}" alt="${row.product.name}">
            <div>
                <h3>${row.product.name}</h3>
                  <p>${row.product.categoryName}</p>
                <p class="cart-line-price">${formatPrice(row.product.price)} each</p>
            </div>
        </div>
        <div class="cart-quantity-controls">
            <button type="button" data-action="minus" data-id="${row.product.id}" >-</button>
            <span>${row.quantity}</span>
            <button type="button" data-action="plus" data-id="${row.product.id}">+</button>
        </div>
    `;

    return box;
}



function drawCart() {

    const rows = getRows() ;
    cartItemsDiv.innerHTML = "";
    if (rows.length == 0) {
        showEmptyMessage();
        updateCartInfo([]);
        return;
    }
    for (let i = 0; i < rows.length; i++) {
        cartItemsDiv.appendChild(makeCartBox(rows[i]));
    }

    updateCartInfo(rows);
}

function refreshCartPage() {
    drawCart();
}

cartItemsDiv.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const id = button.dataset.id;
    const action = button.dataset.action;
    const cart = getCart();
    let amount = cart[id] || 0;
    if (action === "plus") {
        amount = amount + 1;
    }
    if (action === "minus") {
        amount = amount - 1;
    }

    setCartAmount(id, amount);
    drawCart();
});

window.addEventListener("storage",refreshCartPage);
window.addEventListener("focus", refreshCartPage);

window.addEventListener("pageshow", refreshCartPage);
drawCart();



