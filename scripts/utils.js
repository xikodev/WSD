const cartKey = "car-parts-cart";
const categoryMetaMap = {
    "Tires & Wheels": {
        id: "tires-wheels",
        folder: "tires_and_wheels",
        description: "Tires, rims, chains and wheel parts for normal everyday driving."
    },
    "Brakes": {
        id: "brakes",
        folder: "brakes",
        description: "Common brake parts and kits for regular cars."
    },
    "Batteries": {
        id: "batteries",
        folder: "batteries",
        description: "Battery products and a few useful accessories."
    },
    "Engine Parts": {
        id: "engine-parts",
        folder: "engine_parts",
        description: "Basic engine components and service parts."
    },
    "Exhaust": {
        id: "exhaust",
        folder: "exhaust",
        description: "Exhaust parts that are common on a normal road car."
    },
    "Filters": {
        id: "filters",
        folder: "filters",
        description: "Air, oil, fuel and transmission filters."
    },
    "Ignition": {
        id: "ignition",
        folder: "ignition",
        description: "Ignition parts for starting and spark delivery."
    },
    "Interior": {
        id: "interior",
        folder: "interior",
        description: "Interior accessories for comfort and daily use."
    },
    "Lighting": {
        id: "lighting",
        folder: "lighting",
        description: "Front and rear lights for everyday vehicles."
    },
    "Workshop Tools": {
        id: "tools",
        folder: "workshop_tools",
        description: "Garage tools for simple repairs and maintenance."
    }
};

function slugifyText(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function pickCategoryMeta(name) {
    return categoryMetaMap[name] || {
        id: slugifyText(name),
        folder: slugifyText(name).replace(/-/g, "_"),
        description: ""
    };
}

function buildCatalog() {
    const catalog = [];

    for (let i = 0; i < data.categories.length; i++) {
        const category = data.categories[i];
        const meta = pickCategoryMeta(category.name);
        const products = [];

        for (let j = 0; j < category.products.length; j++) {
            const product = category.products[j];

            products.push({
                id: meta.id + "-" + slugifyText(product.image),
                name: product.name,
                image: "assets/images/" + meta.folder + "/" + product.image
            });
        }

        catalog.push({
            id: meta.id,
            name: category.name,
            image: "assets/images/" + meta.folder + "/" + category.image,
            description: meta.description,
            products: products
        });
    }

    return catalog;
}

function flattenProducts() {
    const catalog = buildCatalog();
    const products = [];

    for (let i = 0; i < catalog.length; i++) {
        const category = catalog[i];

        for (let j = 0; j < category.products.length; j++) {
            products.push({
                id: category.products[j].id,
                name: category.products[j].name,
                image: category.products[j].image,
                categoryName: category.name
            });
        }
    }

    return products;
}

function readCart() {
    const saved = localStorage.getItem(cartKey);

    if (!saved) {
        return {};
    }

    try {
        const cart = JSON.parse(saved);
        const validProducts = flattenProducts();
        const validIds = {};
        const cleanCart = {};

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


function writeCart(cart) {

    localStorage.setItem(cartKey, JSON.stringify(cart));
}


function countCartItems() {
    return Object.values(readCart()).reduce(function (total, amount) {
        return total + amount;
    }, 0);
}

function bumpCartItem(id) {
    const cart = readCart();

    if (!cart[id]) {
        cart[id] = 0;
    }
    cart[id] = cart[id] + 1;
    writeCart(cart);
    return cart;
}

function setItemCount(id, amount) {
    const cart = readCart();

    if (amount <= 0) {
        delete cart[id];

    } else {
        cart[id] = amount;
    }

    writeCart(cart);
}

function syncBadge(element, count) {
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




