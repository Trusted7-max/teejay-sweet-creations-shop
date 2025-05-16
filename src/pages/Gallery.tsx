
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Sample cake data
const cakeCategories = [
  { id: "all", name: "All Cakes" },
  { id: "birthday", name: "Birthday" },
  { id: "wedding", name: "Wedding" },
  { id: "anniversary", name: "Anniversary" },
  { id: "graduation", name: "Graduation" },
  { id: "seasonal", name: "Seasonal" },
];

const cakes = [
  {
    id: 1,
    name: "Classic Birthday Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["birthday"],
    type: "image"
  },
  {
    id: 2,
    name: "Wedding Elegance",
    image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["wedding"],
    type: "image"
  },
  {
    id: 3,
    name: "Graduation Cap Cake",
    image: "https://images.unsplash.com/photo-1619846227717-205b9dccac17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["graduation"],
    type: "image"
  },
  {
    id: 4,
    name: "Anniversary Delight",
    image: "https://images.unsplash.com/photo-1623246123320-0d6636755345?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["anniversary"],
    type: "image"
  },
  {
    id: 5,
    name: "Christmas Fruitcake",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["seasonal"],
    type: "image"
  },
  {
    id: 6,
    name: "Chocolate Birthday Surprise",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["birthday"],
    type: "image"
  },
  {
    id: 7,
    name: "Wedding Cake Decorating",
    image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["wedding"],
    type: "video"
  },
  {
    id: 8,
    name: "Graduation Celebration Cake",
    image: "https://images.unsplash.com/photo-1615394695853-05dc8d6b293f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["graduation"],
    type: "image"
  },
  {
    id: 9,
    name: "Silver Anniversary Cake",
    image: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["anniversary"],
    type: "image"
  },
  {
    id: 10,
    name: "Valentine's Day Special",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["seasonal"],
    type: "image"
  },
  {
    id: 11,
    name: "Birthday Cake Assembly",
    image: "https://images.unsplash.com/photo-1594054528845-f9cfce2abd18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["birthday"],
    type: "video"
  },
  {
    id: 12,
    name: "Easter Bunny Cake",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["seasonal"],
    type: "image"
  },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCakes = activeTab === "all" 
    ? cakes 
    : cakes.filter(cake => cake.categories.includes(activeTab));
  
  const imageItems = filteredCakes.filter(cake => cake.type === "image");
  const videoItems = filteredCakes.filter(cake => cake.type === "video");

  return (
    <div className="page-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-bakery-dark mb-4">Cake Gallery</h1>
        <p className="text-lg text-bakery-dark max-w-2xl mx-auto">
          Browse through our collection of beautiful custom cakes for all occasions. Get inspired for your next celebration!
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="bg-bakery-cream">
            {cakeCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-bakery-pink data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {cakeCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="space-y-10">
              {/* Image Gallery */}
              <section>
                <h2 className="section-subtitle mb-6">Cake Showcase</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {imageItems.map(cake => (
                    <Card key={cake.id} className="overflow-hidden cake-card-shadow hover-scale">
                      <div className="aspect-square bg-bakery-cream relative group">
                        <img 
                          src={cake.image} 
                          alt={cake.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                          <Button className="bg-bakery-red hover:bg-bakery-pink text-white mb-4">
                            View Details
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg text-bakery-dark">{cake.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
              
              {/* Videos Section (if any) */}
              {videoItems.length > 0 && (
                <section>
                  <h2 className="section-subtitle mb-6">Cake Videos</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {videoItems.map(video => (
                      <Card key={video.id} className="overflow-hidden cake-card-shadow">
                        <div className="aspect-video bg-bakery-cream relative">
                          <img 
                            src={video.image} 
                            alt={video.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button size="icon" className="rounded-full bg-bakery-red hover:bg-bakery-pink w-16 h-16">
                              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg text-bakery-dark">{video.name}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="text-center mt-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Looking for a Custom Cake?</h2>
          <p className="mb-6">
            Don't see what you're looking for? We specialize in custom cake designs tailored to your specific needs and preferences.
          </p>
          <Button asChild className="bg-bakery-red hover:bg-bakery-pink text-white">
            <a href="/order/custom">Request Custom Cake</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
