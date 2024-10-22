"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import NavigationItems from "./navigation-items";


export default function NavigationSideBar() {
    const [open, setOpen] = useState(false);
    const width = open ? 240 : 64;

    return (
        <motion.div
            id="navigation-sidebar"
            className={cn(
                "fixed z-10 inset-y-0 left-0 hidden lg:block border-r bg-card/60",
                "backdrop-blur-lg shadow-md pb-10 pt-20 px-3 w-[64px]"
            )}
            animate={{ width: width }}
            transition={{ type: "spring", duration: 0.2 }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
        >
            <NavigationItems open={open} onOpenChanged={setOpen} />
        </motion.div>
    );
}