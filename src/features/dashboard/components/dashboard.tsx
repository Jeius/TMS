'use client'

import Announcements from './announcements'
import CalendarCard from './calendar/calendar-card'
import QuickActions from './quick-actions'
import WelcomeCard from './welcome-card'

export default function DashBoard() {

    return (
        <div className="relative">
            <div className="flex flex-col max-w-full md:mx-auto md:w-fit items-center space-y-16">
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
        </div>
    );
}
