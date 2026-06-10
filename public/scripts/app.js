const categoryList = document.getElementById("category-list");
const activeTitle = document.getElementById("active-category-name");
const heroTitle = document.getElementById("banner-heading");
const heroText = document.getElementById("banner-description");
const heroImage = document.getElementById("banner-image");

const productMount = document.getElementById("product-grid");
const cartBadge = document.getElementById("cart-badge");

let catalog = [];
let selectedCategory = null;
let currentCart = {
    items: [],
    total: 0
};

function renderCategoryTabs() {
    categoryList.innerHTML = "";

    for (let i = 0; i < catalog.length; i++) {
        const category = catalog[i];
        const li = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.className = "category-button";
        button.textContent = category.name;
        button.dataset.categoryId = category.id;

        if (category.id === selectedCategory.id) {
            button.classList.add("active");
        }
        li.appendChild(button);
        categoryList.appendChild(li);
    }
}


function buildProductCard(product) {
    const amountInCart = findCartQuantity(currentCart, product.id);
    const card = document.createElement("article");

    card.className = "product-card catalogCard";
    card.innerHTML = `
        <div class="product-image-wrap productShot">
            <img src="${product.image}" alt="${product.name}">
            <button class="product-overlay-button quick-add" type="button" aria-label="Add ${product.name} to cart">
                <span aria-hidden="true">&#128722;</span>
            </button>
            <span class="product-quantity-badge qtyBadge ${amountInCart > 0 ? "show" : ""}">${amountInCart}</span>
        </div>
        <div class="product-meta cardMeta">
            <h3>${product.name}</h3>
            <p class="product-category cardCategory">${selectedCategory.name}</p>
        </div>
    `;

    const addButton = card.querySelector(".product-overlay-button");
    const amountBadge = card.querySelector(".product-quantity-badge");
    addButton.addEventListener("click", async function () {
        currentCart = await fetchJson("/cart/add/" + encodeURIComponent(product.id));
        const newAmount = findCartQuantity(currentCart, product.id);
        amountBadge.textContent = newAmount;
        if (newAmount > 0) {
            amountBadge.classList.add("show");
        }

        syncBadge(cartBadge, countCartItems(currentCart));
    });

    return card;
}

function renderProducts() {
    productMount.innerHTML = "";

    for (let i = 0; i < selectedCategory.products.length; i++) {
        productMount.appendChild(buildProductCard(selectedCategory.products[i]));
    }
}

function paintHome() {
    if (!selectedCategory) {
        return;
    }

    activeTitle.textContent = selectedCategory.name;
    heroTitle.textContent = selectedCategory.name;
    heroText.textContent = selectedCategory.description;
    heroImage.src = selectedCategory.image;
    heroImage.alt = selectedCategory.name;

    renderCategoryTabs();
    renderProducts();

    syncBadge(cartBadge, countCartItems(currentCart));
}

async function loadProducts(category) {
    const products = await fetchJson("/home/getProducts/" + encodeURIComponent(category.id));
    selectedCategory = {
        ...category,
        products: products
    };
    paintHome();
}

async function initHome() {
    catalog = await fetchJson("/home/getCategories");
    currentCart = await getCart();

    if (catalog.length > 0) {
        await loadProducts(catalog[0]);
    }
}

categoryList.addEventListener("click", async function (event) {
    const button = event.target.closest("button[data-category-id]");

    if (!button) {
        return;
    }

    const category = catalog.find(function (item) {
        return item.id === button.dataset.categoryId;
    });

    if (category) {
        await loadProducts(category);
    }
});

window.addEventListener("focus", async function () {
    currentCart = await getCart();
    paintHome();
});
window.addEventListener("pageshow", initHome);
