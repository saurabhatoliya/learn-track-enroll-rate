import { toast } from "@/components/ui/sonner";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Course {
  id: string;
  name: string;
  created_at: string;
  rating: number;
  description: string;
  instructor: string;
  imageUrl: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  userRating: number | null;
}

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Web Development',
    created_at: '2023-09-15',
    rating: 70,
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern web applications.',
    instructor: 'Dr. Sarah Johnson',
    imageUrl: 'photo-1488590528505-98d2b5aba04b'
  },
  {
    id: '2',
    name: 'Advanced Data Structures',
    created_at: '2023-10-20',
    rating: 70,
    description: 'Explore complex data structures and algorithms for efficient problem-solving.',
    instructor: 'Prof. Michael Chen',
    imageUrl: 'photo-1649972904349-6e44c42644a7'
  },
  {
    id: '3',
    name: 'Mobile App Development',
    created_at: '2023-11-05',
    rating: 70,
    description: 'Create cross-platform mobile applications using React Native.',
    instructor: 'Jane Smith',
    imageUrl: 'photo-1581091226825-a6a2a5aee158'
  },
  {
    id: '4',
    name: 'Machine Learning Fundamentals',
    created_at: '2024-01-10',
    rating: 70,
    description: 'Introduction to machine learning concepts, algorithms, and applications.',
    instructor: 'Dr. Alex Rodriguez',
    imageUrl: 'photo-1649972904349-6e44c42644a7'
  },
  {
    id: '5',
    name: 'Database Systems',
    created_at: '2024-02-25',
    rating: 70,  
    description: 'Learn SQL and database design principles for building robust applications.',
    instructor: 'Prof. Lisa Wong',
    imageUrl: 'photo-1488590528505-98d2b5aba04b'
  },
];

// In-memory storage (simulating a database)
let users: { id: string; name: string; email: string; password: string }[] = [];
let enrollments: Enrollment[] = [];

// Helper to simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication functions
export const registerUser = async (name: string, email: string, password: string): Promise<User | null> => {
  await delay(800);
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    toast.error("User with this email already exists");
    return null;
  }
  
  // Create new user
  const newUser = { id: `user-${Date.now()}`, name, email, password };
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  
  // Save to localStorage for persistence
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
  
  toast.success("Registration successful!");
  return userWithoutPassword;
};

export const loginUser = async (email: string, password: string): Promise<User | null> => {
  await delay(800);
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    toast.error("Invalid email or password");
    return null;
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  
  // Save to localStorage for persistence
  localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
  
  toast.success("Login successful!");
  return userWithoutPassword;
};

export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
  toast.success("Logged out successfully");
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

// Course functions
export const getAllCourses = async (): Promise<Course[]> => {
  await delay(600);
  return [...mockCourses];
};

export const getCourseById = async (courseId: string): Promise<Course | null> => {
  await delay(400);
  return mockCourses.find(course => course.id === courseId) || null;
};

// Enrollment functions
export const enrollInCourse = async (userId: string, courseId: string): Promise<Enrollment | null> => {
  await delay(700);
  
  // Check if already enrolled
  const existingEnrollment = enrollments.find(e => e.userId === userId && e.courseId === courseId);
  if (existingEnrollment) {
    toast.error("You're already enrolled in this course");
    return null;
  }
  
  // Create enrollment
  const enrollment: Enrollment = {
    id: `enrollment-${Date.now()}`,
    userId,
    courseId,
    enrolledAt: new Date().toISOString(),
    userRating: null
  };
  
  enrollments.push(enrollment);
  toast.success("Successfully enrolled in course!");
  return enrollment;
};

export const getUserEnrollments = async (userId: string): Promise<(Enrollment & { course: Course })[]> => {
  await delay(600);
  
  return enrollments
    .filter(enrollment => enrollment.userId === userId)
    .map(enrollment => {
      const course = mockCourses.find(c => c.id === enrollment.courseId)!;
      return { ...enrollment, course };
    });
};

export const rateCourse = async (userId: string, courseId: string, rating: number): Promise<boolean> => {
  await delay(500);
  
  // Find enrollment
  const enrollmentIndex = enrollments.findIndex(e => e.userId === userId && e.courseId === courseId);
  if (enrollmentIndex === -1) {
    toast.error("You must be enrolled in this course to rate it");
    return false;
  }
  
  // Update enrollment with rating
  enrollments[enrollmentIndex].userRating = rating;
  
  // Update course rating (average of all ratings)
  const courseEnrollments = enrollments.filter(e => e.courseId === courseId && e.userRating !== null);
  const totalRating = courseEnrollments.reduce((sum, e) => sum + (e.userRating || 0), 0);
  const averageRating = courseEnrollments.length > 0 ? totalRating / courseEnrollments.length : 70;
  
  // Find course and update rating
  const courseIndex = mockCourses.findIndex(c => c.id === courseId);
  if (courseIndex !== -1) {
    mockCourses[courseIndex].rating = Math.round(averageRating);
  }
  
  toast.success("Course rated successfully!");
  return true;
};

// Initialize with some sample data for testing
const initializeSampleData = () => {
  // Sample user
  if (users.length === 0) {
    users = [
      { id: 'user-1', name: 'Test User', email: 'test@example.com', password: 'password123' }
    ];
  }
  
  // Sample enrollments
  if (enrollments.length === 0) {
    enrollments = [];
  }
};

// Call initialization
initializeSampleData();
