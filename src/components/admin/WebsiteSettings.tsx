
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save } from "lucide-react";

interface WebsiteInfo {
  id?: string;
  business_name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  business_hours: string;
  delivery_area: string;
  delivery_fee: number;
  free_delivery_threshold: number;
}

export default function WebsiteSettings() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo>({
    business_name: "Teejay Bakehouse",
    tagline: "Delicious Custom Cakes for Every Occasion",
    description: "At Teejay Bakehouse, we create beautiful, delicious cakes that make your special moments unforgettable.",
    phone: "+27 (0) 11 123 4567",
    email: "hello@teejaybakehouse.co.za",
    address: "123 Baker Street, Johannesburg, South Africa",
    business_hours: "Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 4:00 PM, Sunday: Closed",
    delivery_area: "15km radius of our store",
    delivery_fee: 50,
    free_delivery_threshold: 400,
  });
  const { toast } = useToast();

  const fetchWebsiteInfo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('website_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setWebsiteInfo(data);
      }
    } catch (error) {
      console.error('Error fetching website info:', error);
      toast({
        title: "Error",
        description: "Failed to load website information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebsiteInfo();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('website_settings')
        .upsert(websiteInfo, { onConflict: 'id' });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Website information updated successfully",
      });
    } catch (error) {
      console.error('Error saving website info:', error);
      toast({
        title: "Error",
        description: "Failed to save website information",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof WebsiteInfo, value: string | number) => {
    setWebsiteInfo(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading website settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Website Settings</h2>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                value={websiteInfo.business_name}
                onChange={(e) => handleInputChange('business_name', e.target.value)}
                placeholder="Your bakery name"
              />
            </div>
            
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={websiteInfo.tagline}
                onChange={(e) => handleInputChange('tagline', e.target.value)}
                placeholder="Your business tagline"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={websiteInfo.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of your business"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={websiteInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+27 (0) 11 123 4567"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={websiteInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="hello@yourbakery.co.za"
              />
            </div>

            <div>
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                value={websiteInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Your complete business address"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="business_hours">Operating Hours</Label>
              <Textarea
                id="business_hours"
                value={websiteInfo.business_hours}
                onChange={(e) => handleInputChange('business_hours', e.target.value)}
                placeholder="Monday - Friday: 8:00 AM - 6:00 PM..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Delivery Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Delivery Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="delivery_area">Delivery Area</Label>
              <Input
                id="delivery_area"
                value={websiteInfo.delivery_area}
                onChange={(e) => handleInputChange('delivery_area', e.target.value)}
                placeholder="15km radius of our store"
              />
            </div>

            <div>
              <Label htmlFor="delivery_fee">Delivery Fee (R)</Label>
              <Input
                id="delivery_fee"
                type="number"
                value={websiteInfo.delivery_fee}
                onChange={(e) => handleInputChange('delivery_fee', parseFloat(e.target.value) || 0)}
                placeholder="50"
              />
            </div>

            <div>
              <Label htmlFor="free_delivery_threshold">Free Delivery Threshold (R)</Label>
              <Input
                id="free_delivery_threshold"
                type="number"
                value={websiteInfo.free_delivery_threshold}
                onChange={(e) => handleInputChange('free_delivery_threshold', parseFloat(e.target.value) || 0)}
                placeholder="400"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
