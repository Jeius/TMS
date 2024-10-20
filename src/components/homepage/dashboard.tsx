"use client"

import { useDynamicWidth } from '@/lib/hooks/use-dynamic-width'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Announcements from './announcements'
import HomeCalendar from './home-calendar'
import QuickActions from './quick-actions'
import WelcomeCard from './welcome-card'

export default function DashBoard() {
    const [sideBarWidth, sideBarRef] = useDynamicWidth();
    const [sideBarHeight, setSideBarHeight] = React.useState(0);
    const [headerBottom, setHeaderBottom] = React.useState(0);

    React.useEffect(() => {
        const updateHeight = () => {
            const headerRect = document.getElementById("app-header")?.getBoundingClientRect();
            if (headerRect) {
                const calculatedHeight = window.innerHeight - headerRect.height;
                setSideBarHeight(calculatedHeight);
                setHeaderBottom(headerRect.bottom);
            }
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <div className="relative flex">
            <div className="grow" style={{ paddingRight: sideBarWidth }}>
                <div className="flex flex-col mx-auto w-fit items-center md:items-start space-y-16">
                    <WelcomeCard />
                    <QuickActions />
                    <div className="flex flex-col items-start space-y-2 justify-center">
                        <h2 className="font-semibold text-lg pl-2">Progress</h2>
                        <p>Gantt chart here...</p>
                    </div>

                    <div className="flex flex-col items-start space-y-2 justify-center">
                        <h2 className="font-semibold text-lg pl-2">Recent Activities</h2>
                        <p>A feed showing what's happening in the system relevant to the user.</p>
                    </div>
                </div>
            </div>
            <aside ref={sideBarRef} id="sidebar" className="fixed right-0 py-5 pr-1 hidden lg:block"
                style={{ top: headerBottom, height: sideBarHeight }}
            >
                <ScrollArea id="sidebar-scroll-area" className="h-full pr-3">
                    <div className="flex flex-col space-y-5">
                        <Announcements className="grow transition-all duration-500" />
                        <HomeCalendar />
                    </div>
                </ScrollArea>
            </aside>
        </div>
    );
}
