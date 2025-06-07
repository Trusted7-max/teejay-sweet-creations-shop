
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Package, Truck, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/auth/AuthModal";

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_method: string;
  special_instructions: string;
  estimated_completion: string;
  payment_status: string;
  order_items: Array<{
    quantity: number;
    unit_price: number;
    total_price: number;
    products: {
      name: string;
      image: string;
    };
  }>;
}

interface StatusHistory {
  status: string;
  timestamp: string;
  changed_by: string;
  notes: string;
}

const statusConfig = {
  placed: { label: "Order Placed", icon: Package, color: "bg-blue-500" },
  preparing: { label: "Preparing", icon: Clock, color: "bg-yellow-500" },
  baking: { label: "Baking", icon: Clock, color: "bg-orange-500" },
  decorating: { label: "Decorating", icon: Clock, color: "bg-purple-500" },
  quality_check: { label: "Quality Check", icon: CheckCircle, color: "bg-indigo-500" },
  ready: { label: "Ready", icon: CheckCircle, color: "bg-green-500" },
  out_for_delivery: { label: "Out for Delivery", icon: Truck, color: "bg-blue-600" },
  completed: { label: "Completed", icon: CheckCircle, color: "bg-green-600" },
  cancelled: { label: "Cancelled", icon: Package, color: "bg-red-500" }
};

export default function Orders() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            quantity,
            unit_price,
            total_price,
            products (
              name,
              image
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStatusHistory = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderId)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      setStatusHistory(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch status history",
        variant: "destructive",
      });
    }
  };

  const handleOrderSelect = (order: Order) => {
    setSelectedOrder(order);
    fetchStatusHistory(order.id);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      case 'ready': case 'out_for_delivery': return 'secondary';
      default: return 'outline';
    }
  };

  if (!user) {
    return <AuthModal isOpen={showAuthModal} onClose={() => navigate('/')} />;
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bakery-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-bakery-dark mb-2">My Orders</h1>
          <p className="text-lg text-gray-600">Track your cake orders and delivery status</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-bakery-dark mb-4">No Orders Yet</h2>
            <p className="text-lg text-gray-600 mb-8">
              You haven't placed any orders yet. Start exploring our delicious cakes!
            </p>
            <Button 
              onClick={() => navigate('/store')}
              className="bg-bakery-red hover:bg-bakery-pink text-white"
            >
              Browse Our Store
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-xl font-bold mb-4">Order History</h2>
              {orders.map((order) => (
                <Card 
                  key={order.id}
                  className={`cursor-pointer transition-all ${
                    selectedOrder?.id === order.id ? 'ring-2 ring-bakery-red' : ''
                  }`}
                  onClick={() => handleOrderSelect(order)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {statusConfig[order.status as keyof typeof statusConfig]?.label || order.status}
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-bakery-red">${order.total_amount}</p>
                    <p className="text-sm text-gray-600">
                      {order.order_items.length} item{order.order_items.length !== 1 ? 's' : ''}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Details */}
            <div className="lg:col-span-2">
              {selectedOrder ? (
                <div className="space-y-6">
                  {/* Order Header */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Order #{selectedOrder.id.slice(0, 8)}</span>
                        <Badge variant={getStatusBadgeVariant(selectedOrder.status)} className="text-lg px-3 py-1">
                          {statusConfig[selectedOrder.status as keyof typeof statusConfig]?.label || selectedOrder.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Order Date</p>
                          <p className="font-semibold">{new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="font-semibold text-bakery-red">${selectedOrder.total_amount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Delivery Method</p>
                          <p className="font-semibold capitalize">{selectedOrder.delivery_method}</p>
                        </div>
                        {selectedOrder.estimated_completion && (
                          <div>
                            <p className="text-sm text-gray-600">Estimated Completion</p>
                            <p className="font-semibold">
                              {new Date(selectedOrder.estimated_completion).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedOrder.order_items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-bakery-cream rounded-lg overflow-hidden">
                              <img 
                                src={item.products.image} 
                                alt={item.products.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-semibold">{item.products.name}</h4>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${item.total_price}</p>
                              <p className="text-sm text-gray-600">${item.unit_price} each</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Customer Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Name:</span>
                          <span>{selectedOrder.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{selectedOrder.customer_phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{selectedOrder.customer_email}</span>
                        </div>
                        {selectedOrder.delivery_address && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{selectedOrder.delivery_address}</span>
                          </div>
                        )}
                      </div>
                      {selectedOrder.special_instructions && (
                        <div className="mt-4">
                          <p className="font-semibold mb-2">Special Instructions:</p>
                          <p className="text-gray-600">{selectedOrder.special_instructions}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Status Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {statusHistory.map((history, index) => {
                          const StatusIcon = statusConfig[history.status as keyof typeof statusConfig]?.icon || Package;
                          return (
                            <div key={index} className="flex items-center gap-4">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${statusConfig[history.status as keyof typeof statusConfig]?.color || 'bg-gray-500'}`}>
                                <StatusIcon className="h-4 w-4" />
                              </div>
                              <div className="flex-grow">
                                <p className="font-semibold">
                                  {statusConfig[history.status as keyof typeof statusConfig]?.label || history.status}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(history.timestamp).toLocaleString()}
                                </p>
                                {history.notes && (
                                  <p className="text-sm text-gray-500">{history.notes}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-600">Select an order to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
