
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cake, CakeSlice, Calendar } from "lucide-react";

const categories = [
  { name: "Birthday Cakes", image: "/placeholder.svg", path: "/gallery/birthday" },
  { name: "Wedding Cakes", image: "/placeholder.svg", path: "/gallery/wedding" },
  { name: "Graduation Cakes", image: "/placeholder.svg", path: "/gallery/graduation" },
  { name: "Anniversary Cakes", image: "/placeholder.svg", path: "/gallery/anniversary" },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    image: "/placeholder.svg",
    quote: "The birthday cake for my daughter was absolutely perfect! Not only did it look amazing, but it tasted delicious too. Thank you Teejay Bakehouse!",
  },
  {
    name: "Michael Rodriguez",
    image: "/placeholder.svg",
    quote: "Our wedding cake exceeded all expectations. The design was exactly what we wanted, and our guests couldn't stop raving about how good it tasted.",
  },
  {
    name: "Emily Thompson",
    image: "/placeholder.svg",
    quote: "I've ordered several celebration cakes from Teejay Bakehouse and they never disappoint. Their attention to detail is incredible!",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-white to-bakery-cream min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-bakery-dark">
                Delicious Custom <span className="text-bakery-red">Cakes</span> for Every Occasion
              </h1>
              <p className="text-lg md:text-xl text-bakery-dark max-w-lg">
                At Teejay Bakehouse, we create beautiful, delicious cakes that make your special moments unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-bakery-red hover:bg-bakery-pink text-white">
                  <Link to="/order">Order Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-bakery-pink text-bakery-pink hover:bg-bakery-pink hover:text-white">
                  <Link to="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-bakery-pink rounded-full opacity-10"></div>
                <img
                  src="/placeholder.svg"
                  alt="Beautiful custom cake"
                  className="relative z-10 rounded-lg shadow-lg max-w-md animate-float"
                />
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-bakery-red rounded-full opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Our Cake Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to={category.path} className="block group">
                <div className="overflow-hidden rounded-lg cake-card-shadow bg-white hover-scale">
                  <div className="h-64 bg-bakery-cream">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center border-t border-bakery-pink/20">
                    <h3 className="text-xl font-bold text-bakery-dark">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="bg-bakery-red hover:bg-bakery-pink text-white">
              <Link to="/gallery">Explore All Cakes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-bakery-cream">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <CakeSlice className="mx-auto h-12 w-12 text-bakery-pink mb-4" />
                <h3 className="text-xl font-bold mb-2">Choose Your Cake</h3>
                <p className="text-bakery-dark">
                  Browse our gallery and select from our signature designs or request a custom creation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Calendar className="mx-auto h-12 w-12 text-bakery-pink mb-4" />
                <h3 className="text-xl font-bold mb-2">Place Your Order</h3>
                <p className="text-bakery-dark">
                  Submit your order with your preferred flavors, size, and pickup or delivery date.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 text-center">
                <Cake className="mx-auto h-12 w-12 text-bakery-pink mb-4" />
                <h3 className="text-xl font-bold mb-2">Enjoy Your Cake</h3>
                <p className="text-bakery-dark">
                  We'll create your perfect cake for your special occasion, ready for pickup or delivery.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-bakery-dark">{testimonial.name}</h3>
                      <div className="flex text-yellow-400">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                      </div>
                    </div>
                  </div>
                  <p className="italic text-bakery-dark">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bakery-pink to-bakery-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order Your Dream Cake?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us create the perfect cake for your special occasion. Custom designs, delicious flavors, and exceptional quality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-bakery-red hover:bg-bakery-cream">
              <Link to="/order">Order Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-bakery-red">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
