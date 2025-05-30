
import { useState, useMemo } from 'react';
import { FileText, Eye, DownloadCloud, AlertTriangle, CheckCircle, FileDown, Download, X } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';
import GlassmorphismCard from '@/components/ui/GlassmorphismCard';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import jsPDF from 'jspdf';

interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  submission?: {
    fileName: string;
    submittedAt: Date;
    checked: boolean;
    similarity?: number;
    extractedText?: string;
  };
}

interface StudentSubmissionTableProps {
  assignmentId: string;
  students: Student[];
}

const StudentSubmissionTable = ({ assignmentId, students }: StudentSubmissionTableProps) => {
  const { toast } = useToast();
  const [checkingAll, setCheckingAll] = useState(false);
  const [viewReportModal, setViewReportModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // Sort students by roll number
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      return a.rollNo.localeCompare(b.rollNo, undefined, { numeric: true });
    });
  }, [students]);

  const handleCheckAllPlagiarism = () => {
    setCheckingAll(true);
    
    // Simulate plagiarism check for all submissions
    setTimeout(() => {
      setCheckingAll(false);
      
      toast({
        title: "Plagiarism Check Complete",
        description: "All submissions have been analyzed. View individual reports for details.",
      });
    }, 3000);
  };

  const handleViewSubmission = (fileName: string) => {
    toast({
      title: "Opening Document",
      description: `Opening ${fileName}`,
    });
  };

  const handleViewReport = (student: Student) => {
    setSelectedStudent(student);
    setViewReportModal(true);
  };

  const handleDownloadSubmission = (student: Student) => {
    toast({
      title: "Downloading Submission",
      description: `Downloading ${student.submission?.fileName}`,
    });
  };

  const handleDownloadOverallReport = () => {
    toast({
      title: "Downloading Overall Report",
      description: "Generating comprehensive plagiarism report for all submissions.",
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "The overall plagiarism report has been downloaded.",
      });
    }, 1500);
  };

  const getPlagiarismColor = (percentage: number) => {
    if (percentage <= 40) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (percentage <= 60) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    if (percentage <= 80) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  const generatePDFReport = () => {
    if (!selectedStudent || !selectedStudent.submission) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxLineWidth = pageWidth - 2 * margin;

    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Plagiarism Report', margin, 30);

    // Student details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Student: ${selectedStudent.name}`, margin, 50);
    doc.text(`Roll No: ${selectedStudent.rollNo}`, margin, 60);
    doc.text(`Email: ${selectedStudent.email}`, margin, 70);
    doc.text(`File: ${selectedStudent.submission.fileName}`, margin, 80);
    doc.text(`Submission Date: ${selectedStudent.submission.submittedAt.toLocaleDateString()}`, margin, 90);

    // Plagiarism score
    if (selectedStudent.submission.similarity !== undefined) {
      doc.text(`Similarity Score: ${selectedStudent.submission.similarity}%`, margin, 100);
    }

    // Extracted text section
    doc.setFont('helvetica', 'bold');
    doc.text('Extracted Text:', margin, 120);
    
    doc.setFont('helvetica', 'normal');
    const extractedText = selectedStudent.submission.extractedText || 'No extracted text available';
    const splitText = doc.splitTextToSize(extractedText, maxLineWidth);
    doc.text(splitText, margin, 135);

    // Save the PDF
    doc.save(`plagiarism_report_${selectedStudent.rollNo}.pdf`);
    
    toast({
      title: "PDF Downloaded",
      description: `Plagiarism report for ${selectedStudent.name} has been downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Student Submissions</h3>
        <div className="flex gap-3">
          <CustomButton 
            onClick={handleCheckAllPlagiarism}
            loading={checkingAll}
            icon={<AlertTriangle size={18} />}
            className="bg-gradient-to-r from-blue-500 to-blue-600"
          >
            {checkingAll ? "Checking Plagiarism..." : "Check Plagiarism"}
          </CustomButton>
          <CustomButton 
            onClick={handleDownloadOverallReport}
            icon={<FileDown size={18} />}
            className="bg-gradient-to-r from-veri to-veri/80"
          >
            Download Overall Report
          </CustomButton>
        </div>
      </div>
      
      <GlassmorphismCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/40">
                <th className="px-4 py-3 text-left text-sm font-medium">Roll No.</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Submission</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-4 text-sm font-medium">{student.rollNo}</td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {student.submission ? (
                      <div className="flex items-center">
                        <FileText className="text-veri mr-2" size={16} />
                        <div>
                          <button 
                            onClick={() => handleViewSubmission(student.submission?.fileName || '')}
                            className="text-sm font-medium hover:text-veri transition-colors"
                          >
                            {student.submission.fileName}
                          </button>
                          <p className="text-xs text-muted-foreground">
                            {student.submission.submittedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not submitted</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {student.submission ? (
                      student.submission.checked && student.submission.similarity !== undefined ? (
                        <span 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlagiarismColor(student.submission.similarity)}`}
                        >
                          {student.submission.similarity <= 40 ? (
                            <CheckCircle className="mr-1" size={12} />
                          ) : (
                            <AlertTriangle className="mr-1" size={12} />
                          )}
                          {student.submission.similarity}% similarity
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not checked</span>
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {student.submission ? (
                      <div className="flex space-x-2">
                        <CustomButton
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewReport(student)}
                          icon={<Eye size={14} />}
                        >
                          View
                        </CustomButton>
                        <CustomButton
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadSubmission(student)}
                          icon={<DownloadCloud size={14} />}
                        >
                          Download
                        </CustomButton>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">No action available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassmorphismCard>

      {/* View Report Modal */}
      <Dialog open={viewReportModal} onOpenChange={setViewReportModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Plagiarism Report
            </DialogTitle>
            <p className="text-muted-foreground">
              for {selectedStudent?.name} - {selectedStudent?.submission?.fileName}
            </p>
          </DialogHeader>
          
          {selectedStudent && selectedStudent.submission && (
            <div className="space-y-6">
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium">Submission Details</p>
                    <p className="text-xs text-muted-foreground">
                      File: {selectedStudent.submission.fileName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {selectedStudent.submission.submittedAt.toLocaleDateString()}
                    </p>
                  </div>
                  {selectedStudent.submission.similarity !== undefined && (
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center">
                        <div className="relative">
                          <svg className="w-14 h-14" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted-foreground/30" strokeWidth="2"></circle>
                            <circle 
                              cx="18" cy="18" r="16" fill="none" 
                              stroke={
                                selectedStudent.submission.similarity <= 40 ? '#22c55e' :
                                selectedStudent.submission.similarity <= 60 ? '#eab308' :
                                selectedStudent.submission.similarity <= 80 ? '#f97316' : '#ef4444'
                              } 
                              strokeWidth="2" 
                              strokeDasharray="100" 
                              strokeDashoffset={100 - selectedStudent.submission.similarity}
                              transform="rotate(-90 18 18)"
                            ></circle>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                            <span className={
                              selectedStudent.submission.similarity <= 40 ? 'text-green-500' :
                              selectedStudent.submission.similarity <= 60 ? 'text-yellow-500' :
                              selectedStudent.submission.similarity <= 80 ? 'text-orange-500' : 'text-red-500'
                            }>
                              {selectedStudent.submission.similarity}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Similarity Score</p>
                        <p className={`text-sm font-bold ${
                          selectedStudent.submission.similarity <= 40 ? 'text-green-500' :
                          selectedStudent.submission.similarity <= 60 ? 'text-yellow-500' :
                          selectedStudent.submission.similarity <= 80 ? 'text-orange-500' : 'text-red-500'
                        }`}>
                          {selectedStudent.submission.similarity <= 40 ? 'Low Similarity' :
                           selectedStudent.submission.similarity <= 60 ? 'Moderate Similarity' :
                           selectedStudent.submission.similarity <= 80 ? 'High Similarity' : 'Very High Similarity'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <section>
                <h3 className="text-lg font-semibold mb-3">Extracted Text</h3>
                <div className="bg-muted/30 p-4 rounded-lg border border-border max-h-96 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {selectedStudent.submission.extractedText || 'No extracted text available for this submission.'}
                  </pre>
                </div>
              </section>
              
              <div className="flex justify-end gap-3 pt-4 border-t">
                <CustomButton 
                  variant="outline"
                  onClick={() => setViewReportModal(false)}
                >
                  Close
                </CustomButton>
                <CustomButton 
                  icon={<Download className="h-4 w-4" />}
                  onClick={generatePDFReport}
                >
                  Download PDF Report
                </CustomButton>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentSubmissionTable;
