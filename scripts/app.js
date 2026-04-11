
const categoryList = document.getElementById("category-list");
const categoryTitle = document.getElementById("active-category-name");
const bannerTitle = document.getElementById("banner-heading");
const bannerText = document.getElementById("banner-description");
const bannerImage = document.getElementById("banner-image");

const productGrid = document.getElementById("product-grid");
const cartBadge = document.getElementById("cart-badge");

let currentCategory = storeData.categories[0];



function updateBadgeOnHome() {
   const total = getCartCount();
   showBadge(cartBadge, total);
}

function drawCategoryButtons() {
    categoryList.innerHTML = "";

    for (let i = 0; i < storeData.categories.length; i++) {

        const category = storeData.categories[i];
        const li = document.createElement("li");
        const  button = document.createElement("button") ;

        button.type = "button";
        button.className = "category-button";
        button.textContent = category.name;

        if (category.id === currentCategory.id) {
         button.classList.add("active");
        }
        button.addEventListener("click", function () {
            currentCategory= category;
            drawPage();
            });
        li.appendChild(button);
        categoryList.appendChild(li);
    }
}



function makeCard(product) {
    const amountInCart = getCart()[product.id] || 0 ;
    const card = document.createElement("article");

    card.className = "product-card";
    card.innerHTML = `
        <div class="product-image-wrap">
            <img src="${product.image}" alt="${product.name}">
            <button class="product-overlay-button" type="button" aria-label="Add ${product.name} to cart">
                <span aria-hidden="true">&#128722;</span>
            </button>
            <span class="product-quantity-badge ${amountInCart > 0 ? "show" : ""}">${amountInCart}</span>
        </div>
        <div class="product-meta">
            <h3>${product.name}</h3>
            <p class="product-category">${currentCategory.name}</p>
            <p class="product-price">${formatPrice(product.price)}</p>
        </div>
    `;

    const addButton =  card.querySelector(".product-overlay-button");
    const amountBadge = card.querySelector(".product-quantity-badge" );
    addButton.addEventListener("click", function () {
        const cart = addToCart( product.id );
        const newAmount = cart[product.id] || 0;
        amountBadge.textContent = newAmount;
        if (newAmount > 0 ) {
            amountBadge.classList.add("show");
        }

        updateBadgeOnHome();
    });

    return card;
}
function drawProducts() {
    productGrid.innerHTML = "";

    for (let i = 0; i < currentCategory.products.length; i++) {
        productGrid.appendChild(makeCard(currentCategory.products[i]));
    }
}

function drawPage() {
    categoryTitle.textContent =  currentCategory.name ;
    bannerTitle.textContent = currentCategory.name;
    bannerText.textContent = currentCategory.description;
    bannerImage.src = currentCategory.image;
    bannerImage.alt = currentCategory.name;

    drawCategoryButtons();
    drawProducts();

    updateBadgeOnHome();
}

function refreshHomePage() {
    drawPage();
}
window.addEventListener("storage",refreshHomePage);
window.addEventListener("focus", refreshHomePage );
window.addEventListener("pageshow", refreshHomePage);
drawPage();
