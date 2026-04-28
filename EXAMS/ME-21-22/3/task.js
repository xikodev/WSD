// Already provided by the task description. The solution uses only this loader.
async function LoadData(fileName) {
    let promise = await fetch(fileName);
    if (!promise.ok) {
        throw new Error("Cannot load json file");
    } else {
        return await promise.json();
    }
}

async function printCategoryWithMostProducts() {
    const [categories, products] = await Promise.all([
        LoadData("categories.json"),
        LoadData("products.json")
    ]);

    const totalsByCategoryId = new Map();
    const namesByCategoryId = new Map();

    // Every known category starts with 0 so categories without products are still included.
    for (const category of categories) {
        namesByCategoryId.set(category.CategoryId, category.CategoryName);
        totalsByCategoryId.set(category.CategoryId, 0);
    }

    for (const product of products) {
        // Products with unknown category ids are ignored by task requirement.
        if (!totalsByCategoryId.has(product.CategoryId)) {
            continue;
        }

        const currentTotal = totalsByCategoryId.get(product.CategoryId);
        totalsByCategoryId.set(product.CategoryId, currentTotal + product.NumProd);
    }

    let bestCategoryId = null;
    let bestTotal = -1;

    // Find the category with the greatest accumulated NumProd value.
    for (const [categoryId, total] of totalsByCategoryId.entries()) {
        if (total > bestTotal) {
            bestCategoryId = categoryId;
            bestTotal = total;
        }
    }

    const categoryName = namesByCategoryId.get(bestCategoryId);
    console.log(`Category with most products: ${categoryName} - ${bestTotal}`);
}

// All errors are handled in one main catch block, exactly as requested.
printCategoryWithMostProducts().catch(() => {
    console.log("An error has occured and program stopped working");
});
