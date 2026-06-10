const data = {
    website: "Car Partz",
    categories: [
        {
            name: "Tires & Wheels",
            image: "main.jpg",
            products: [
                { name: "Alloy Wheels", image: "alloy.webp" },
                { name: "Snow Chains", image: "chains.jpg" },
                { name: "Steel Wheels", image: "steel.webp" },
                { name: "Summer Tires", image: "summer.jpg" },
                { name: "Winter Tires", image: "winter.jpg" }
            ]
        },
        {
            name: "Brakes",
            image: "main.jpg",
            products: [
                { name: "Front Brake Pads", image: "front_brake_pads.webp" },
                { name: "Front Brake Rotors", image: "front_brake_rotors.jfif" },
                { name: "Brake Hardware Kit", image: "hardware_kit.webp" },
                { name: "Rear Brake Pads", image: "rear_brake_pads.webp" },
                { name: "Rear Brake Rotors", image: "rear_brake_rotors.jfif" }
            ]
        },
        {
            name: "Batteries",
            image: "main.jpg",
            products: [
                { name: "12V Battery", image: "12v_battery_1.jpg" },
                { name: "12V Battery", image: "12v_battery_2.jpg" },
                { name: "12V Battery", image: "12v_battery_3.jpg" },
                { name: "Battery Clamps", image: "clamps.jpg" },
                { name: "Jump Starter", image: "jump_starter.jpg" }
            ]
        },
        {
            name: "Engine Parts",
            image: "main.jpg",
            products: [
                { name: "Engine Block", image: "block.jpg" },
                { name: "Engine Crankshaft", image: "crankshaft.jpg" },
                { name: "Head Gasket", image: "head_gasket.jpg" },
                { name: "Engine Pistons", image: "piston.jpg" },
                { name: "Timing Belt", image: "timing_belt.jpg" }
            ]
        },
        {
            name: "Exhaust",
            image: "main.webp",
            products: [
                { name: "Rear Muffler", image: "muffler.jfif" },
                { name: "Exhaust Tip", image: "exhaust_tip.webp" },
                { name: "Exhaust Hanger", image: "exhaust_hanger.webp" },
                { name: "Heat Shield Plate", image: "heat_shield_plate.webp" },
                { name: "Exhaust Clamp", image: "exhaust_clamp.webp" }
            ]
        },
        {
            name: "Filters",
            image: "main.png",
            products: [
                { name: "Cabin Air Filter", image: "cabin_filter.webp" },
                { name: "Engine Air Filter", image: "engine_air_filter.webp" },
                { name: "Fuel Pump Filter", image: "fuel_pump_filter.jpg" },
                { name: "Oil Filter", image: "oil_filter.jpg" },
                { name: "Transmission Filter", image: "transmission_filter.jpg" }
            ]
        },
        {
            name: "Ignition",
            image: "main.jpg",
            products: [
                { name: "Spark Plug", image: "spark_plug.jpg" },
                { name: "Ignition Coil Pack", image: "ignition_coil_pack.jpg" },
                { name: "Distributor Cap", image: "distributor_cap.jpg" },
                { name: "Glow Plug", image: "glow_plug.webp" },
                { name: "Ignition Switch", image: "ignition_switch.webp" }
            ]
        },
        {
            name: "Interior",
            image: "main.jpg",
            products: [
                { name: "Steering Wheel Cover", image: "steering_wheel_cover.jpg" },
                { name: "Shift Knob", image: "shift_knob.jpg" },
                { name: "Seat Covers", image: "seat_covers.webp" },
                { name: "Floor Mats", image: "floor_mats.webp" },
                { name: "Phone Mount", image: "phone_mount.webp" }
            ]
        },
        {
            name: "Lighting",
            image: "main.jpg",
            products: [
                { name: "Brake Light", image: "brake_light.webp" },
                { name: "Front Left Headlight", image: "front_left_headlight.jpg" },
                { name: "Front Right Headlight", image: "front_right_headlight.jpg" },
                { name: "Rear Left Light", image: "rear_left_light.webp" },
                { name: "Rear Right Light", image: "rear_right_light.webp" }
            ]
        },
        {
            name: "Workshop Tools",
            image: "main.jpg",
            products: [
                { name: "Socket Set", image: "socket_set.jpg" },
                { name: "Torque Wrench", image: "torque_wrench.jpg" },
                { name: "Jack Stands", image: "jack_stands.jpg" },
                { name: "Oil Funnel", image: "oil_funnel.avif" },
                { name: "Carry Tool Kit", image: "carry_tool_kit.webp" }
            ]
        }
    ]
};

const categoryMetaMap = {
    "Tires & Wheels": {
        id: "tires-wheels",
        folder: "tires_and_wheels",
        description: "Tires, rims, chains and wheel parts for normal everyday driving."
    },
    Brakes: {
        id: "brakes",
        folder: "brakes",
        description: "Common brake parts and kits for regular cars."
    },
    Batteries: {
        id: "batteries",
        folder: "batteries",
        description: "Battery products and a few useful accessories."
    },
    "Engine Parts": {
        id: "engine-parts",
        folder: "engine_parts",
        description: "Basic engine components and service parts."
    },
    Exhaust: {
        id: "exhaust",
        folder: "exhaust",
        description: "Exhaust parts that are common on a normal road car."
    },
    Filters: {
        id: "filters",
        folder: "filters",
        description: "Air, oil, fuel and transmission filters."
    },
    Ignition: {
        id: "ignition",
        folder: "ignition",
        description: "Ignition parts for starting and spark delivery."
    },
    Interior: {
        id: "interior",
        folder: "interior",
        description: "Interior accessories for comfort and daily use."
    },
    Lighting: {
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
    return data.categories.map(function (category) {
        const meta = pickCategoryMeta(category.name);
        const products = category.products.map(function (product) {
            return {
                id: meta.id + "-" + slugifyText(product.image),
                name: product.name,
                image: "/images/" + meta.folder + "/" + product.image,
                categoryId: meta.id,
                categoryName: category.name
            };
        });

        return {
            id: meta.id,
            name: category.name,
            image: "/images/" + meta.folder + "/" + category.image,
            description: meta.description,
            products: products
        };
    });
}

function getCategories() {
    return buildCatalog().map(function (category) {
        return {
            id: category.id,
            name: category.name,
            image: category.image,
            description: category.description
        };
    });
}

function getProducts(categoryId) {
    const category = buildCatalog().find(function (item) {
        return item.id === categoryId;
    });

    return category ? category.products : [];
}

function getAllProducts() {
    return buildCatalog().flatMap(function (category) {
        return category.products;
    });
}

function findProductById(id) {
    return getAllProducts().find(function (product) {
        return product.id === id;
    });
}

module.exports = {
    data,
    buildCatalog,
    findProductById,
    getAllProducts,
    getCategories,
    getProducts
};
