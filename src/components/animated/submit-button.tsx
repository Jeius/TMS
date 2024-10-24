import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleDashed, XCircleIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Status = "loading" | "success" | "failed";

type SubmitButtonProps = React.ComponentPropsWithRef<typeof Button> & {
    label?: string,
    strokeColor?: string,
    fillColor?: string,
}

export default function SubmitButton({
    label = "Submit",
    fillColor = "primary-foreground",
    strokeColor = "primary",
    className,
    ...props
}: SubmitButtonProps) {
    const [status, setStatus] = useState<Status | undefined>();
    const { pending } = useFormStatus();
    const isEnabled = !status;

    const changeStatus = async () => {
        if (!isEnabled) return;

        if (pending) {
            setStatus("loading")
        }
        else {
            setStatus("success");
            await wait(1500);
            setStatus(undefined);
        }
    };

    return (
        <Button
            variant="gradient"
            size="lg"
            type="submit"
            data-state={status}
            onClick={changeStatus}
            disabled={!isEnabled}
            className={cn(
                "group relative h-10 min-w-40 overflow-hidden font-semibold duration-300",
                "data-[state=failed]:bg-destructive data-[state=failed]:hover:bg-destructive/80",
                className
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
                            <CheckCircle2 className={`h-4 w-4 fill-${fillColor} stroke-destructive group-hover:stroke-destructive/80`} />
                        </motion.span>
                    )}

                    {status === "failed" && (
                        <motion.span
                            className="h-fit w-fit"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring" }}
                        >
                            <XCircleIcon className={`h-4 w-4 fill-${fillColor} stroke-${strokeColor} group-hover:stroke-${strokeColor}/75`} />
                        </motion.span>
                    )}

                    {status == "loading" ? (
                        <CircleDashed className={`h-4 w-4 animate-spin text-${fillColor}`} />
                    ) : (
                        status ?? label
                    )}
                </motion.span>
            </AnimatePresence>
        </Button>
    );
}
