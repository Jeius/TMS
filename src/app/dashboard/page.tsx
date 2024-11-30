import { ScrollArea } from '@/components/ui/scroll-area';
import Announcements from '@/features/dashboard/components/announcements';
import CalendarCard from '@/features/dashboard/components/calendar/calendar-card';
import QuickActions from '@/features/dashboard/components/quick-actions';
import WelcomeCard from '@/features/dashboard/components/welcome-card';

export default function Dashboard() {
  return (
    <main
      id="user-dashboard"
      className="min-h-[85vh] p-5 lg:pl-16"
      aria-label="User Dashboard"
    >
      <div className="mx-auto flex justify-between py-5">
        <section
          aria-labelledby="dashboard-welcome"
          className="mx-auto flex w-fit max-w-full flex-col items-center space-y-16 px-3 sm:px-5"
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
          <div className="sticky top-[5.3rem] ml-auto w-[22rem] px-2 2xl:w-[40rem]">
            <ScrollArea
              id="sidebar-scroll-area"
              className="h-[calc(100vh-5.4rem)] pr-3"
              aria-label="Sidebar Scroll Area"
            >
              <div className="flex flex-col space-y-5">
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
