"use client";

import { cn } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import NavigationFooter from "./navigation-footer";

const NavigationItems = dynamic(() => import("@/components/layout/navigation/navigation-items"));

export default function NavigationSideBar() {
    const queryClient = useQueryClient();
    const { data: open } = useQuery<boolean>({ queryKey: ["navigation", "sidebar"] });
    const width = open ? "240px" : "64px";
    const setOpen = (value: boolean) => { queryClient.setQueryData(["navigation", "sidebar"], value) };

    return (
        <motion.div
            id="navigation-sidebar"
            className={cn(
                "fixed z-10 inset-y-0 left-0 hidden lg:flex flex-col justify-start items-center overflow-x-hidden border-r",
                "backdrop-blur-md shadow-md overflow-y-auto pb-10 pt-20 px-3 scroll-bar-hidden bg-card/50"
            )}
            animate={{ width }}
            transition={{ type: "spring", duration: 0.2 }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
        >
            <NavigationItems />
            <NavigationFooter />
        </motion.div>
    );
}