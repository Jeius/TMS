'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export function Account({ firstTab, secondTab }: {
    firstTab: React.ReactNode;
    secondTab: React.ReactNode;
}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentTab = searchParams.get('signUp') === 'true' ? 1 : 0;

    const setTabInURL = (tab: 0 | 1) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (tab === 1) {
            currentParams.set('signUp', 'true');
        } else {
            currentParams.delete('signUp');
        }
        router.push(`?${currentParams.toString()}`);
    };

    return (
        <div className="flex w-full mx-auto max-w-full flex-col gap-2">
            <Switch setTab={setTabInURL} currentTab={currentTab} />
            <div className="flex w-full overflow-hidden mx-auto">
                <AnimatePresence mode="wait" initial={false}>
                    {currentTab === 0 && (
                        <motion.div
                            layout
                            className="w-full"
                            key="signIn"
                            initial={{ x: -80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -80, opacity: 0 }}
                            transition={{ type: 'tween', duration: 0.2 }}
                        >
                            {firstTab}
                        </motion.div>
                    )}
                    {currentTab === 1 && (
                        <motion.div
                            layout
                            className="w-full"
                            key="signUp"
                            initial={{ x: 80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 80, opacity: 0 }}
                            transition={{ type: 'tween', duration: 0.2 }}
                        >
                            {secondTab}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Switch({ setTab, currentTab }: {
    setTab: (tab: 0 | 1) => void;
    currentTab: number;
}) {
    return (
        <div className={'relative flex w-full items-center py-1 rounded-lg text-foreground bg-muted'}>
            <motion.div
                transition={{ type: 'keyframes', duration: 0.15, ease: 'easeInOut' }}
                animate={currentTab === 0 ? { x: 4 } : { x: '98%' }}
                initial={currentTab === 0 ? { x: 4 } : { x: '98%' }}
                className={'absolute h-5/6 w-1/2 rounded-md bg-card shadow-md'} />
            <button
                onClick={() => setTab(0)}
                className="z-10 h-9 w-full rounded-md text-center">
                Sign in
            </button>
            <button
                onClick={() => setTab(1)}
                className="z-10 h-9 w-full rounded-md text-center">
                Sign up
            </button>
        </div>
    );
}
