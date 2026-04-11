


function makeNameFromFile(file) {
    let name = file.replace(/\.[^.]+$/, "");
    name = name.replace(/_/g, " ");
    name = name.replace(/-/g," ") ;
    name = name.replace(/\s+/g, " ").trim();


    return name.replace(/\b\w/g, function (letter) {
        return letter.toUpperCase();
    });

}

function makeId(text) {

  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const names = {
    "Tires & Wheels": {
        "alloy.webp": "Alloy Wheels",
        "chains.jpg": "Snow Chains",
        "steel.webp": "Steel Wheels",
        "summer.jpg": "Summer Tires",
        "winter.jpg": "Winter Tires"

    },
    "Brakes": {
        "front_brake_pads.webp": "Front Brake Pads",
        "front_brake_rotors.jfif": "Front Brake Rotors",
        "hardware_kit.webp": "Brake Hardware Kit",
        "rear_brake_pads.webp": "Rear Brake Pads",
        "rear_brake_rotors.jfif": "Rear Brake Rotors"
    },
    "Batteries":  {

        "12v_battery_1.jpg": "12V Battery",
        "12v_battery_2.jpg": "12V Battery",
        "12v_battery_3.jpg": "12V Battery",
        "clamps.jpg": "Battery Clamps",
        "jump_starter.jpg": "Jump Starter"
    },
    "Engine Parts": {
        "block.jpg": "Engine Block",
        "crankshaft.jpg": "Engine Crankshaft",
        "head_gasket.jpg": "Head Gasket",
        "piston.jpg": "Engine Pistons",
        "timing_belt.jpg": "Timing Belt"
    },

    "Exhaust": {
        "muffler.jfif": "Rear Muffler",
        "exhaust_tip.webp": "Exhaust Tip",
        "exhaust_hanger.webp": "Exhaust Hanger",
        "heat_shield_plate.webp": "Heat Shield Plate",
        "exhaust_clamp.webp": "Exhaust Clamp"
    },
    "Filters": {
        "cabin_filter.webp": "Cabin Air Filter",
        "engine_air_filter.webp": "Engine Air Filter",
        "fuel_pump_filter.jpg": "Fuel Pump Filter",
        "oil_filter.jpg": "Oil Filter",
        "transmission_filter.jpg": "Transmission Filter"
    },
    "Ignition":
        {
        "spark_plug.jpg": "Spark Plug",
        "ignition_coil_pack.jpg": "Ignition Coil Pack",
        "distributor_cap.jpg": "Distributor Cap",
        "glow_plug.webp": "Glow Plug",
        "ignition_switch.webp": "Ignition Switch"
    },
    "Interior": {
        "steering_wheel_cover.jpg": "Steering Wheel Cover",
        "shift_knob.jpg": "Shift Knob",
        "seat_covers.webp": "Seat Covers",
        "floor_mats.webp": "Floor Mats",
        "phone_mount.webp": "Phone Mount"
    },

    "Lighting": {
        "brake_light.webp": "Brake Light",
        "front_left_headlight.jpg": "Front Left Headlight",
        "front_right_headlight.jpg": "Front Right Headlight",
        "rear_left_light.webp": "Rear Left Light",
        "rear_right_light.webp": "Rear Right Light"
    },
    "Workshop Tools" :{
        "socket_set.jpg": "Socket Set",
        "torque_wrench.jpg": "Torque Wrench",
        "jack_stands.jpg": "Jack Stands",
        "oil_funnel.avif": "Oil Funnel",
        "carry_tool_kit.webp": "Carry Tool Kit"
    }
};

const catalog = [
    {
        id: "tires-wheels",
        name: "Tires & Wheels",
        folder: "tires_and_wheels",
        banner:"main.jpg",
        text:"Tires, rims, chains and wheel parts for normal everyday driving.",
        items: ["alloy.webp", "chains.jpg", "steel.webp", "summer.jpg", "winter.jpg"],
        prices: [139.00, 34.90, 84.20, 118.90, 124.90]
    },
    {

        id: "brakes",
        name: "Brakes",
        folder: "brakes",
        banner: "main.jpg" ,
        text: "Common brake parts and kits for regular cars.",
        items: ["front_brake_pads.webp", "front_brake_rotors.jfif", "hardware_kit.webp", "rear_brake_pads.webp", "rear_brake_rotors.jfif"],
        prices: [42.90, 57.40, 16.75, 39.80, 53.15]
    },
    {
        id: "batteries",
        name: "Batteries",
        folder: "batteries",
        banner: "main.jpg",
        text: "Battery products and a few useful accessories.",
        items: ["12v_battery_1.jpg", "12v_battery_2.jpg", "12v_battery_3.jpg", "clamps.jpg", "jump_starter.jpg"],
        prices: [129.90, 139.90, 144.60, 14.30, 69.90]

    },
    {
        id: "engine-parts",
        name: "Engine Parts",
        folder: "engine_parts",
        banner: "main.jpg",
        text: "Basic engine components and service parts.",
        items: ["block.jpg","crankshaft.jpg", "head_gasket.jpg", "piston.jpg", "timing_belt.jpg"],
        prices: [149.90, 112.90, 21.40, 34.90, 67.25]
    },

    {
        id: "exhaust",
        name: "Exhaust",
        folder: "exhaust",
        banner: "main.webp",
        text: "Exhaust parts that are common on a normal road car.",
        items: ["muffler.jfif", "exhaust_tip.webp", "exhaust_hanger.webp", "heat_shield_plate.webp", "exhaust_clamp.webp"],
        prices: [119.90, 29.90, 8.50, 19.90, 11.90]
    },
    {
        id: "filters",
        name: "Filters",
        folder: "filters",
        banner: "main.png",
        text: "Air, oil, fuel and transmission filters.",
        items: ["cabin_filter.webp", "engine_air_filter.webp", "fuel_pump_filter.jpg", "oil_filter.jpg", "transmission_filter.jpg"],
        prices: [18.40, 15.90, 12.75, 9.85, 24.90]
    },
    {
        id: "ignition",
        name: "Ignition",
        folder: "ignition",

        banner: "main.jpg",
        text: "Ignition parts for starting and spark delivery.",
        items: ["spark_plug.jpg", "ignition_coil_pack.jpg", "distributor_cap.jpg", "glow_plug.webp", "ignition_switch.webp"],
        prices: [8.99, 79.90, 24.90, 18.50, 49.90]
    },
    {
        id: "interior",
        name: "Interior",
        folder: "interior" ,
        banner: "main.jpg",
        text: "Interior accessories for comfort and daily use.",
        items: ["steering_wheel_cover.jpg", "shift_knob.jpg", "seat_covers.webp", "floor_mats.webp", "phone_mount.webp"],
        prices: [17.40, 24.90, 49.90, 46.75, 19.95]
    },
    {
        id: "lighting",
        name: "Lighting",
        folder: "lighting",
        banner: "main.jpg",
        text: "Front and rear lights for everyday vehicles.",
        items: ["brake_light.webp", "front_left_headlight.jpg", "front_right_headlight.jpg", "rear_left_light.webp", "rear_right_light.webp"],
        prices: [12.50, 54.80, 58.80, 34.90, 36.90]
    },

    {
        id: "tools",
        name: "Workshop Tools",
        folder: "workshop_tools",
        banner: "main.jpg",
        text: "Garage tools for simple repairs and maintenance.",
        items: ["socket_set.jpg", "torque_wrench.jpg", "jack_stands.jpg", "oil_funnel.avif", "carry_tool_kit.webp"],
        prices: [59.90, 74.50, 42.75, 16.90, 29.90]
    }

];

const storeData = {
    website: "Car Partz",
    currency: "USD",
    bannerMessage: "Welcome to your one-stop shop for essential car parts.",
    categories: [ ]
};




for (let i = 0; i < catalog.length; i++) {
    const section = catalog[i];
    const products = [];

    for (let j = 0; j < section.items.length; j++) {
        const file = section.items[j];
        const prettyNames = names[section.name] || {};
        const itemName = prettyNames[file] || makeNameFromFile(file) ;

       products.push({
            id: section.id + "-" + makeId(file),
            name: itemName,
            image: "assets/images/" + section.folder + "/" + file,

            price: section.prices[j]
        } );
    }


   storeData.categories.push({
        id: section.id,
        name: section.name,
        image:"assets/images/"+ section.folder + "/"+ section.banner,
        description: section.text,
        products: products
    });
}


