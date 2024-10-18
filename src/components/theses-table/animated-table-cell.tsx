import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { TableCell } from '../ui/table'
import { flexRender, Row } from '@tanstack/react-table'

type AnimatedTableCellProps<TData> = {
    row: Row<TData>;
    scrollState: { left: { isScrolled: boolean } };
    firstColumnId: string;
};

export default function AnimatedTableCell<TData>({ row, scrollState, firstColumnId }: AnimatedTableCellProps<TData>) {
    return (
        <AnimatePresence mode="popLayout">
            {row.getVisibleCells().map((cell) => {
                const isFirstColumn = cell.column.id === firstColumnId
                return (
                    <TableCell
                        key={cell.id}
                        layout={!isFirstColumn ? true : undefined}
                        motion={!isFirstColumn}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: "spring", bounce: 0.2 }}
                        scope="col"
                        data-column-id={cell.column.id}
                        data-state={row.getIsSelected() && "selected"}
                        data-scroll-state={scrollState.left.isScrolled && "scrolled"}
                        className={`left-0 align-top border-b p-4 overflow-hidden bg-card data-[state=selected]:bg-accent transition-colors ${isFirstColumn ? "md:sticky z-[1] data-[scroll-state=scrolled]:md:shadow-right" : ""}`}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                )
            })}
        </AnimatePresence>
    )
}
