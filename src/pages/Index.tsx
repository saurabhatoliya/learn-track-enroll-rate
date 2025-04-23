
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/api';
import { BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  useEffect(() => {
    // If user is already logged in, redirect to courses
    if (user) {
      navigate('/courses');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-education-light to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-10 w-10 text-education" />
                <h1 className="text-3xl font-bold text-education">CourseTracker</h1>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Track Your Learning Journey
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Browse courses, enroll in your favorites, and track your progress. Rate courses and help others find the best learning resources.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-education hover:bg-education-hover text-white px-6 py-2 text-lg"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="border-education text-education hover:bg-education hover:text-white px-6 py-2 text-lg"
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Student learning" 
                  className="w-full rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-education-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-education">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Browse Courses</h3>
            <p className="text-gray-600">
              Explore our diverse range of courses to find the perfect fit for your learning goals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-education-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-education">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Enroll & Learn</h3>
            <p className="text-gray-600">
              Sign up for courses that interest you and start learning at your own pace.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="w-16 h-16 bg-education-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-education">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Rate & Track</h3>
            <p className="text-gray-600">
              Rate courses based on your experience and keep track of your learning journey.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-education text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already enhancing their skills and knowledge through our platform.
          </p>
          <Button 
            onClick={() => navigate('/register')}
            className="bg-white text-education hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Create Free Account
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-education" />
            <span className="font-bold text-lg text-education">CourseTracker</span>
          </div>
          <p className="text-center text-gray-600 text-sm">
            © {new Date().getFullYear()} CourseTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
