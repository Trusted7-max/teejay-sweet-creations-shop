
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Package,
  Eye,
  CreditCard,
  Calendar
} from "lucide-react";

// Sample analytics data
const revenueData = [
  { month: "Jan", revenue: 4500, orders: 45 },
  { month: "Feb", revenue: 5200, orders: 52 },
  { month: "Mar", revenue: 4800, orders: 48 },
  { month: "Apr", revenue: 6100, orders: 61 },
  { month: "May", revenue: 7200, orders: 72 },
  { month: "Jun", revenue: 8500, orders: 85 },
];

const categoryData = [
  { name: "Cakes", value: 35, color: "#FF80AB" },
  { name: "Cupcakes", value: 25, color: "#FF4081" },
  { name: "Pastries", value: 20, color: "#FFF8E1" },
  { name: "Bento Cakes", value: 10, color: "#FFB74D" },
  { name: "Desserts", value: 10, color: "#81C784" },
];

const trafficData = [
  { day: "Mon", visitors: 120 },
  { day: "Tue", visitors: 150 },
  { day: "Wed", visitors: 180 },
  { day: "Thu", visitors: 200 },
  { day: "Fri", visitors: 250 },
  { day: "Sat", visitors: 300 },
  { day: "Sun", visitors: 280 },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-bakery-cream">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-bakery-dark mb-2">Admin Dashboard</h1>
          <p className="text-bakery-dark">Manage your bakery operations and monitor performance</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-bakery-dark">Total Revenue</p>
                      <p className="text-3xl font-bold text-bakery-red">$36,300</p>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-bakery-pink" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-bakery-dark">Orders</p>
                      <p className="text-3xl font-bold text-bakery-red">363</p>
                      <p className="text-sm text-green-600">+8% from last month</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-bakery-pink" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-bakery-dark">Customers</p>
                      <p className="text-3xl font-bold text-bakery-red">1,250</p>
                      <p className="text-sm text-green-600">+15% from last month</p>
                    </div>
                    <Users className="h-8 w-8 text-bakery-pink" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-bakery-dark">Website Views</p>
                      <p className="text-3xl font-bold text-bakery-red">8,420</p>
                      <p className="text-sm text-green-600">+22% from last month</p>
                    </div>
                    <Eye className="h-8 w-8 text-bakery-pink" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#FF80AB" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-bakery-dark">Product Management</h2>
              <Button className="bg-bakery-red hover:bg-bakery-pink">Add New Product</Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-white">
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                        alt="Product" 
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">Classic Chocolate Cake</h3>
                      <p className="text-sm text-gray-600">Category: Cakes</p>
                    </div>
                    <div>
                      <p className="font-semibold text-bakery-red">$35.00</p>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">In Stock</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-600">Delete</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-bakery-dark">Order Management</h2>
              <Button variant="outline">Export Orders</Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg bg-white">
                    <div>
                      <p className="font-semibold">#ORD-001</p>
                      <p className="text-sm text-gray-600">Today, 2:30 PM</p>
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-gray-600">sarah@email.com</p>
                    </div>
                    <div>
                      <p>Birthday Cake</p>
                      <p className="text-sm text-gray-600">Custom order</p>
                    </div>
                    <div>
                      <p className="font-semibold text-bakery-red">$45.00</p>
                    </div>
                    <div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-bakery-dark">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Traffic</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="visitors" stroke="#FF80AB" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Credit Card</span>
                      </div>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        <span>Cash</span>
                      </div>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        <span>Digital Wallet</span>
                      </div>
                      <span className="font-semibold">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
