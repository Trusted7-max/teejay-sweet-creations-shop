
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Phone, Mail, MapPin, Clock, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdmin } from "@/contexts/AdminContext";

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
  notes: string;
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

const statusOptions = [
  { value: 'placed', label: 'Order Placed' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'baking', label: 'Baking' },
  { value: 'decorating', label: 'Decorating' },
  { value: 'quality_check', label: 'Quality Check' },
  { value: 'ready', label: 'Ready for Collection/Delivery' },
  { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrderManagement() {
  const { adminUser } = useAdmin();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
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

  const updateOrderStatus = async (orderId: string, newStatus: string, notes?: string) => {
    setUpdatingStatus(true);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) throw error;

      // Add manual status history entry with admin info
      await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status: newStatus,
          changed_by: adminUser?.email || 'admin',
          notes: notes || `Status updated to ${newStatus}`,
        });

      // Refresh orders
      await fetchOrders();
      
      // Update selected order if it's the one being updated
      if (selectedOrder?.id === orderId) {
        const updatedOrder = orders.find(order => order.id === orderId);
        if (updatedOrder) {
          setSelectedOrder({ ...updatedOrder, status: newStatus });
        }
      }

      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone?.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      case 'ready': case 'out_for_delivery': return 'secondary';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bakery-red mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-bakery-dark mb-4">Order Management</h2>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by customer name, email, phone, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold">Orders ({filteredOrders.length})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredOrders.map((order) => (
              <Card 
                key={order.id}
                className={`cursor-pointer transition-all ${
                  selectedOrder?.id === order.id ? 'ring-2 ring-bakery-red' : ''
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-gray-600">{order.customer_name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {statusOptions.find(s => s.value === order.status)?.label || order.status}
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-bakery-red">${order.total_amount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Details */}
        <div className="lg:col-span-2">
          {selectedOrder ? (
            <div className="space-y-6">
              {/* Order Header & Status Update */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Order #{selectedOrder.id.slice(0, 8)}</span>
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusBadgeVariant(selectedOrder.status)} className="text-sm">
                        {statusOptions.find(s => s.value === selectedOrder.status)?.label || selectedOrder.status}
                      </Badge>
                      <Select 
                        value={selectedOrder.status} 
                        onValueChange={(value) => updateOrderStatus(selectedOrder.id, value)}
                        disabled={updatingStatus}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-semibold">{new Date(selectedOrder.created_at).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-semibold text-bakery-red">${selectedOrder.total_amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <p className="font-semibold capitalize">{selectedOrder.payment_status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Delivery Method</p>
                      <p className="font-semibold capitalize">{selectedOrder.delivery_method}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold w-24">Name:</span>
                      <span>{selectedOrder.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="font-semibold w-20">Phone:</span>
                      <span>{selectedOrder.customer_phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span className="font-semibold w-20">Email:</span>
                      <span>{selectedOrder.customer_email}</span>
                    </div>
                    {selectedOrder.delivery_address && (
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-1" />
                        <span className="font-semibold w-20">Address:</span>
                        <span>{selectedOrder.delivery_address}</span>
                      </div>
                    )}
                  </div>
                  {selectedOrder.special_instructions && (
                    <>
                      <Separator className="my-4" />
                      <div>
                        <p className="font-semibold mb-2">Special Instructions:</p>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded">
                          {selectedOrder.special_instructions}
                        </p>
                      </div>
                    </>
                  )}
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
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
                          <img 
                            src={item.products.image} 
                            alt={item.products.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-semibold">{item.products.name}</h4>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity} × ${item.unit_price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">${item.total_price}</p>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-bakery-red">${selectedOrder.total_amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Admin Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Add internal notes for this order..."
                    value={selectedOrder.notes || ''}
                    onChange={(e) => setSelectedOrder({ ...selectedOrder, notes: e.target.value })}
                    rows={3}
                  />
                  <Button 
                    onClick={() => updateOrderStatus(selectedOrder.id, selectedOrder.status, selectedOrder.notes)}
                    className="mt-3 bg-bakery-red hover:bg-bakery-pink"
                    disabled={updatingStatus}
                  >
                    Save Notes
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Select an order to view details and manage status</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
