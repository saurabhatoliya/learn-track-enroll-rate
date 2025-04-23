import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Course } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: () => void;
  onRate?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  isEnrolled = false, 
  onEnroll,
  onRate
}) => {
  const navigate = useNavigate();
  
  const formattedDate = new Date(course.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <AspectRatio ratio={16/9}>
        <img 
          src={`https://images.unsplash.com/${course.imageUrl}`}
          alt={course.name} 
          className="h-full w-full object-cover"
        />
      </AspectRatio>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{course.name}</CardTitle>
        <div className="text-sm text-gray-500">Instructor: {course.instructor}</div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Created: {formattedDate}</span>
          <div className="flex items-center gap-1">
            <div className={`h-2.5 w-2.5 rounded-full ${getRatingColor(course.rating)}`}></div>
            <span className="font-medium">{course.rating}/100</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {isEnrolled ? (
          <div className="flex w-full gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              View Details
            </Button>
            {onRate && (
              <Button
                variant="outline"
                size="sm" 
                className="flex-1 border-education text-education hover:bg-education hover:text-white"
                onClick={onRate}
              >
                Rate Course
              </Button>
            )}
          </div>
        ) : (
          <div className="flex w-full gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              View Details
            </Button>
            {onEnroll && (
              <Button
                size="sm"
                className="flex-1 bg-education text-white hover:bg-education-hover"
                onClick={onEnroll}
              >
                Enroll Now
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const getRatingColor = (rating: number): string => {
  if (rating >= 85) return 'bg-green-500';
  if (rating >= 70) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default CourseCard;
