"use client"

import { useDynamicWidth } from '@/lib/hooks/use-dynamic-width'
import { useElementRect } from '@/lib/hooks/use-element-rect'
import { useIsMounted } from '@/lib/hooks/use-is-mounted'
import useWindowSize from '@/lib/hooks/use-window-size'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import Announcements from './announcements'
import HomeCalendar from './home-calendar'
import QuickActions from './quick-actions'
import WelcomeCard from './welcome-card'

export default function DashBoard() {
    const [sideBarWidth, sideBarRef] = useDynamicWidth();
    const { height: windowHeight } = useWindowSize();
    const headerRect = useElementRect("app-header");
    const isMounted = useIsMounted();

    const [sideBarHeight, setSideBarHeight] = useState<number | 'auto'>('auto');
    const [sideBarTop, setSideBarTop] = useState<number>(0);

    useEffect(() => {
        if (headerRect) {
            setSideBarHeight(windowHeight - headerRect.height);
            setSideBarTop(headerRect.bottom || 0);
        }
    }, [windowHeight, headerRect]);

    return (
        <div className="relative">
            <motion.div animate={{ paddingRight: sideBarWidth }}>
                <div className="flex flex-col max-w-full md:mx-auto md:w-fit items-center space-y-16">
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
            </motion.div>
            <motion.aside ref={sideBarRef} id="sidebar" className="fixed right-0 pt-5 pr-1 hidden lg:block"
                initial={{ opacity: 0 }}
                animate={{ top: sideBarTop, height: sideBarHeight, opacity: 1 }}
            >
                <ScrollArea id="sidebar-scroll-area" className="h-full pr-3">
                    <div className="flex flex-col space-y-5 pb-5">
                        <Announcements className="grow transition-all duration-500" />
                        <HomeCalendar />
                    </div>
                </ScrollArea>
            </motion.aside>
        </div>
    );
}
