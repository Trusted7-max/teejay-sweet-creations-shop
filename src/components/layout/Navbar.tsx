
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Store", href: "/store" },
  { name: "Order", href: "/order" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { getCartItemCount } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSignOut = () => {
    signOut();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-bakery-red">Sweet Dreams</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-bakery-red bg-bakery-cream"
                        : "text-gray-900 hover:text-bakery-red hover:bg-bakery-cream"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <Link
                    to="/orders"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive("/orders")
                        ? "text-bakery-red bg-bakery-cream"
                        : "text-gray-900 hover:text-bakery-red hover:bg-bakery-cream"
                    }`}
                  >
                    My Orders
                  </Link>
                )}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-bakery-red"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-bakery-red"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
              
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-bakery-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "text-bakery-red bg-bakery-cream"
                      : "text-gray-900 hover:text-bakery-red hover:bg-bakery-cream"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user && (
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/orders")
                      ? "text-bakery-red bg-bakery-cream"
                      : "text-gray-900 hover:text-bakery-red hover:bg-bakery-cream"
                  }`}
                >
                  My Orders
                </Link>
              )}
              
              <div className="border-t pt-3 mt-3">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-600">
                      Welcome, {user.email}
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-gray-600 hover:text-bakery-red"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setShowAuthModal(true);
                      setMobileMenuOpen(false);
                    }}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-gray-600 hover:text-bakery-red"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
                
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center w-full px-3 py-2 text-gray-600 hover:text-bakery-red"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getCartItemCount()})
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
