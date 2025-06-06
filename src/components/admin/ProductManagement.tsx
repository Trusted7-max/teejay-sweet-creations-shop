
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProductForm from './ProductForm';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  in_stock: boolean;
  categories?: {
    name: string;
  };
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (productData: any) => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([{
          name: productData.name,
          description: productData.description,
          price: parseFloat(productData.price.replace('$', '')),
          image: productData.image,
          category_id: productData.category,
          in_stock: productData.availability === 'In Stock'
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product added successfully",
      });
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (productData: any) => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: productData.name,
          description: productData.description,
          price: parseFloat(productData.price.replace('$', '')),
          image: productData.image,
          category_id: productData.category,
          in_stock: productData.availability === 'In Stock',
          updated_at: new Date().toISOString()
        })
        .eq('id', editingProduct.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return (
      <ProductForm
        onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
        onCancel={handleCancel}
        initialData={editingProduct ? {
          name: editingProduct.name,
          price: `$${editingProduct.price}`,
          category: editingProduct.category_id,
          description: editingProduct.description,
          availability: editingProduct.in_stock ? 'In Stock' : 'Out of Stock',
          image: editingProduct.image,
        } : undefined}
      />
    );
  }

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-bakery-dark">Product Management</h2>
        <Button 
          onClick={() => setShowForm(true)} 
          className="bg-bakery-red hover:bg-bakery-pink"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {products.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No products found</p>
            ) : (
              products.map((product) => (
                <div key={product.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg bg-white">
                  <div>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Category: {product.categories?.name || 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-bakery-red">${product.price}</p>
                    <Badge 
                      variant="secondary" 
                      className={product.in_stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.description?.substring(0, 50)}...
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
