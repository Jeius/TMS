import { ScrollArea } from '@/components/ui/scroll-area';
import Announcements from '@/features/dashboard/components/announcements';
import CalendarCard from '@/features/dashboard/components/calendar/calendar-card';
import QuickActions from '@/features/dashboard/components/quick-actions';
import WelcomeCard from '@/features/dashboard/components/welcome-card';

export default function Dashboard() {
  return (
    <main
      id="user-dashboard"
      className="min-h-[85vh] lg:pl-16"
      aria-label="User Dashboard"
    >
      <div className="mx-auto flex justify-between gap-5 p-4 sm:p-5 lg:px-8 lg:py-0">
        <section
          aria-labelledby="dashboard-welcome"
          className="mx-auto mb-28 flex w-fit max-w-full flex-col items-center gap-y-16 lg:py-8"
        >
          <WelcomeCard />

          <QuickActions />

          {/* Announcements and Calendar for Small Screens */}
          <section
            aria-labelledby="announcements-heading"
            className="w-full lg:hidden"
          >
            <Announcements />
          </section>

          <section
            aria-labelledby="calendar-heading"
            className="w-full justify-center lg:hidden"
          >
            <CalendarCard />
          </section>

          <section
            aria-labelledby="progress-heading"
            className="flex flex-col items-start justify-center space-y-2"
          >
            <h2 id="progress-heading" className="pl-2 text-lg font-semibold">
              Progress
            </h2>
            <p>Gantt chart here...</p>
          </section>

          <section
            aria-labelledby="recent-activities-heading"
            className="flex flex-col items-start justify-center space-y-2"
          >
            <h2
              id="recent-activities-heading"
              className="pl-2 text-lg font-semibold"
            >
              Recent Activities
            </h2>
            <p>
              A feed showing what&apos;s happening in the system relevant to the
              user.
            </p>
          </section>
        </section>

        {/* Sidebar */}
        <aside
          id="sidebar"
          className="hidden shrink-0 lg:block"
          aria-labelledby="sidebar-heading"
        >
          <h2 id="sidebar-heading" className="sr-only">
            Sidebar
          </h2>
          <div className="sticky top-16 mb-8 ml-auto w-[22rem] 2xl:w-[36rem] 3xl:w-[45rem]">
            <ScrollArea
              id="sidebar-scroll-area"
              className="h-[calc(100vh-4.5rem)]"
              aria-label="Sidebar Scroll Area"
            >
              <div className="mt-8 flex flex-col space-y-5 px-3">
                <section aria-labelledby="announcements-heading">
                  <Announcements />
                </section>
                <section aria-labelledby="calendar-heading">
                  <CalendarCard />
                </section>
              </div>
            </ScrollArea>
          </div>
        </aside>
      </div>
    </main>
  );
}
