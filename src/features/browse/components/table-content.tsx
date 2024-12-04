'use client';

import BasicTooltip from '@/components/basic-tooltip';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AnimatedTableCell,
  AnimatedTableHead,
} from '@/features/browse/components/animated-table-elements';
import { ColumnVisibilityControl } from '@/features/browse/components/column-visibility';
import { useElementSize } from '@/lib/hooks/use-element-size';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import { useScrollState } from '../lib/hooks/use-scroll-events';
import { useSticky } from '../lib/hooks/use-sticky';
import useThesisTable from '../lib/hooks/use-thesis-table';
import { columns } from './table-columns';

export default function ThesesTableContent() {
  const scrollAreaRef = useSticky('app-header', 'thead');
  const scrollButtonsRef = useSticky('app-header', 'div');
  const scrollState = useScrollState(scrollAreaRef);
  const scrollAreaSize = useElementSize(scrollAreaRef);

  const canScrollLeft = scrollState.left.isScrolled;
  const canScrollRight =
    scrollState.left.value <
    (scrollAreaRef.current?.scrollWidth ?? 0) - (scrollAreaSize?.width ?? 0);

  const table = useThesisTable();
  const tableWidth = table.getTotalSize();
  const headers = table.getFlatHeaders();
  const colSizing = table.getState().columnSizing;

  const columnSizeVars = useMemo(() => {
    const colSizes: { [key: string]: number } = {};
    headers.forEach((header) => {
      colSizes[`--header-${header.id}-size`] = colSizing[header.id];
      colSizes[`--col-${header.column.id}-size`] = colSizing[header.id];
    });
    return colSizes;
  }, [headers, colSizing]);

  function scrollRight() {
    scrollAreaRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  }

  function scrollLeft() {
    scrollAreaRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  }

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="max-w-fit scroll-smooth whitespace-nowrap"
    >
      <div className="flex text-sm">
        <Table
          className="relative border-separate border-spacing-0 whitespace-normal sm:static"
          style={{
            ...columnSizeVars,
            width: tableWidth,
          }}
        >
          <TableHeader className="sticky top-0 z-10 text-xs hover:bg-transparent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-0 align-top hover:bg-transparent"
              >
                <AnimatedTableHead
                  headers={headerGroup.headers}
                  scrollState={scrollState}
                />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="align-top hover:bg-transparent"
                >
                  <AnimatedTableCell row={row} scrollState={scrollState} />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No records.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="z-10 block border-y border-l bg-card/80">
          <ColumnVisibilityControl type="column" />
        </div>
      </div>
      <ScrollBar orientation="horizontal" className="z-10" />
      <AnimatePresence>
        {(canScrollRight || canScrollLeft) && (
          <motion.div
            key="scroll-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-black/10 dark:from-black/40"
          >
            <div ref={scrollButtonsRef} className="relative size-full">
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="sticky top-24 flex flex-col items-end justify-between space-y-5 pr-5"
              >
                <BasicTooltip label="Scroll Left">
                  <Button
                    size="icon"
                    aria-label="Scroll Left"
                    variant="outline"
                    aria-disabled={!canScrollLeft}
                    disabled={!canScrollLeft}
                    className="pointer-events-auto size-fit rounded-full border-secondary p-2 text-secondary hover:bg-secondary hover:text-secondary-foreground [&_svg]:size-5"
                    onClick={scrollLeft}
                  >
                    <ArrowLeft aria-hidden="true" />
                  </Button>
                </BasicTooltip>
                <BasicTooltip label="Scroll Right">
                  <Button
                    size="icon"
                    aria-label="Scroll Right"
                    variant="outline"
                    aria-disabled={!canScrollRight}
                    disabled={!canScrollRight}
                    className="pointer-events-auto size-fit rounded-full border-secondary p-2 text-secondary hover:bg-secondary hover:text-secondary-foreground [&_svg]:size-5"
                    onClick={scrollRight}
                  >
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </BasicTooltip>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollArea>
  );
}
