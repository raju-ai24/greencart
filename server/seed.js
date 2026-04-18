import 'dotenv/config';
import mongoose from "mongoose";
import Product from "./models/Product.js";

const sampleProducts = [
  {
    name: "Carrot 500g",
    description: ["Sweet and crunchy", "Good for eyesight", "Ideal for juices and salads"],
    price: 50,
    offerPrice: 44,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1750961363/t69b4k6ckt3dmgnpnps8.png"],
    category: "Vegetables",
    inStock: true
  },
  {
    name: "Potato 500g",
    description: ["Fresh and organic", "Rich in carbohydrates", "Ideal for curries and fries"],
    price: 40,
    offerPrice: 35,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052053/vn4xwsp2d1gfa3fvgsqr.png", "https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052053/kzdkhwj6knnptsriczp2.png", "https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052053/mew8yidt5kf0x2nwnavy.png", "https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052053/cyquv7dz5igea0ivjbwl.png"],
    category: "Vegetables",
    inStock: true
  },
  {
    name: "Tomato 1 kg",
    description: ["Juicy and ripe", "Rich in Vitamin C", "Perfect for salads and sauces", "Farm fresh quality"],
    price: 30,
    offerPrice: 28,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052224/tkhsqmj3tqrsmbh3n8qq.png", "https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052224/xl6gyl3rzuz6mm2o13wq.png"],
    category: "Vegetables",
    inStock: true
  },
  {
    name: "Spinach 500g",
    description: ["Rich in iron", "High in vitamins", "Perfect for soups and salads"],
    price: 18,
    offerPrice: 15,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052533/w5nu7kef4pf5oord9vbj.png"],
    category: "Vegetables",
    inStock: true
  },
  {
    name: "Onion 500g",
    description: ["Fresh and pungent", "Perfect for cooking", "A kitchen staple"],
    price: 50,
    offerPrice: 45,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052590/vz2rohdszkvh5cbf5y3b.png"],
    category: "Vegetables",
    inStock: true
  },
  {
    name: "Apple 1 kg",
    description: ["Boosts immunity", "Rich in fiber"],
    price: 100,
    offerPrice: 90,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052653/tn0whmkanq6wfegnh3na.png"],
    category: "Fruits",
    inStock: true
  },
  {
    name: "Orange 1 kg",
    description: ["Juicy and sweet", "Rich in Vitamin C", "Perfect for juices and salads"],
    price: 80,
    offerPrice: 75,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052738/or7ovaotmxshwl1hfqho.png"],
    category: "Fruits",
    inStock: true
  },
  {
    name: "Banana 1 kg",
    description: ["Sweet and ripe", "High in potassium", "Great for smoothies and snacking"],
    price: 50,
    offerPrice: 45,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052778/qkr0rt7tublt0gxgln9r.png"],
    category: "Fruits",
    inStock: true
  },
  {
    name: "Mango 1 kg",
    description: ["Sweet and flavorful", "Perfect for smoothies and desserts", "Rich in Vitamin A"],
    price: 150,
    offerPrice: 140,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052819/rrpfbyc8m2tdnef4pmtt.png"],
    category: "Fruits",
    inStock: true
  },
  {
    name: "Grapes 500g",
    description: ["Fresh and juicy", "Rich in antioxidants", "Perfect for snacking and fruit salads"],
    price: 70,
    offerPrice: 65,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052858/ttsmpzeyv7px68intdth.png"],
    category: "Fruits",
    inStock: true
  },
  {
    name: "Coca-Cola 1.5L",
    description: ["Coca-Cola 1.5", "Perfect for parties and gatherings", "Best served chilled"],
    price: 80,
    offerPrice: 75,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052917/th0s9uvhkysihnzhyshw.png"],
    category: "Drinks",
    inStock: true
  },
  {
    name: "Sprite 1.5L",
    description: ["Chilled and refreshing", "Perfect for celebrations", "Best served cold"],
    price: 75,
    offerPrice: 60,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752052959/esggcsvllyyp8vzzs23j.png"],
    category: "Drinks",
    inStock: true
  },
  {
    name: "7 Up 1.5L",
    description: ["Refreshing lemon-lime flavor", "Perfect for refreshing", "Best served chilled"],
    price: 76,
    offerPrice: 70,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053022/aosurm8fxnyst0dfsxrj.png"],
    category: "Drinks",
    inStock: true
  },
  {
    name: "Maggi Noodles 280g",
    description: ["Instant and easy to cook", "Delicious taste", "Popular among kids and adults"],
    price: 55,
    offerPrice: 50,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053187/kvgqbqh88vbabshdcpca.png"],
    category: "Instant",
    inStock: true
  },
  {
    name: "Knorr Cup Soup 70g",
    description: ["Convenient for on-the-go", "Healthy and nutritious", "Variety of flavors"],
    price: 35,
    offerPrice: 30,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053228/vnowidiagdsv7vamyxyq.png"],
    category: "Instant",
    inStock: true
  },
  {
    name: "Amul Milk 1L",
    description: ["Boosts immunity", "Rich in fiber"],
    price: 60,
    offerPrice: 55,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053286/pll0rxh8ozzhkywtix6m.png"],
    category: "Dairy",
    inStock: true
  },
  {
    name: "Paneer 200g",
    description: ["Soft and fresh", "Rich in protein", "Ideal for curries and snacks"],
    price: 90,
    offerPrice: 85,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053392/sztzudq9agenecnmavvl.png", "https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053392/uuxhohxuo1lon0a4hfxa.png"],
    category: "Dairy",
    inStock: true
  },
  {
    name: "Eggs 12 pcs",
    description: ["Farm fresh", "Rich in protein", "Ideal for breakfast and baking"],
    price: 90,
    offerPrice: 85,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053443/anocjrdkblzetlvwwyzr.png"],
    category: "Dairy",
    inStock: true
  },
  {
    name: "Cheese 200g",
    description: ["Creamy and delicious", "Perfect for pizzas and sandwiches", "Rich in calcium"],
    price: 140,
    offerPrice: 130,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053484/mketcidnbgznqsaao7le.png"],
    category: "Dairy",
    inStock: true
  },
  {
    name: "Brown Bread 400g",
    description: ["Soft and healthy", "Made from whole wheat", "Ideal for breakfast and sandwiches"],
    price: 40,
    offerPrice: 35,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053616/dzkuexr9ttuumt1xg2bn.png", "https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053616/dvw36iueij9trshin3fd.png"],
    category: "Bakery",
    inStock: true
  },
  {
    name: "Butter Croissant 100g",
    description: ["Flaky and buttery", "Freshly baked", "Perfect for breakfast or snacks"],
    price: 50,
    offerPrice: 45,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053672/c4dvqjc6jdk9fqdzdpjh.png"],
    category: "Bakery",
    inStock: true
  },
  {
    name: "Basmati Rice 5kg",
    description: ["Long grain and aromatic", "Perfect for biryani and pulao", "Premium quality"],
    price: 550,
    offerPrice: 520,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053721/ebixrwwc2gttvbqyjur5.png"],
    category: "Grains",
    inStock: true
  },
  {
    name: "Wheat Flour 5kg",
    description: ["High-quality whole wheat", "Soft and fluffy rotis", "Rich in nutrients"],
    price: 250,
    offerPrice: 230,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053758/rxons9gs49igxgucgrmi.png"],
    category: "Grains",
    inStock: true
  },
  {
    name: "Organic Quinoa 500g",
    description: ["High in protein and fiber", "Gluten-free", "Rich in vitamins and minerals"],
    price: 450,
    offerPrice: 420,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053827/pyhnvbwyzeubhg3q6d5n.png"],
    category: "Grains",
    inStock: true
  },
  {
    name: "Brown Rice 1kg",
    description: ["Whole grain and nutritious", "Helps in weight management", "Good source of magnesium"],
    price: 120,
    offerPrice: 110,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053884/wkqrrt5ef5osh2pzuslc.png"],
    category: "Grains",
    inStock: true
  },
  {
    name: "Barley 1kg",
    description: ["Rich in fiber", "Helps improve digestion", "Low in fat and cholesterol"],
    price: 150,
    offerPrice: 140,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752053924/i7acpddttztqxujmqrnu.png"],
    category: "Grains",
    inStock: true
  },
  {
    name: "Fanta 1.5L",
    description: ["Sweet and fizzy", "Great for parties and gatherings", "Best served cold"],
    price: 70,
    offerPrice: 65,
    image: ["https://res.cloudinary.com/dpk3ipvcf/image/upload/v1752993559/nkdakogtowwxkiosvd3n.png"],
    category: "Drinks",
    inStock: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(sampleProducts);
    console.log("Sample products added successfully");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
