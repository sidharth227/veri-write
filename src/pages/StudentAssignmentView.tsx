
import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Calendar, Clock, Check, AlertTriangle, File, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import { format } from 'date-fns';

interface Assignment {
  id: string;
  title: string;
  deadline: Date;
  submitted: boolean;
  submittedAt?: Date;
  description?: string;
  type: 'assignment' | 'exam';
}

interface Submission {
  id: string;
  fileName: string;
  fileSize: number;
  submittedAt: Date;
  status: 'processing' | 'checked' | 'error';
  similarity?: number;
}

const StudentAssignmentView = () => {
  const { courseId, assignmentId } = useParams<{ courseId: string, assignmentId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [courseName, setCourseName] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data for course, assignment and submissions
  useEffect(() => {
    if (courseId && assignmentId) {
      // Set course name based on id
      setCourseName(
        courseId === '1' ? 'Advanced Programming' : 
        courseId === '2' ? 'Data Structures' : 'Course'
      );

      // Mock assignment data
      if (assignmentId === '1') {
        setAssignment({
          id: '1',
          title: 'Midterm Project: Building a Web Application',
          deadline: new Date(2023, 11, 15),
          submitted: true,
          submittedAt: new Date(2023, 11, 10),
          description: 'Create a functional web application that demonstrates your understanding of the core concepts covered in the course, including:\n\n1. User authentication and authorization\n2. Database integration with at least 3 related models\n3. Form handling with validation\n4. Responsive UI design\n\nSubmit your complete source code and a brief report explaining your implementation.',
          type: 'assignment'
        });
        
        setSubmissions([
          {
            id: '1',
            fileName: 'midterm_project_submission.pdf',
            fileSize: 2.4 * 1024 * 1024, // 2.4 MB
            submittedAt: new Date(2023, 11, 10),
            status: 'checked',
            similarity: 12
          }
        ]);
      } else if (assignmentId === '2') {
        setAssignment({
          id: '2',
          title: 'Final Project: Full-Stack Implementation',
          deadline: new Date(2023, 11, 30),
          submitted: false,
          description: 'Develop a complete full-stack application with authentication, database integration, and responsive UI. Your application should demonstrate your mastery of the following:\n\n1. Advanced state management\n2. API integration\n3. Data validation and error handling\n4. Performance optimization\n5. Security best practices\n\nSubmit your complete source code, a detailed report, and a video demonstration of your application.',
          type: 'assignment'
        });
        
        setSubmissions([]);
      } else if (assignmentId === '3') {
        setAssignment({
          id: '3',
          title: 'Practical Midterm Exam',
          deadline: new Date(2023, 10, 25),
          submitted: true,
          submittedAt: new Date(2023, 10, 24),
          description: 'A hands-on exam to test your practical skills in programming and problem-solving. You will implement solutions to three programming challenges within the allotted time.\n\nEach challenge tests different aspects:\n1. Data structures and algorithms\n2. Object-oriented design\n3. Asynchronous programming\n\nSubmit your solutions as a single compressed file.',
          type: 'exam'
        });
        
        setSubmissions([
          {
            id: '1',
            fileName: 'practical_exam_solutions.zip',
            fileSize: 1.8 * 1024 * 1024, // 1.8 MB
            submittedAt: new Date(2023, 10, 24),
            status: 'checked',
            similarity: 5
          }
        ]);
      } else {
        setAssignment({
          id: '4',
          title: 'Weekly Assignment: Algorithm Implementation',
          deadline: new Date(2023, 12, 5),
          submitted: false,
          description: 'Implement the discussed algorithms and submit your code with proper documentation. Your submission should include implementations of:\n\n1. Depth-First Search\n2. Breadth-First Search\n3. Dijkstra\'s Shortest Path\n\nInclude test cases and performance analysis for each algorithm.',
          type: 'assignment'
        });
        
        setSubmissions([]);
      }
    }
  }, [courseId, assignmentId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type
      const fileType = file.type;
      const validTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!validTypes.includes(fileType)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, Word or Text file",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to submit",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newSubmission: Submission = {
        id: Date.now().toString(),
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        submittedAt: new Date(),
        status: 'processing'
      };
      
      setSubmissions(prev => [newSubmission, ...prev]);
      setSelectedFile(null);
      setIsUploading(false);
      
      if (assignment) {
        setAssignment({
          ...assignment,
          submitted: true,
          submittedAt: new Date()
        });
      }
      
      toast({
        title: "Submission successful",
        description: "Your file has been uploaded successfully",
      });
      
      // Simulate processing
      setTimeout(() => {
        setSubmissions(prev => 
          prev.map(sub => {
            if (sub.id === newSubmission.id) {
              return {
                ...sub,
                status: 'checked',
                similarity: Math.floor(Math.random() * 30)
              };
            }
            return sub;
          })
        );
      }, 3000);
      
    }, 1500);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Determine if the deadline has passed
  const isPastDeadline = assignment ? new Date() > assignment.deadline : false;

  // Format file size for display
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (!assignment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-6">
          <div className="container max-w-4xl mx-auto">
            <p>Loading assignment details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-6">
        <div className="container max-w-4xl mx-auto">
          {/* Header with back button */}
          <div className="flex items-center gap-3 mb-8">
            <CustomButton 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/student-course/${courseId}`)}
              icon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Course
            </CustomButton>
            <div>
              <h1 className="text-2xl font-bold">{assignment.title}</h1>
              <p className="text-muted-foreground mt-1">{courseName}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              {/* Assignment details */}
              <GlassmorphismCard className="p-6 mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground mb-4 whitespace-pre-line">
                  {assignment.description}
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Due: {format(assignment.deadline, 'MMMM d, yyyy')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {assignment.submitted ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-500">
                          Submitted on {format(assignment.submittedAt!, 'MMMM d, yyyy')}
                        </span>
                      </>
                    ) : isPastDeadline ? (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-500">Deadline passed</span>
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm text-amber-500">Submission pending</span>
                      </>
                    )}
                  </div>
                </div>
              </GlassmorphismCard>
              
              {/* File submission section */}
              <GlassmorphismCard className="p-6">
                <h2 className="text-lg font-semibold mb-4">Submit Your Work</h2>
                
                {!isPastDeadline ? (
                  <div>
                    <div 
                      className="border-2 border-dashed border-border rounded-md p-8 text-center cursor-pointer hover:bg-muted/10 transition-colors mb-6"
                      onClick={handleBrowseClick}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                      />
                      
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 text-muted-foreground mb-3" />
                        
                        {selectedFile ? (
                          <div className="animate-fade-in">
                            <p className="font-medium mb-1">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground mb-3">
                              {formatFileSize(selectedFile.size)}
                            </p>
                            <div className="flex justify-center gap-3">
                              <CustomButton
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedFile(null);
                                }}
                                icon={<X className="h-4 w-4" />}
                              >
                                Remove
                              </CustomButton>
                              <CustomButton
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSubmit();
                                }}
                                loading={isUploading}
                                icon={<Upload className="h-4 w-4" />}
                              >
                                Submit
                              </CustomButton>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-lg font-medium mb-2">
                              Drag and drop your file here
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                              or click to browse from your computer
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Supported formats: PDF, Word, Text (Max 10MB)
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-destructive/10 p-4 rounded-md mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Submission closed</p>
                        <p className="text-sm text-muted-foreground">
                          The deadline for this assignment has passed. You can no longer submit your work.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Previous submissions */}
                {submissions.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium mb-3">Previous Submissions</h3>
                    <div className="space-y-3">
                      {submissions.map((submission) => (
                        <div 
                          key={submission.id}
                          className="p-3 bg-secondary/40 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-background rounded-md">
                              <FileText className="h-5 w-5 text-veri" />
                            </div>
                            <div>
                              <p className="font-medium text-sm line-clamp-1">{submission.fileName}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{formatFileSize(submission.fileSize)}</span>
                                <span>•</span>
                                <span>{format(submission.submittedAt, 'MMM d, yyyy h:mm a')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-10 sm:ml-0">
                            {submission.status === 'processing' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-blue-800 dark:text-blue-300" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing
                              </span>
                            ) : submission.status === 'checked' ? (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                (submission.similarity || 0) > 30
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                  : (submission.similarity || 0) > 15
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              }`}>
                                {(submission.similarity || 0) > 30 ? (
                                  <AlertTriangle className="mr-1" size={12} />
                                ) : (
                                  <Check className="mr-1" size={12} />
                                )}
                                {submission.similarity}% similarity
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                <X className="mr-1" size={12} />
                                Error
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </GlassmorphismCard>
            </div>
            
            {/* Sidebar with submission status and guidelines */}
            <div>
              <GlassmorphismCard className="p-6 mb-6">
                <h3 className="text-md font-semibold mb-3">Submission Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className={`text-sm font-medium ${assignment.submitted ? 'text-green-500' : 'text-amber-500'}`}>
                      {assignment.submitted ? 'Submitted' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <span className="text-sm font-medium">
                      {format(assignment.deadline, 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  {assignment.submitted && assignment.submittedAt && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Submitted On</span>
                      <span className="text-sm font-medium">
                        {format(assignment.submittedAt, 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}
                  
                  {submissions.length > 0 && submissions[0].status === 'checked' && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Similarity Score</span>
                      <span className={`text-sm font-medium ${
                        (submissions[0].similarity || 0) > 30
                          ? 'text-red-500'
                          : (submissions[0].similarity || 0) > 15
                          ? 'text-amber-500'
                          : 'text-green-500'
                      }`}>
                        {submissions[0].similarity}%
                      </span>
                    </div>
                  )}
                </div>
              </GlassmorphismCard>
              
              <GlassmorphismCard className="p-6">
                <h3 className="text-md font-semibold mb-3">Submission Guidelines</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Submit files in PDF, Word, or Text format only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Maximum file size: 10MB</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Include your name and roll number in the document</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>You can submit multiple times before the deadline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span>Only your last submission will be considered for evaluation</span>
                  </li>
                </ul>
              </GlassmorphismCard>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StudentAssignmentView;
