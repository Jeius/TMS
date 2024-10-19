import { TableCell, TableHead } from '@/components/ui/table';
import { flexRender, Header, Row } from '@tanstack/react-table';
import { AnimatePresence } from 'framer-motion';

type AnimatedTableHeadProps<TData, TValue> = {
    headers: Header<TData, TValue>[];
    scrollState: { left: { isScrolled: boolean } };
    firstColumnId: string;
};

export function AnimatedTableHead<TData, TValue>({
    headers, scrollState, firstColumnId
}: AnimatedTableHeadProps<TData, TValue>) {
    return (
        <AnimatePresence mode="popLayout">
            {headers.map(header => {
                const isFirstColumn = header.id === firstColumnId;
                return (
                    <TableHead
                        key={header.id}
                        scope="col"
                        layout={!isFirstColumn ? true : undefined}
                        motion={!isFirstColumn}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: 'spring', bounce: 0.2 }}
                        data-scroll-state={scrollState.left.isScrolled && 'scrolled'}
                        className={`left-0 px-4 border-y bg-muted bg-gradient-to-b from-white/75 dark:bg-gradient-to-t dark:from-black/45 ${isFirstColumn ? 'md:sticky z-[1] data-[scroll-state=scrolled]:md:shadow-right' : 'z-0'}`}
                        style={{ width: header.column.getSize() }}
                    >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                );
            })}
        </AnimatePresence>
    );
}

type AnimatedTableCellProps<TData> = {
    row: Row<TData>;
    scrollState: { left: { isScrolled: boolean } };
    firstColumnId: string;
};

export function AnimatedTableCell<TData>({ row, scrollState, firstColumnId }: AnimatedTableCellProps<TData>) {
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
