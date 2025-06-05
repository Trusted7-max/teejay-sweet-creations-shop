import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart } from "lucide-react";

// Product categories
const categories = [
  { id: "all", name: "All Products" },
  { id: "cakes", name: "Cakes" },
  { id: "bento-cakes", name: "Bento Cakes" },
  { id: "cupcakes", name: "Cupcakes" },
  { id: "cookies", name: "Cookies" },
  { id: "pastries", name: "Pastries" },
  { id: "cold-desserts", name: "Cold Desserts" },
  { id: "hot-desserts", name: "Hot Desserts" },
  { id: "treats", name: "Treats" },
  { id: "scones", name: "Scones" },
];

// Sample products with new categories
const products = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    price: "$35.00",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cakes",
    availability: "In Stock",
  },
  {
    id: 2,
    name: "Red Velvet Cupcakes (Box of 6)",
    price: "$18.00",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cupcakes",
    availability: "In Stock",
  },
  {
    id: 3,
    name: "Chocolate Chip Cookies (Dozen)",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cookies",
    availability: "In Stock",
  },
  {
    id: 4,
    name: "Strawberry Cheesecake",
    price: "$32.00",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cakes",
    availability: "In Stock",
  },
  {
    id: 5,
    name: "Vanilla Bean Cupcakes (Box of 6)",
    price: "$18.00",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cupcakes",
    availability: "In Stock",
  },
  {
    id: 6,
    name: "Almond Croissants (2 pack)",
    price: "$8.50",
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastries",
    availability: "In Stock",
  },
  {
    id: 7,
    name: "Birthday Cake",
    price: "$42.00",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cakes",
    availability: "In Stock",
  },
  {
    id: 8,
    name: "Macaron Collection (Box of 12)",
    price: "$24.00",
    image: "https://images.unsplash.com/photo-1612201142855-7873bc1661b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cookies",
    availability: "Limited Stock",
  },
  {
    id: 9,
    name: "Pain au Chocolat (2 pack)",
    price: "$7.50",
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "pastries",
    availability: "In Stock",
  },
  {
    id: 10,
    name: "Strawberry Bento Cake",
    price: "$15.00",
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "bento-cakes",
    availability: "In Stock",
  },
  {
    id: 11,
    name: "Chocolate Bento Cake",
    price: "$15.00",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "bento-cakes",
    availability: "In Stock",
  },
  {
    id: 12,
    name: "Tiramisu",
    price: "$8.50",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cold-desserts",
    availability: "In Stock",
  },
  {
    id: 13,
    name: "Panna Cotta",
    price: "$7.00",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "cold-desserts",
    availability: "In Stock",
  },
  {
    id: 14,
    name: "Warm Apple Crumble",
    price: "$9.50",
    image: "https://images.unsplash.com/photo-1464219222984-216ebffaaf85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "hot-desserts",
    availability: "In Stock",
  },
  {
    id: 15,
    name: "Chocolate Lava Cake",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "hot-desserts",
    availability: "In Stock",
  },
  {
    id: 16,
    name: "Chocolate Truffles (Box of 6)",
    price: "$16.00",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "treats",
    availability: "In Stock",
  },
  {
    id: 17,
    name: "Fruit Tarts (Box of 4)",
    price: "$14.00",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "treats",
    availability: "In Stock",
  },
  {
    id: 18,
    name: "Classic Scones (Box of 4)",
    price: "$10.00",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "scones",
    availability: "In Stock",
  },
  {
    id: 19,
    name: "Cranberry Orange Scones (Box of 4)",
    price: "$11.00",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "scones",
    availability: "In Stock",
  },
];

export default function Store() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (productId: number) => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="page-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-bakery-dark mb-4">Our Store</h1>
        <p className="text-lg text-bakery-dark max-w-2xl mx-auto">
          Browse our selection of freshly baked goods available for purchase in-store or online.
        </p>
      </div>

      {/* Featured Products Banner */}
      <div className="relative mb-12 overflow-hidden rounded-lg bg-gradient-to-r from-bakery-pink to-bakery-red h-64">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-8 md:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Weekly Specials</h2>
            <p className="text-white text-lg mb-6 max-w-lg">
              Check out our featured products and seasonal offerings at special prices!
            </p>
            <Button asChild className="bg-white text-bakery-red hover:bg-bakery-cream">
              <Link to="/store/specials">View Specials</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Categories */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
        <div className="flex justify-center mb-8 overflow-x-auto">
          <TabsList className="bg-bakery-cream flex-wrap h-auto p-1">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-bakery-pink data-[state=active]:text-white whitespace-nowrap"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* All Products */}
        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden cake-card-shadow hover-scale">
                <div className="aspect-square bg-bakery-cream relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      product.availability === "In Stock" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {product.availability}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-bakery-dark">{product.name}</h3>
                    <span className="font-bold text-bakery-red">{product.price}</span>
                  </div>
                  <div className="mt-4">
                    <Button 
                      onClick={() => handleAddToCart(product.id)} 
                      className="w-full bg-bakery-red hover:bg-bakery-pink text-white"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Ordering Information */}
      <section className="mt-16 bg-bakery-cream rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-bakery-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Easy Ordering</h3>
            <p className="text-bakery-dark">
              Order online for pickup or local delivery within our service area.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-bakery-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Fresh Daily</h3>
            <p className="text-bakery-dark">
              All our products are freshly baked each morning for maximum quality.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-bakery-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
            <p className="text-bakery-dark">
              We stand behind the quality of our products with a satisfaction guarantee.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-center">Ordering Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-2">Pickup Orders</h4>
              <ul className="list-disc list-inside space-y-1 text-bakery-dark">
                <li>Available during regular business hours</li>
                <li>Order at least 1 day in advance for specialty items</li>
                <li>Same-day pickup available for select items (subject to availability)</li>
                <li>Please bring your order confirmation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-2">Delivery Orders</h4>
              <ul className="list-disc list-inside space-y-1 text-bakery-dark">
                <li>Available within a 15-mile radius of our store</li>
                <li>$10 delivery fee for standard orders</li>
                <li>Free delivery for orders over $75</li>
                <li>Delivery timeframes: 9am-12pm or 1pm-4pm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
