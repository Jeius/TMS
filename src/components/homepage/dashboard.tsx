"use client"

import { useDynamicWidth } from '@/lib/hooks/use-dynamic-width'
import { useElementRect } from '@/lib/hooks/use-element-rect'
import useWindowSize from '@/lib/hooks/use-window-size'
import dynamic from 'next/dynamic'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Announcements from './announcements'
import HomeCalendar from './home-calendar'
import WelcomeCard from './welcome-card'

const QuickActions = dynamic(() => import('./quick-actions'), { ssr: false });

export default function DashBoard() {
    const [sideBarWidth, sideBarRef] = useDynamicWidth();
    const { height: windowHeight } = useWindowSize();
    const headerRect = useElementRect("app-header");

    const sideBarHeight = React.useMemo(() => {
        if (headerRect?.height) {
            return windowHeight - headerRect.height;
        }
        return windowHeight;
    }, [windowHeight, headerRect?.height]);

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
            <aside ref={sideBarRef} id="sidebar" className="fixed right-0 pt-5 pr-1 hidden lg:block"
                style={{ top: headerRect?.bottom || 0, height: sideBarHeight }}
            >
                <ScrollArea id="sidebar-scroll-area" className="h-full pr-3">
                    <div className="flex flex-col space-y-5 pb-5">
                        <Announcements className="grow transition-all duration-500" />
                        <HomeCalendar />
                    </div>
                </ScrollArea>
            </aside>
        </div>
    );
}