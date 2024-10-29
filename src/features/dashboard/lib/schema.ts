import * as z from 'zod';

export const RemindersFormSchema = z.object({
    reminders: z.array(z.string()),
})