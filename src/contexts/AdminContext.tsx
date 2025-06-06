
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface AdminContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateCredentials: (newEmail: string, newPassword: string) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is already logged in
    const adminData = localStorage.getItem('admin_user');
    if (adminData) {
      setAdminUser(JSON.parse(adminData));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password)
        .single();

      if (error || !data) {
        toast({
          title: "Error",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
        return false;
      }

      setAdminUser(data);
      localStorage.setItem('admin_user', JSON.stringify(data));
      
      toast({
        title: "Success",
        description: "Admin signed in successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setAdminUser(null);
    localStorage.removeItem('admin_user');
    toast({
      title: "Signed out",
      description: "Admin signed out successfully",
    });
  };

  const updateCredentials = async (newEmail: string, newPassword: string): Promise<boolean> => {
    if (!adminUser) return false;

    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ 
          email: newEmail, 
          password_hash: newPassword,
          updated_at: new Date().toISOString()
        })
        .eq('id', adminUser.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update credentials",
          variant: "destructive",
        });
        return false;
      }

      const updatedUser = { ...adminUser, email: newEmail };
      setAdminUser(updatedUser);
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Success",
        description: "Credentials updated successfully",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update credentials",
        variant: "destructive",
      });
      return false;
    }
  };

  const value: AdminContextType = {
    adminUser,
    loading,
    signIn,
    signOut,
    updateCredentials,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
