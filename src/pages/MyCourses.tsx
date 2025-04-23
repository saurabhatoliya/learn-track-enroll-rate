
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser, getUserEnrollments, Enrollment, Course, rateCourse } from '@/lib/api';
import CourseCard from '@/components/CourseCard';
import RatingDialog from '@/components/RatingDialog';
import Navbar from '@/components/Navbar';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface EnrolledCourse extends Enrollment {
  course: Course;
}

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const currentUser = getCurrentUser();
  
  useEffect(() => {
    const loadEnrollments = async () => {
      if (!currentUser) return;
      
      setIsLoading(true);
      try {
        const enrollmentsData = await getUserEnrollments(currentUser.id);
        setEnrollments(enrollmentsData);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEnrollments();
  }, [currentUser]);

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleRateClick = (enrollment: EnrolledCourse) => {
    setSelectedCourse(enrollment);
    setIsRatingDialogOpen(true);
  };

  const handleRateSubmit = async (rating: number) => {
    if (!selectedCourse || !currentUser) return;
    
    const success = await rateCourse(currentUser.id, selectedCourse.courseId, rating);
    
    if (success) {
      // Update the local state to reflect the new rating
      setEnrollments(current => 
        current.map(enrollment => 
          enrollment.id === selectedCourse.id 
            ? { ...enrollment, userRating: rating } 
            : enrollment
        )
      );
    }
  };

  // Filter enrollments by search term
  const filteredEnrollments = enrollments.filter(enrollment => 
    enrollment.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Courses</h1>
          <p className="text-gray-600">Track your enrolled courses and learning progress.</p>
        </div>
        
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search your courses..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : filteredEnrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEnrollments.map((enrollment) => (
              <CourseCard
                key={enrollment.id}
                course={enrollment.course}
                isEnrolled={true}
                onRate={() => handleRateClick(enrollment)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {searchTerm ? 'No courses found matching your search.' : 'You have not enrolled in any courses yet.'}
            </p>
            {!searchTerm && (
              <p className="mt-2 text-education">
                <a href="/courses" className="hover:underline">Browse available courses</a> to get started.
              </p>
            )}
          </div>
        )}
      </main>

      {selectedCourse && (
        <RatingDialog
          open={isRatingDialogOpen}
          onOpenChange={setIsRatingDialogOpen}
          onSubmit={handleRateSubmit}
          currentRating={selectedCourse.userRating || null}
          courseName={selectedCourse.course.name}
        />
      )}
    </div>
  );
};

export default MyCourses;
