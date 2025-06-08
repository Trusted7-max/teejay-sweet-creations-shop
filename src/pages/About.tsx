
import { Card, CardContent } from "@/components/ui/card";
import { Cake } from "lucide-react";

// Team members data
const teamMembers = [
  {
    name: "Thelma",
    role: "Founder & Head Baker",
    image: "/placeholder.svg",
    bio: "With over 15 years of baking experience, Thelma started this bakery with a passion for creating beautiful, delicious cakes that bring joy to special occasions."
  },
  {
    name: "Juliet",
    role: "Cake Designer",
    image: "/placeholder.svg",
    bio: "Juliet is our artistic genius behind our most elaborate cake designs. Her background in fine arts helps her create edible masterpieces that look too good to eat."
  },
  {
    name: "Portia",
    role: "Pastry Chef",
    image: "/placeholder.svg",
    bio: "Portia specializes in creating the perfect flavors and textures. She's constantly experimenting with new combinations to delight our customers."
  },
  {
    name: "Debrain",
    role: "Customer Relations",
    image: "/placeholder.svg",
    bio: "Debrain ensures that every customer gets exactly what they want. She's the friendly voice you'll hear when you call to place your order."
  }
];

// Values data
const values = [
  {
    title: "Quality Ingredients",
    description: "We use only the finest ingredients, sourced locally whenever possible, to ensure every cake not only looks amazing but tastes delicious too."
  },
  {
    title: "Artistic Excellence",
    description: "Each cake is a work of art, handcrafted with attention to detail and creative flair that makes it truly special."
  },
  {
    title: "Customer Satisfaction",
    description: "Your vision is our priority. We work closely with each client to ensure your cake exceeds expectations for your special occasion."
  }
];

export default function About() {
  return (
    <div className="page-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-bakery-dark mb-4">About Teejay Bakehouse</h1>
        <p className="text-lg text-bakery-dark max-w-2xl mx-auto">
          Crafting beautiful, delicious cakes with passion and creativity since 2021.
        </p>
      </div>

      {/* Our Story Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="section-title">Our Story</h2>
            <div className="space-y-4 text-bakery-dark">
              <p>
                Teejay Bakehouse began as a small home kitchen operation in 2021, born from founder Thelma and her Mom Juliet passion for creating beautiful, delicious cakes that bring joy to special occasions.
              </p>
              <p>
                What started as baking for family and friends quickly grew into a beloved local business as word spread about our exceptional cake designs and flavors. In 2024, we moved into our current bakery location, allowing us to serve more customers while maintaining our commitment to quality and personalization.
              </p>
              <p>
                Today, Teejay Bakehouse has become known throughout the region as the go-to bakery for custom celebration cakes that not only look stunning but taste amazing. We take pride in being part of our customers' most important moments - from birthdays and weddings to graduations and anniversaries.
              </p>
              <p>
                Our philosophy remains simple: every cake should be a perfect blend of artistry and flavor, created with care and attention to detail that makes each celebration truly special.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-bakery-pink rounded-full opacity-10"></div>
            <img
              src="/placeholder.svg"
              alt="Teejay Bakehouse storefront"
              className="w-full h-auto rounded-lg shadow-lg relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-bakery-red rounded-full opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="mb-20">
        <h2 className="section-title text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-0 shadow-md overflow-hidden cake-card-shadow hover-scale">
              <div className="aspect-square bg-bakery-cream">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-bakery-red font-medium mb-3">{member.role}</p>
                <p className="text-sm text-bakery-dark">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="mb-20">
        <div className="bg-bakery-cream rounded-lg p-8 md:p-12">
          <h2 className="section-title text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex">
                <div className="mr-4 mt-1">
                  <Cake className="h-6 w-6 text-bakery-red" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-bakery-dark">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery/Process Section */}
      <section className="mb-20">
        <h2 className="section-title text-center mb-8">Our Bakery</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img
            src="/placeholder.svg"
            alt="Bakery interior"
            className="w-full h-64 object-cover rounded-lg cake-card-shadow"
          />
          <img
            src="/placeholder.svg"
            alt="Baker decorating cake"
            className="w-full h-64 object-cover rounded-lg cake-card-shadow"
          />
          <img
            src="/placeholder.svg"
            alt="Finished cakes display"
            className="w-full h-64 object-cover rounded-lg cake-card-shadow"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-20">
        <h2 className="section-title text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 gap-6">
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img
                    src="/placeholder.svg"
                    alt="Customer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-bakery-dark">Jennifer Anderson</h3>
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
              <p className="italic text-bakery-dark text-lg">
                "Teejay Bakehouse created the most beautiful wedding cake for us! Not only did it match our vision perfectly, but it was also the most delicious cake we've ever tasted. Our guests are still talking about it months later!"
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map/Location Section */}
      <section>
        <h2 className="section-title text-center mb-8">Visit Our Bakery</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
            {/* This would be a Google Map in production */}
            <div className="w-full h-full flex items-center justify-center bg-bakery-cream">
              <p className="text-bakery-dark">Map placeholder</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <address className="not-italic text-bakery-dark">
                <p>123 Bakery Street</p>
                <p>Sweet City, CA 90210</p>
                <p>United States</p>
              </address>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Business Hours</h3>
              <div className="space-y-1 text-bakery-dark">
                <p>Monday to Friday: 9am - 6pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Contact</h3>
              <div className="space-y-1 text-bakery-dark">
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  <a href="tel:+27685685755" className="hover:text-bakery-pink transition-colors">
                    +27 68 568 5755
                  </a>
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a href="mailto:info@teejaybakehouse.com" className="hover:text-bakery-pink transition-colors">
                    info@teejaybakehouse.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
