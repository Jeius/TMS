'use client';

import { cn } from '@/lib/utils';
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

const FEATURES = [
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

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="mx-auto max-w-fit scroll-mt-32 px-5 md:px-10"
    >
      <h2 id="features-heading" className="sr-only">
        Key Features
      </h2>
      <ul className="grid grid-cols-1 gap-x-36 gap-y-10 xl:grid-cols-2 xl:grid-rows-5">
        {FEATURES.map(({ title, description, icon: Icon }) => (
          <li
            key={title}
            className="flex max-w-2xl space-x-2 text-balance transition-transform hover:scale-[1.02] sm:hover:scale-[1.03]"
            aria-labelledby={`${title}-heading`}
          >
            <div className="hidden items-center rounded-lg bg-primary p-5 shadow 2xs:flex">
              <Icon aria-hidden="true" className="size-8 shrink" />
            </div>
            <div
              className={cn(
                'flex grow flex-col justify-center space-y-2 p-2',
                'border-primary from-accent/70 hover:border-l-2 hover:bg-gradient-to-r'
              )}
            >
              <h3 id={`${title}-heading`} className="text-lg font-semibold">
                {title}
              </h3>
              <p className="text-sm text-foreground/80">{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
