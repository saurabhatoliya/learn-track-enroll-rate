
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById, getCurrentUser, enrollInCourse, Course } from '@/lib/api';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Clock, Users } from 'lucide-react';

const CourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const currentUser = getCurrentUser();
  
  useEffect(() => {
    const loadCourse = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const courseData = await getCourseById(id);
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (!course) return;
    
    setIsEnrolling(true);
    try {
      const enrollment = await enrollInCourse(currentUser.id, course.id);
      if (enrollment) {
        navigate('/my-courses');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800">Course not found</h1>
            <p className="mt-4 text-gray-600">The requested course could not be found.</p>
            <Button 
              onClick={() => navigate('/courses')}
              className="mt-6 bg-education hover:bg-education-hover"
            >
              Browse Courses
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const formattedDate = new Date(course.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 85) return 'text-green-600 bg-green-50';
    if (rating >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.name}</h1>
            <div className="text-gray-600 mb-4">Instructor: {course.instructor}</div>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${getRatingColor(course.rating)}`}>
                Rating: {course.rating}/100
              </span>
            </div>
          </div>

          <div className="mb-8 bg-gray-100 h-60 rounded-lg overflow-hidden">
            <img 
              src={course.imageUrl} 
              alt={course.name} 
              className="w-full h-full object-cover opacity-70"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-education" />
                <div>
                  <div className="text-sm font-medium">Added On</div>
                  <div className="text-gray-600 text-sm">{formattedDate}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-education" />
                <div>
                  <div className="text-sm font-medium">Estimated Duration</div>
                  <div className="text-gray-600 text-sm">8 weeks</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="h-5 w-5 text-education" />
                <div>
                  <div className="text-sm font-medium">Students</div>
                  <div className="text-gray-600 text-sm">325+ enrolled</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-4">About this Course</h2>
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              This comprehensive course is designed to give you a solid foundation and practical skills that you can immediately apply. Whether you're a beginner or looking to expand your knowledge, this course provides the perfect opportunity to enhance your skills in this field.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Throughout the course, you'll work on real-world projects and receive personalized feedback to ensure you're mastering the concepts. By the end, you'll have a portfolio of work that demonstrates your new abilities.
            </p>
          </div>

          <div className="text-center mb-8">
            <Button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="px-8 py-6 bg-education hover:bg-education-hover text-lg"
            >
              {isEnrolling ? 'Enrolling...' : 'Enroll in this Course'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetail;
