
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bakery-cream px-4 py-12">
      <Link to="/" className="flex items-center mb-8">
        <img 
          src="/lovable-uploads/692d0b7f-422c-4f4e-9195-f194d5b5e43c.png" 
          alt="Teejay Bakehouse" 
          className="h-16 w-auto mr-3"
        />
        <span className="font-pacifico text-2xl md:text-3xl text-bakery-pink">
          Teejay<span className="text-bakery-red">_</span>bakehouse
        </span>
      </Link>
      
      <div className="text-center max-w-md">
        <img 
          src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
          alt="404" 
          className="w-40 h-40 mx-auto mb-6 opacity-60 rounded-full object-cover"
        />
        <h1 className="text-5xl font-bold mb-4 text-bakery-dark">Oops!</h1>
        <p className="text-xl text-bakery-dark mb-8">
          We can't seem to find the page you're looking for. It might have been moved or no longer exists.
        </p>
        <div className="space-y-4">
          <Button asChild className="bg-bakery-red hover:bg-bakery-pink text-white w-full">
            <Link to="/">Return to Home</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/gallery">Browse Our Cakes</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
