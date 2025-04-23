
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getCurrentUser, logoutUser } from '@/lib/api';
import { BookOpen, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-education" />
          <span className="font-bold text-xl text-education">CourseTracker</span>
        </Link>

        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-education transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-gray-700 hover:text-education transition-colors">
                Courses
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/my-courses" className="text-gray-700 hover:text-education transition-colors">
                  My Courses
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">{user.name}</span>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-education text-education hover:bg-education hover:text-white"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-education text-education hover:bg-education hover:text-white"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-education text-white hover:bg-education-hover"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
