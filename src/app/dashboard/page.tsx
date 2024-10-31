import { ScrollArea } from '@/components/ui/scroll-area';
import { TooltipProvider } from '@/components/ui/tooltip';
import Announcements from '@/features/dashboard/components/announcements';
import CalendarCard from '@/features/dashboard/components/calendar/calendar-card';
import QuickActions from '@/features/dashboard/components/quick-actions';
import WelcomeCard from '@/features/dashboard/components/welcome-card';

export default function Dashboard() {
    return (
        <TooltipProvider>
            <main id="user-dashboard" className="pb-4 lg:pl-16">
                <div className="mx-auto flex justify-between py-5">
                    <div className="mx-auto max-w-full w-fit flex flex-col items-center space-y-16 px-3 sm:px-5">
                        <WelcomeCard />
                        <QuickActions />
                        <Announcements variant="glass" className="lg:hidden w-full" />
                        <CalendarCard className="lg:hidden w-full justify-center" />

                        <div className="flex flex-col items-start space-y-2 justify-center">
                            <h2 className="font-semibold text-lg pl-2">Progress</h2>
                            <p>Gantt chart here...</p>
                        </div>

                        <div className="flex flex-col items-start space-y-2 justify-center">
                            <h2 className="font-semibold text-lg pl-2">Recent Activities</h2>
                            <p>A feed showing what&apos;s happening in the system relevant to the user.</p>
                        </div>
                    </div>
                    <aside id="sidebar" className='hidden lg:block shrink-0'>
                        <div className="sticky top-[5.3rem] ml-auto w-[22rem] 2xl:w-[40rem] px-2">
                            <ScrollArea id="sidebar-scroll-area" className="h-[calc(100vh-5.4rem)] pr-3">
                                <div className="flex flex-col space-y-5">
                                    <Announcements />
                                    <CalendarCard />
                                </div>
                            </ScrollArea>
                        </div>
                    </aside>
                </div>
            </main>
        </TooltipProvider>
    );
}
