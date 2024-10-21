import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

type DialogWrapperProps = React.ComponentPropsWithRef<typeof Dialog> & {
    dialogTitle?: string
    dialogDescription?: string
    confirmButtonLabel?: string
    confirmButtonType?: "button" | "submit"
    cancelButtonLabel?: string
    onConfirm: () => void
};

export default function DialogWrapper({
    dialogTitle = "Confirm Action",
    dialogDescription = "Are you sure you want to proceed?",
    confirmButtonLabel = "Yes",
    confirmButtonType = "submit",
    cancelButtonLabel = "No",
    children, onConfirm,
}: DialogWrapperProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>
                <p>{dialogDescription}</p>
                <DialogFooter className="flex justify-end space-x-2">
                    <DialogClose asChild>
                        <Button type={confirmButtonType} variant="destructive" onClick={onConfirm}>
                            {confirmButtonLabel}
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline">{cancelButtonLabel}</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}