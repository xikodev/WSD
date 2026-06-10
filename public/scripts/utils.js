async function fetchJson(url) {
    const response = await fetch(url, {
        headers: {
            Accept: "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Request failed: " + response.status);
    }

    return response.json();
}

async function getCart() {
    return fetchJson("/cart/getAll");
}

function countCartItems(cartResponse) {
    return cartResponse.total || 0;
}

function findCartQuantity(cartResponse, productId) {
    const item = cartResponse.items.find(function (row) {
        return row.product.id === productId;
    });

    return item ? item.quantity : 0;
}

function syncBadge(element, count) {
    if (!element) {
        return;
    }

    element.textContent = count;
    element.style.display = count === 0 ? "none" : "inline-flex";
}
