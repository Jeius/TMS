import { Message } from '@/lib/types';

export function FormBanner({ message }: { message: Message }) {
  return (
    <div className="flex w-full max-w-md flex-col gap-2 text-sm">
      {'success' in message && (
        <div className="border-l-2 border-green-700 bg-gradient-to-r from-green-300/35 px-4 text-foreground dark:from-green-200/10">
          {message.success}
        </div>
      )}
      {'error' in message && (
        <div className="border-l-2 border-destructive bg-gradient-to-r from-destructive/30 px-4 text-foreground dark:from-destructive/10">
          {message.error}
        </div>
      )}
    </div>
  );
}
