import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export default function BasicTooltip({
  label,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof TooltipContent> & {
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent {...props}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
