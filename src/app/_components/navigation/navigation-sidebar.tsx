"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NavigationItems from "./navigation-items";

const AUTHROUTES = ['/login', '/signup'];

export default function NavigationSideBar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false);
    const width = open ? 240 : 64;

    // Check if current route is an auth route
    const isAuthRoute = AUTHROUTES.includes(pathname);

    return (
        !isAuthRoute && (
            <motion.div
                id="navigation-sidebar"
                className={cn(
                    "fixed z-10 inset-y-0 left-0 hidden lg:block border-r bg-card/60",
                    "backdrop-blur-lg shadow-md pb-10 pt-20 px-3 w-[64px]"
                )}
                initial={{ x: -60, opacity: 0 }}
                animate={{ width: width, x: 0, opacity: 1 }}
                transition={{
                    type: "spring", duration: 0.2,
                    x: { type: "spring", duration: 0.4 },
                }}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
            >
                <NavigationItems open={open} />
            </motion.div>
        )
    );
}