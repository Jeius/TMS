import { TableCell, TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { flexRender, Header, Row } from '@tanstack/react-table';
import { AnimatePresence } from 'framer-motion';

type AnimatedTableHeadProps<TData, TValue> = {
    headers: Header<TData, TValue>[];
    scrollState: { left: { isScrolled: boolean } };
};

export function AnimatedTableHead<TData, TValue>({
    headers, scrollState
}: AnimatedTableHeadProps<TData, TValue>) {
    return (
        <AnimatePresence mode="popLayout">
            {headers.map(header => {
                const isMainColumn = header.id === 'theses';
                return (
                    <TableHead
                        key={header.id}
                        scope="col"
                        layout={!isMainColumn ? true : undefined}
                        motion={!isMainColumn}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: 'spring', bounce: 0.2 }}
                        data-scroll-state={scrollState.left.isScrolled && 'scrolled'}
                        className={cn(
                            'left-0 px-4 border-y bg-muted bg-gradient-to-b from-white/75 dark:bg-gradient-to-t dark:from-black/45',
                            isMainColumn ? 'md:sticky z-[1] w-[min(32rem,85vw)] data-[scroll-state=scrolled]:md:shadow-right' : 'w-[14rem] z-0',
                        )}
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
};

export function AnimatedTableCell<TData>({ row, scrollState }: AnimatedTableCellProps<TData>) {
    return (
        <AnimatePresence mode="popLayout">
            {row.getVisibleCells().map((cell) => {
                const isMainColumn = cell.column.id === 'theses';
                return (
                    <TableCell
                        scope="col"
                        key={cell.id}
                        layout={!isMainColumn ? true : undefined}
                        motion={!isMainColumn}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: 'spring', bounce: 0.2 }}
                        data-column-id={cell.column.id}
                        data-state={row.getIsSelected() && 'selected'}
                        data-scroll-state={scrollState.left.isScrolled && 'scrolled'}
                        className={cn(
                            'left-0 align-top border-b p-4 bg-card data-[state=selected]:bg-accent transition-colors',
                            isMainColumn ? 'md:sticky z-[1] data-[scroll-state=scrolled]:md:shadow-right' : ''
                        )}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                )
            })}
        </AnimatePresence>
    )
}
