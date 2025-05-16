
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
    <div className="min-h-screen flex items-center justify-center bg-bakery-cream px-4">
      <div className="text-center max-w-md">
        <img 
          src="/placeholder.svg" 
          alt="404" 
          className="w-40 h-40 mx-auto mb-6 opacity-60"
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
};

export default NotFound;
