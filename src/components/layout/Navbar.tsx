
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X, Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Order", href: "/order" },
  { name: "About Us", href: "/about" },
  { name: "Store", href: "/store" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const { user, signOut } = useAuth();
  const cartItemCount = getCartItemCount();
  const isAdmin = user?.email === 'admin@teejaybakehouse.com'; // Simple admin check

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/692d0b7f-422c-4f4e-9195-f194d5b5e43c.png" 
                  alt="Teejay Bakehouse" 
                  className="h-12 w-auto mr-3"
                />
                <span className="font-pacifico text-2xl md:text-3xl text-bakery-pink">
                  Teejay<span className="text-bakery-red">_</span>bakehouse
                </span>
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => cn(
                    "text-base font-medium hover:text-bakery-pink transition-colors",
                    isActive ? "text-bakery-red" : "text-bakery-dark"
                  )}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative p-2 group">
                <ShoppingCart className="h-6 w-6 text-bakery-dark group-hover:text-bakery-red transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-bakery-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        {user.user_metadata?.full_name || user.email}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={signOut} className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              )}
              
              <Button asChild className="bg-bakery-red hover:bg-bakery-pink text-white">
                <Link to="/order/custom">Custom Order</Link>
              </Button>
              
              {/* Mobile menu button */}
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-bakery-dark lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <img 
                  src="/lovable-uploads/692d0b7f-422c-4f4e-9195-f194d5b5e43c.png" 
                  alt="Teejay Bakehouse" 
                  className="h-10 w-auto mr-2"
                />
                <span className="font-pacifico text-2xl text-bakery-pink">
                  Teejay<span className="text-bakery-red">_</span>bakehouse
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) => cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-bakery-cream transition-colors",
                        isActive ? "text-bakery-red" : "text-bakery-dark"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="py-6 space-y-2">
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-bakery-dark hover:bg-bakery-cream"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-bakery-dark hover:bg-bakery-cream w-full text-left"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-bakery-dark hover:bg-bakery-cream w-full text-left"
                    >
                      Sign In
                    </button>
                  )}
                  <Button asChild className="w-full bg-bakery-red hover:bg-bakery-pink text-white">
                    <Link to="/order/custom" onClick={() => setMobileMenuOpen(false)}>
                      Custom Order
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
