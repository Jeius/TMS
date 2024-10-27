import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleDashed, XCircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type Status = "loading" | "success" | "failed";

type SubmitButtonProps = React.ComponentPropsWithRef<typeof Button> & {
    status?: Status;
    isSubmitting?: boolean;
    fillColor?: string,
    strokeColor?: string,
};

export default function SubmitButton({
    status,
    isSubmitting,
    fillColor = "primary-foreground",
    strokeColor = "primary",
    className,
    children,
    ...props
}: SubmitButtonProps) {
    return (
        <Button
            variant="gradient"
            size="lg"
            type="submit"
            data-state={status}
            disabled={isSubmitting}
            className={cn(
                "group relative h-10 w-full overflow-hidden font-semibold duration-300 disabled:opacity-100",
                "data-[state=failed]:bg-destructive data-[state=failed]:hover:bg-destructive/80",
                className,
            )}
            {...props}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={status}
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.1 }}
                    className={cn("flex items-center justify-center gap-1 capitalize")}
                >
                    {status === "success" && (
                        <motion.span
                            className="h-fit w-fit"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring" }}
                        >
                            <CheckCircle2 size={16} />
                        </motion.span>
                    )}

                    {status === "failed" && (
                        <motion.span
                            className="h-fit w-fit"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring" }}
                        >
                            <XCircleIcon size={16} />
                        </motion.span>
                    )}

                    {status == "loading" ? (
                        <CircleDashed className={`h-4 w-4 animate-spin text-${fillColor}`} />
                    ) : (
                        status ?? children
                    )}
                </motion.span>
            </AnimatePresence>
        </Button>
    );
}
