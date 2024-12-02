import {
  Archive,
  Calendar,
  CalendarCheck,
  FileText,
  FolderOpen,
  MessageSquare,
  Shield,
  Star,
  User,
  Users,
} from 'lucide-react';

export const FEATURES = [
  {
    title: 'User Profiles and Roles',
    description:
      "Create personalized profiles for students, advisors, and admins, enabling tailored access and a centralized view of each user's tasks and responsibilities.",
    icon: User,
  },
  {
    title: 'Thesis Proposal Submission and Approval',
    description:
      'Efficiently submit, review, and approve thesis proposals with an easy-to-navigate system for feedback, comments, and document uploads.',
    icon: FileText,
  },
  {
    title: 'Document and File Management',
    description:
      'Organize and manage all thesis-related documents in one place, with version control for easy reference and tracking of past drafts.',
    icon: FolderOpen,
  },
  {
    title: 'Timeline and Deadlines Management',
    description:
      'Stay on schedule with built-in milestone tracking and deadline reminders, ensuring key tasks and submissions are completed on time.',
    icon: Calendar,
  },
  {
    title: 'Communication and Feedback',
    description:
      'Streamline communication between students and advisors, allowing real-time messaging and feedback on thesis drafts and documents.',
    icon: MessageSquare,
  },
  {
    title: 'Thesis Defense Scheduling',
    description:
      'Coordinate and schedule thesis defense dates, reserve venues, and send automated notifications to all participants.',
    icon: CalendarCheck,
  },
  {
    title: 'Plagiarism Check Integration',
    description:
      'Upload and manage plagiarism reports to ensure academic integrity before final thesis submission.',
    icon: Shield,
  },
  {
    title: 'Panel and Advisor Assignment',
    description:
      'Assign advisors and panel members based on expertise and availability, ensuring effective guidance and support for each student.',
    icon: Users,
  },
  {
    title: 'Grading and Evaluation',
    description:
      'Simplify thesis grading with score submissions and automated calculations for final grades based on evaluation criteria.',
    icon: Star,
  },
  {
    title: 'Thesis Archive and Repository',
    description:
      'Build a digital archive of completed theses, searchable by keyword, department, or year, with customizable access permissions.',
    icon: Archive,
  },
];
