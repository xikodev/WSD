

const cartKey = "car-parts-cart";

function formatPrice(value) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: storeData.currency

    }).format(value);
}

function getAllProducts()
{

    const all = [];

    for (let i = 0; i < storeData.categories.length; i++) {
        const category = storeData.categories[i];

        for (let j = 0; j < category.products.length; j++) {
          all.push({
                id: category.products[j].id,
                name: category.products[j].name,
                image: category.products[j].image,
                price: category.products[j].price,
                categoryName: category.name
            });
        }
    }

    return all;
}

function getCart() {
    const saved = localStorage.getItem(cartKey);

    if (!saved) {
        return {};
    }

    try {
        const cart = JSON.parse(saved);
        const validProducts = getAllProducts();
        const validIds = { };
        const cleanCart = { };

        for (let i = 0; i < validProducts.length; i++) {
            validIds[validProducts[i].id] = true;
        }

        if (!cart || typeof cart !== "object" || Array.isArray(cart)) {
            return {};
        }

        for (const id in cart) {
            if (validIds[id] && typeof cart[id] === "number" && cart[id] > 0) {
                cleanCart[id] = cart[id];
            }
        }

        return cleanCart;
    } catch (error) {

        return {};
    }
}


function saveCart(cart) {

    localStorage.setItem(cartKey, JSON.stringify(cart));
}


function getCartCount() {
    const cart = getCart();
    let total = 0;
    for (const id in cart) {
        total += cart[id];
    }
    return total;
}
function addToCart(id) {
    const cart = getCart();

    if (!cart[id] ) {
        cart[id] = 0;
    }
    cart[id] = cart[id] + 1;
    saveCart(cart);
    return cart;
}

function setCartAmount(id, amount) {
    const cart = getCart();

    if (amount <= 0) {
        delete cart[id];

    } else {
        cart[id] = amount;
    }

    saveCart(cart);
}
function showBadge(element, count) {
    if (!element) {
        return;
    }
    element.textContent = count;

    if (count == 0) {
        element.style.display = "none";
    } else {
        element.style.display = "inline-flex";

    }
}






