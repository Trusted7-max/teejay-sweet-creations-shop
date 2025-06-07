
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/auth/AuthModal";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    specialInstructions: ''
  });

  const handleCheckout = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!orderDetails.customerName || !orderDetails.customerEmail || !orderDetails.customerPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const totalAmount = getCartTotal() + (getCartTotal() >= 75 ? 0 : 10);
      
      // Create the order with placed status
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          customer_name: orderDetails.customerName,
          customer_email: orderDetails.customerEmail,
          customer_phone: orderDetails.customerPhone,
          delivery_address: orderDetails.deliveryAddress,
          delivery_method: orderDetails.deliveryAddress ? 'delivery' : 'collection',
          special_instructions: orderDetails.specialInstructions,
          status: 'placed',
          payment_status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: parseFloat(item.price.replace('$', '')),
        total_price: parseFloat(item.price.replace('$', '')) * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id.slice(0, 8)} has been placed.`,
      });
      
      navigate('/orders');
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-bakery-dark mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-gray-600 mb-8">
            Looks like you haven't added any delicious treats to your cart yet.
          </p>
          <Button asChild className="bg-bakery-red hover:bg-bakery-pink text-white">
            <Link to="/store">Browse Our Store</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="page-container">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-bakery-dark mb-2">Shopping Cart</h1>
            <p className="text-lg text-gray-600">
              {getCartItemCount()} {getCartItemCount() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-24 bg-bakery-cream rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div>
                              <h3 className="font-semibold text-lg text-bakery-dark">{item.name}</h3>
                              <p className="text-bakery-red font-bold text-lg">{item.price}</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border rounded-lg">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Order Details Form */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-bakery-dark mb-4">Order Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        value={orderDetails.customerName}
                        onChange={(e) => setOrderDetails({ ...orderDetails, customerName: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerEmail">Email *</Label>
                      <Input
                        id="customerEmail"
                        type="email"
                        value={orderDetails.customerEmail}
                        onChange={(e) => setOrderDetails({ ...orderDetails, customerEmail: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerPhone">Phone *</Label>
                      <Input
                        id="customerPhone"
                        value={orderDetails.customerPhone}
                        onChange={(e) => setOrderDetails({ ...orderDetails, customerPhone: e.target.value })}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryAddress">Delivery Address</Label>
                      <Input
                        id="deliveryAddress"
                        value={orderDetails.deliveryAddress}
                        onChange={(e) => setOrderDetails({ ...orderDetails, deliveryAddress: e.target.value })}
                        placeholder="Street, City, Postal Code"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      value={orderDetails.specialInstructions}
                      onChange={(e) => setOrderDetails({ ...orderDetails, specialInstructions: e.target.value })}
                      placeholder="Any special requests or allergies..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
                <Button asChild variant="outline">
                  <Link to="/store">Continue Shopping</Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-bakery-dark mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({getCartItemCount()} items)</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${getCartTotal() >= 75 ? '0.00' : '10.00'}</span>
                    </div>
                    {getCartTotal() >= 75 && (
                      <div className="text-green-600 text-sm">
                        🎉 Free delivery on orders over $75!
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-bakery-red">
                          ${(getCartTotal() + (getCartTotal() >= 75 ? 0 : 10)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-bakery-red hover:bg-bakery-pink text-white mb-3"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </Button>
                  
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Fresh daily guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Secure payment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Satisfaction guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
