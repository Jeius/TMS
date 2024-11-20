import useWindowSize from '@/lib/hooks/use-window-size';
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

type AlertDialogWrapperProps = {
  dialogTitle?: string;
  dialogDescription?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  children?: React.ReactNode;
};

export default function AlertDialogWrapper({
  dialogTitle = 'Confirm Action',
  dialogDescription = 'This action cannot be undone. Are you sure you want to proceed?',
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  onConfirm,
  children,
}: AlertDialogWrapperProps) {
  const { width } = useWindowSize();
  const getMaxWidth = React.useMemo(() => Math.min(width * 0.7, 512), [width]);

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="rounded-xl"
        style={{ maxWidth: getMaxWidth }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
