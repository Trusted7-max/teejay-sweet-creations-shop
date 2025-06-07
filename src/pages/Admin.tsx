
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdmin } from "@/contexts/AdminContext";
import AdminAuth from "@/components/admin/AdminAuth";
import AdminCredentials from "@/components/admin/AdminCredentials";
import OrderManagement from "@/components/admin/OrderManagement";
import ProductManagement from "@/components/admin/ProductManagement";
import { Button } from "@/components/ui/button";
import { LogOut, Package, ShoppingCart, Settings } from "lucide-react";

export default function Admin() {
  const { adminUser, signOut } = useAdmin();

  if (!adminUser) {
    return <AdminAuth />;
  }

  return (
    <div className="min-h-screen bg-bakery-cream">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-bakery-dark">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {adminUser.email}</p>
          </div>
          <Button 
            onClick={signOut}
            variant="outline" 
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Order Management
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Product Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-0">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="products" className="mt-0">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <AdminCredentials />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
