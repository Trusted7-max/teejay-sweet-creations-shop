
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

interface GalleryItem {
  id: number;
  name: string;
  image: string;
  categories: string[];
  type: 'image' | 'video';
}

const defaultGalleryItems: GalleryItem[] = [
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
    image: "/lovable-uploads/da24889c-0e7e-4b77-adc8-fcbd1ff7af78.png",
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
    image: "/lovable-uploads/0ccb093e-c6db-4ad8-bfa3-4f41f3e7c397.png",
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

const categories = [
  { id: "birthday", name: "Birthday" },
  { id: "wedding", name: "Wedding" },
  { id: "anniversary", name: "Anniversary" },
  { id: "graduation", name: "Graduation" },
  { id: "seasonal", name: "Seasonal" },
];

export default function GalleryManagement() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    categories: [] as string[],
    type: 'image' as 'image' | 'video'
  });
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!formData.name || !formData.image || formData.categories.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (editingItem) {
      // Update existing item
      setGalleryItems(items => items.map(item => 
        item.id === editingItem.id 
          ? { ...editingItem, ...formData }
          : item
      ));
      toast({
        title: "Success",
        description: "Gallery item updated successfully",
      });
    } else {
      // Add new item
      const newItem: GalleryItem = {
        id: Math.max(...galleryItems.map(item => item.id)) + 1,
        ...formData
      };
      setGalleryItems(items => [...items, newItem]);
      toast({
        title: "Success",
        description: "Gallery item added successfully",
      });
    }

    resetForm();
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      image: item.image,
      categories: item.categories,
      type: item.type
    });
    setShowForm(true);
  };

  const handleDelete = (itemId: number) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    setGalleryItems(items => items.filter(item => item.id !== itemId));
    toast({
      title: "Success",
      description: "Gallery item deleted successfully",
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: '',
      categories: [],
      type: 'image'
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(cat => cat !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-bakery-dark">
            {editingItem ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h2>
          <Button 
            onClick={resetForm} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter item name"
              />
            </div>

            <div>
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <Label>Type *</Label>
              <Select value={formData.type} onValueChange={(value: 'image' | 'video') => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Categories *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={category.id}
                      checked={formData.categories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="rounded"
                    />
                    <Label htmlFor={category.id} className="text-sm">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {formData.image && (
              <div>
                <Label>Preview</Label>
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/128x128?text=Invalid+URL';
                    }}
                  />
                </div>
              </div>
            )}

            <Button 
              onClick={handleSubmit}
              className="bg-bakery-red hover:bg-bakery-pink"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-bakery-dark">Gallery Management</h2>
        <Button 
          onClick={() => setShowForm(true)} 
          className="bg-bakery-red hover:bg-bakery-pink"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {galleryItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No gallery items found</p>
            ) : (
              galleryItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg bg-white">
                  <div>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {item.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.categories.map(category => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {categories.find(cat => cat.id === category)?.name || category}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">
                    ID: {item.id}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
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
