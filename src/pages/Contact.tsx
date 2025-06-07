
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bakery-cream to-white">
      {/* Hero Section */}
      <div className="bg-bakery-pink text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90">
            We'd love to hear from you! Get in touch for custom orders or any questions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-bakery-dark mb-6">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-8">
                Ready to create something sweet together? Contact us for custom cake orders, 
                special events, or any questions about our delicious treats.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-bakery-pink text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Phone className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">Call Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a 
                    href="tel:+27685685755" 
                    className="text-bakery-red hover:text-bakery-pink font-semibold text-lg"
                  >
                    +27 68 568 5755
                  </a>
                  <p className="text-gray-600 mt-2">Mon - Fri, 9am - 6pm</p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-bakery-red text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">Email Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <a 
                    href="mailto:info@teejaybakehouse.com" 
                    className="text-bakery-red hover:text-bakery-pink font-semibold"
                  >
                    info@teejaybakehouse.com
                  </a>
                  <p className="text-gray-600 mt-2">We reply within 24 hours</p>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-bakery-pink text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">Visit Us</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-bakery-dark font-semibold">123 Bakery Street</p>
                  <p className="text-gray-600">Sweet City, CA 90210</p>
                  <p className="text-gray-600">United States</p>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-bakery-red text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-bakery-dark font-semibold">Mon - Fri: 9am - 6pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-bakery-dark">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bakery-pink"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bakery-pink"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bakery-pink"
                      placeholder="+27 68 568 5755"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bakery-pink"
                      placeholder="Custom cake order, inquiry, etc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bakery-pink resize-vertical"
                    placeholder="Tell us about your cake requirements, event details, or any questions you have..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-bakery-pink hover:bg-bakery-red text-white py-3 text-lg font-semibold transition-colors"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-bakery-dark mb-4">Why Choose Teejay Bakehouse?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-bakery-cream p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🎂</span>
              </div>
              <h4 className="text-xl font-semibold text-bakery-dark mb-2">Custom Designs</h4>
              <p className="text-gray-600">Every cake is uniquely crafted to match your vision and celebration.</p>
            </div>
            <div className="text-center">
              <div className="bg-bakery-cream p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🌟</span>
              </div>
              <h4 className="text-xl font-semibold text-bakery-dark mb-2">Premium Quality</h4>
              <p className="text-gray-600">Only the finest ingredients go into our handcrafted creations.</p>
            </div>
            <div className="text-center">
              <div className="bg-bakery-cream p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">💝</span>
              </div>
              <h4 className="text-xl font-semibold text-bakery-dark mb-2">Made with Love</h4>
              <p className="text-gray-600">Every cake is baked with passion and attention to detail.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
