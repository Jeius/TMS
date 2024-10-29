'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useDynamicWidth } from '@/lib/hooks/use-dynamic-width'
import { useElementRect } from '@/lib/hooks/use-element-rect'
import useWindowSize from '@/lib/hooks/use-window-size'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Announcements from './announcements'
import CalendarCard from './calendar/calendar-card'
import QuickActions from './quick-actions'
import WelcomeCard from './welcome-card'

export default function DashBoard() {
    const [sideBarWidth, sideBarRef] = useDynamicWidth();
    const { height: windowHeight } = useWindowSize();
    const headerRect = useElementRect('app-header');

    const [sideBarHeight, setSideBarHeight] = useState<number | 'auto'>('auto');
    const [sideBarTop, setSideBarTop] = useState<number>();

    useEffect(() => {
        if (headerRect) {
            setSideBarHeight(windowHeight - headerRect.height);
            setSideBarTop(headerRect.bottom);
        }
    }, [windowHeight, headerRect]);

    return (
        <div className="relative">
            <motion.div animate={{ paddingRight: sideBarWidth }}>
                <div className="flex flex-col max-w-full md:mx-auto md:w-fit items-center space-y-16">
                    <WelcomeCard />
                    <QuickActions />
                    <Announcements variant="glass" className="lg:hidden w-full" />
                    <CalendarCard className="lg:hidden w-full data-[open=true]:w-full justify-center" />

                    <div className="flex flex-col items-start space-y-2 justify-center">
                        <h2 className="font-semibold text-lg pl-2">Progress</h2>
                        <p>Gantt chart here...</p>
                    </div>

                    <div className="flex flex-col items-start space-y-2 justify-center">
                        <h2 className="font-semibold text-lg pl-2">Recent Activities</h2>
                        <p>A feed showing what&apos;s happening in the system relevant to the user.</p>
                    </div>
                </div>
            </motion.div>
            <motion.aside ref={sideBarRef} id="sidebar" className="fixed pt-5 pr-1 hidden lg:block"
                initial={{ top: 58, right: -30, opacity: 0 }}
                animate={{ top: sideBarTop, height: sideBarHeight, right: 0, opacity: 1 }}
                transition={{ type: 'tween', duration: 0.25, delay: 0.3 }}
            >
                <ScrollArea id="sidebar-scroll-area" className="h-full pr-3">
                    <div className="flex flex-col space-y-5 pb-5">
                        <Announcements variant="glass" />
                        <CalendarCard />
                    </div>
                </ScrollArea>
            </motion.aside>
        </div>
    );
}
