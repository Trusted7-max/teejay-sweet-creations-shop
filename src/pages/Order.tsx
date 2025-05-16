
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Standard cake options
const standardCakes = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    description: "Rich chocolate cake with chocolate ganache frosting",
    price: "$35.00",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Vanilla Bean Celebration",
    description: "Light vanilla cake with buttercream frosting and sprinkles",
    price: "$32.00",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Red Velvet Delight",
    description: "Classic red velvet cake with cream cheese frosting",
    price: "$38.00",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Strawberry Dream",
    description: "Strawberry cake with fresh strawberry filling and frosting",
    price: "$40.00",
    image: "/placeholder.svg",
  },
];

export default function Order() {
  const [orderType, setOrderType] = useState("standard");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedCake, setSelectedCake] = useState<number | null>(null);

  const handleSubmitCustomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Thank you for your custom cake order! We'll contact you shortly to discuss details.");
  };

  const handleSelectCake = (id: number) => {
    setSelectedCake(id);
  };

  const handleCheckout = () => {
    if (selectedCake) {
      // In a real app, this would navigate to checkout with the cake in cart
      alert(`Cake added to cart! Proceeding to checkout...`);
    }
  };

  return (
    <div className="page-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-bakery-dark mb-4">Order Your Cake</h1>
        <p className="text-lg text-bakery-dark max-w-2xl mx-auto">
          Choose from our selection of signature cakes or request a custom creation for your special occasion.
        </p>
      </div>

      <Tabs defaultValue="standard" className="w-full" onValueChange={setOrderType}>
        <div className="flex justify-center mb-8">
          <TabsList className="bg-bakery-cream">
            <TabsTrigger 
              value="standard"
              className="data-[state=active]:bg-bakery-pink data-[state=active]:text-white"
            >
              Standard Cakes
            </TabsTrigger>
            <TabsTrigger 
              value="custom"
              className="data-[state=active]:bg-bakery-pink data-[state=active]:text-white"
            >
              Custom Order
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="standard" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standardCakes.map((cake) => (
              <Card 
                key={cake.id} 
                className={cn(
                  "overflow-hidden cake-card-shadow cursor-pointer transition-all",
                  selectedCake === cake.id ? "ring-2 ring-bakery-red" : ""
                )}
                onClick={() => handleSelectCake(cake.id)}
              >
                <div className="aspect-square bg-bakery-cream relative">
                  <img 
                    src={cake.image} 
                    alt={cake.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedCake === cake.id && (
                    <div className="absolute top-2 right-2 bg-bakery-red text-white rounded-full w-6 h-6 flex items-center justify-center">
                      ✓
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-bakery-dark">{cake.name}</h3>
                  <p className="text-sm text-gray-600 my-2">{cake.description}</p>
                  <p className="font-bold text-bakery-red">{cake.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-bakery-cream rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Delivery Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup or Delivery?</label>
                <RadioGroup defaultValue="pickup" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <label htmlFor="pickup">Pickup</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <label htmlFor="delivery">Delivery (+$10.00)</label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) => {
                        // Disable dates in the past and less than 2 days from now
                        const twoDaysFromNow = new Date();
                        twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
                        return date < twoDaysFromNow;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground mt-1">* Requires at least 2 days notice</p>
              </div>
            </div>

            <div className="mt-8 text-right">
              <Button 
                className="bg-bakery-red hover:bg-bakery-pink text-white" 
                disabled={!selectedCake || !selectedDate}
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmitCustomOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Name *</label>
                    <Input required placeholder="Full Name" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address *</label>
                    <Input type="email" required placeholder="your@email.com" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <Input required placeholder="(123) 456-7890" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Occasion</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="graduation">Graduation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Cake Size *</label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6inch">6" Round (Serves 8)</SelectItem>
                        <SelectItem value="8inch">8" Round (Serves 12-16)</SelectItem>
                        <SelectItem value="10inch">10" Round (Serves 20-24)</SelectItem>
                        <SelectItem value="12inch">12" Round (Serves 30-40)</SelectItem>
                        <SelectItem value="sheet">1/4 Sheet (Serves 20-24)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Flavor *</label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select flavor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vanilla">Vanilla</SelectItem>
                        <SelectItem value="chocolate">Chocolate</SelectItem>
                        <SelectItem value="redvelvet">Red Velvet</SelectItem>
                        <SelectItem value="carrot">Carrot</SelectItem>
                        <SelectItem value="lemon">Lemon</SelectItem>
                        <SelectItem value="strawberry">Strawberry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Frosting *</label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frosting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="buttercream">Buttercream</SelectItem>
                        <SelectItem value="cream-cheese">Cream Cheese</SelectItem>
                        <SelectItem value="ganache">Chocolate Ganache</SelectItem>
                        <SelectItem value="fondant">Fondant</SelectItem>
                        <SelectItem value="whipped">Whipped Cream</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Needed By *</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                          disabled={(date) => {
                            // Disable dates in the past and less than 4 days from now for custom cakes
                            const fourDaysFromNow = new Date();
                            fourDaysFromNow.setDate(fourDaysFromNow.getDate() + 4);
                            return date < fourDaysFromNow;
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground mt-1">* Custom cakes require at least 4 days notice</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Cake Design Description *</label>
                <Textarea 
                  required
                  placeholder="Please describe your ideal cake design, including colors, theme, any text to include, and special requests..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Upload Reference Image (optional)</label>
                <Input type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground mt-1">Upload an image to help us understand your vision</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Additional Comments</label>
                <Textarea 
                  placeholder="Any allergies, special instructions, or additional information we should know..."
                />
              </div>
              
              <div className="text-right">
                <Button type="submit" className="bg-bakery-red hover:bg-bakery-pink text-white">
                  Submit Custom Order Request
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-16 bg-bakery-cream rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help With Your Order?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Our cake specialists are ready to assist you with any questions about placing your order or custom cake requirements.
        </p>
        <div className="flex justify-center">
          <Button asChild variant="outline" className="mr-4 border-bakery-pink text-bakery-dark hover:bg-bakery-pink hover:text-white">
            <a href="tel:+15551234567">(555) 123-4567</a>
          </Button>
          <Button asChild className="bg-bakery-red hover:bg-bakery-pink text-white">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
