
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl font-bold text-education">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-600 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button 
          asChild 
          className="mt-8 bg-education hover:bg-education-hover"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </main>
    </div>
  );
};

export default NotFound;
