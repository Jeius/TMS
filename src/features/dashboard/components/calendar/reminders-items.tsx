'use client';

import BasicTooltip from '@/components/basic-tooltip';
import AlertDialogWrapper from '@/components/dialog-wrapper';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RemindersFormSchema } from '@/features/dashboard/lib/schema';
import { toast } from '@/lib/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCheck, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { z } from 'zod';

// Constant list of reminders, fetch from database
const REMINDERS = [
  { id: 'reminder-1', label: 'Reminder 1' },
  { id: 'reminder-2', label: 'Reminder 2' },
  { id: 'reminder-3', label: 'Reminder 3' },
  { id: 'reminder-4', label: 'Reminder 4' },
  { id: 'reminder-5', label: 'Reminder 5' },
] as const;

export default function RemindersItems() {
  const form = useForm<z.infer<typeof RemindersFormSchema>>({
    resolver: zodResolver(RemindersFormSchema),
    defaultValues: {
      reminders: [],
    },
  });

  const [allChecked, setAllChecked] = useState(false);

  const currentReminders = form.watch('reminders');
  useEffect(() => {
    setAllChecked(currentReminders.length === REMINDERS.length);
  }, [currentReminders]);

  const handleMarkDone = () => {
    const selectedReminders = form.getValues('reminders');
    form.setValue('reminders', []);
    showToast('Done', selectedReminders);
  };

  const handleDeleteSelected = () => {
    const selectedReminders = form.getValues('reminders');
    showToast('Deleted', selectedReminders);
  };

  const showToast = (title: string, reminders: string[]) => {
    if (reminders.length) {
      toast({
        title,
        description: (
          <div className="flex flex-col pl-2">
            {reminders.map((reminder, index) => (
              <span key={index}>{reminder}</span>
            ))}
          </div>
        ),
      });
    } else {
      toast({ title: 'No reminders selected' });
    }
  };

  // Toggle select/unselect all reminders
  const toggleSelectAll = () => {
    const newReminders = allChecked
      ? []
      : REMINDERS.map((reminder) => reminder.id);
    form.setValue('reminders', newReminders);
  };

  function ReminderItem({ id, label }: { id: string; label: string }) {
    const renderFormItem = ({
      field,
    }: {
      field: ControllerRenderProps<
        {
          reminders: string[];
        },
        'reminders'
      >;
    }) => (
      <FormItem className="flex w-full items-center space-x-3 space-y-0 rounded-md p-1.5 hover:bg-accent">
        <FormControl>
          <Checkbox
            checked={field.value.includes(id)}
            onCheckedChange={(checked) => {
              field.onChange(
                checked
                  ? [...field.value, id]
                  : field.value.filter((value: string) => value !== id)
              );
            }}
          />
        </FormControl>
        <FormLabel className="text-sm font-normal">{label}</FormLabel>
      </FormItem>
    );

    return (
      <FormField
        key={id}
        control={form.control}
        name="reminders"
        render={renderFormItem}
      />
    );
  }

  return (
    <Form {...form}>
      <form className="flex flex-col justify-between">
        <FormField
          control={form.control}
          name="reminders"
          render={() => (
            <FormItem>
              <ScrollArea className="h-80 w-full space-y-1 px-1.5">
                {REMINDERS.map(({ id, label }) => (
                  <ReminderItem key={id} id={id} label={label} />
                ))}
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
        <AnimatePresence>
          {currentReminders.length !== 0 && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.1 }}
              className="absolute inset-x-0 bottom-0 flex items-center justify-between"
            >
              <Button
                aria-label="Mark as done"
                variant="link"
                size="sm"
                className="text-card-foreground/80 hover:text-card-foreground hover:no-underline"
                type="button"
                onClick={handleMarkDone}
              >
                Mark as done
              </Button>
              <div className="flex space-x-1">
                <BasicTooltip
                  label={allChecked ? 'Unselect all' : 'Select all'}
                >
                  <Button
                    aria-label={allChecked ? 'Unselect all' : 'Select all'}
                    variant={allChecked ? 'default' : 'ghost'}
                    className="size-fit p-2"
                    type="button"
                    onClick={toggleSelectAll}
                  >
                    <CheckCheck aria-hidden="true" />
                  </Button>
                </BasicTooltip>

                <Tooltip>
                  <AlertDialogWrapper
                    dialogTitle="Confirm Delete"
                    onConfirm={handleDeleteSelected}
                  >
                    <TooltipTrigger asChild>
                      <Button
                        aria-label="Delete"
                        variant="ghost"
                        className="size-fit p-2"
                        type="button"
                      >
                        <Trash2 aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                  </AlertDialogWrapper>
                  <TooltipContent>
                    <span>Delete</span>
                  </TooltipContent>
                </Tooltip>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Form>
  );
}
