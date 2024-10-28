import { Message } from "@/lib/types";


export function FormBanner({ message }: { message: Message }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-foreground px-4 border-l-2 border-green-700 bg-gradient-to-r from-green-200/60 dark:from-green-200/10 ">
          {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-destructive-foreground border-l-2 px-4 border-destructive bg-gradient-to-r from-destructive/60 dark:from-destructive/10">
          {message.error}
        </div>
      )}
    </div>
  );
}
