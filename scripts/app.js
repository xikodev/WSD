const categoryList = document.getElementById("category-list");
const activeTitle = document.getElementById("active-category-name");
const heroTitle = document.getElementById("banner-heading");
const heroText = document.getElementById("banner-description");
const heroImage = document.getElementById("banner-image");

const productMount = document.getElementById("product-grid");
const cartBadge = document.getElementById("cart-badge");
const catalog = buildCatalog();

let selectedCategory = catalog[0];

function renderCategoryTabs() {
    categoryList.innerHTML = "";

    for (let i = 0; i < catalog.length; i++) {
        const category = catalog[i];
        const li = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.className = "category-button";
        button.textContent = category.name;

        if (category.id === selectedCategory.id) {
            button.classList.add("active");
        }
        button.addEventListener("click", function () {
            selectedCategory = category;
            paintHome();
        });
        li.appendChild(button);
        categoryList.appendChild(li);
    }
}


function buildProductCard(product) {
    const amountInCart = readCart()[product.id] || 0;
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
    addButton.addEventListener("click", function () {
        const cart = bumpCartItem(product.id);
        const newAmount = cart[product.id] || 0;
        amountBadge.textContent = newAmount;
        if (newAmount > 0) {
            amountBadge.classList.add("show");
        }

        syncBadge(cartBadge, countCartItems());
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
    activeTitle.textContent = selectedCategory.name;
    heroTitle.textContent = selectedCategory.name;
    heroText.textContent = selectedCategory.description;
    heroImage.src = selectedCategory.image;
    heroImage.alt = selectedCategory.name;

    renderCategoryTabs();
    renderProducts();

    syncBadge(cartBadge, countCartItems());
}

window.addEventListener("storage", paintHome);
window.addEventListener("focus", paintHome);
window.addEventListener("pageshow", paintHome);
paintHome();
