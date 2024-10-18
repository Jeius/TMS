"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { HTMLMotionProps, motion as M } from "framer-motion"

const Table = React.forwardRef<
  HTMLTableElement,
  HTMLMotionProps<"table"> & React.HTMLAttributes<HTMLTableElement> & { motion?: boolean }
>(({ className, motion = false, ...props }, ref) => {
  const defaultClassName = "w-full caption-bottom text-sm";
  return motion ? (
    <M.table ref={ref} className={cn(defaultClassName, className)} {...props} />
  ) : (
    <table ref={ref} className={cn(defaultClassName, className)} {...props} />
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<"thead"> & React.HTMLAttributes<HTMLTableSectionElement> & { motion?: boolean }
>(({ className, motion = false, ...props }, ref) => {
  const defaultClassName = "[&_tr]:border-b";
  return motion ? (
    <M.thead ref={ref} className={cn(defaultClassName, className)} {...props} />
  ) : (
    <thead ref={ref} className={cn(defaultClassName, className)} {...props} />
  );
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<"tbody"> & React.HTMLAttributes<HTMLTableSectionElement> & { motion?: boolean }
>(({ className, motion = false, ...props }, ref) => {
  const defaultClassName = "[&_tr:last-child]:border-0";
  return motion ? (
    <M.tbody ref={ref} className={cn(defaultClassName, className)} {...props} />
  ) : (
    <tbody ref={ref} className={cn(defaultClassName, className)} {...props} />
  );
});
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  HTMLMotionProps<"tfoot"> & React.HTMLAttributes<HTMLTableSectionElement> & { motion?: boolean }
>(({ className, motion = false, ...props }, ref) => {
  const defaultClassName = "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0"
  return motion ? (
    <M.tfoot ref={ref} className={cn(defaultClassName, className)} {...props} />
  ) : (
    <tfoot ref={ref} className={cn(defaultClassName, className)} {...props} />
  );
});
TableFooter.displayName = "TableFooter";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  HTMLMotionProps<"td"> & React.TdHTMLAttributes<HTMLTableCellElement> & { motion?: boolean }
>(({ className, motion = false, ...props }, ref) => {
  const defaultClassName = "p-2 align-middle border-r";
  return motion ? (
    <M.td ref={ref} className={cn(defaultClassName, className)} {...props} />
  ) : (
    <td ref={ref} className={cn(defaultClassName, className)} {...props} />
  );
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  HTMLMotionProps<"caption"> & React.HTMLAttributes<HTMLTableCaptionElement> & { motion?: boolean }
>(({ className, motion = false, ...props }, ref) => {
  const defaultClassName = "mt-4 text-sm text-muted-foreground";
  return motion ? (
    <M.caption ref={ref} className={cn(defaultClassName, className)} {...props} />
  ) : (
    <caption ref={ref} className={cn(defaultClassName, className)} {...props} />
  );
});
TableCaption.displayName = "TableCaption";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  HTMLMotionProps<"tr"> & React.HTMLAttributes<HTMLTableRowElement> & { motion?: boolean }
>(({ className, motion = false, ...props }, ref) => {
  const defaultClassName = "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted [&_td:last-child]:border-r-0 [&_th:last-child]:border-r-0";

  return motion ? (
    <M.tr ref={ref} className={cn(defaultClassName, className)} {...props} />
  ) : (
    <tr ref={ref} className={cn(defaultClassName, className)} {...props} />
  );
});
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  HTMLMotionProps<"th"> & React.ThHTMLAttributes<HTMLTableCellElement> & { motion?: boolean }
>(({ className, motion = false, ...props }, ref) => {
  const defaultClassName = "h-10 px-2 border-r text-left align-middle font-semibold text-sm text-foreground"
  return motion ? (
    <M.th ref={ref} className={cn(defaultClassName, className)} {...props} />
  ) : (
    <th ref={ref} className={cn(defaultClassName, className)} {...props} />
  )
}
)
TableHead.displayName = "TableHead"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
