import { TableCell, TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { flexRender, Header, Row } from '@tanstack/react-table';
import ResizeHandle from './resize-handle';

type AnimatedTableHeadProps<TData, TValue> = {
    headers: Header<TData, TValue>[];
    scrollState: { left: { isScrolled: boolean } };
};

export function AnimatedTableHead<TData, TValue>({
    headers, scrollState
}: AnimatedTableHeadProps<TData, TValue>) {
    return (headers.map(header => {
        const isPinned = header.column.getIsPinned();
        const isResizing = header.column.getIsResizing();
        return (
            <TableHead
                key={header.id}
                id={header.id}
                scope="col"
                data-scrolled={scrollState.left.isScrolled}
                className={cn(
                    'left-0 px-4 border-y bg-muted bg-gradient-to-b from-white/75 dark:bg-gradient-to-t dark:from-black/45',
                    isPinned ? 'md:sticky z-[1] data-[scrolled=true]:md:shadow-right' : 'relative z-0',
                    isResizing ? 'pointer-events-none' : 'pointer-events-auto'
                )}
                style={{ width: `calc(var(--header-${header?.id}-size) * 1px)`, }}
            >
                {flexRender(header.column.columnDef.header, header.getContext())}

                <ResizeHandle
                    data-resizing={isResizing}
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    onDoubleClick={() => header.column.resetSize()}
                />
            </TableHead>
        );
    })
    );
}

type AnimatedTableCellProps<TData> = {
    row: Row<TData>;
    scrollState: { left: { isScrolled: boolean } };
};

export function AnimatedTableCell<TData>({ row, scrollState }: AnimatedTableCellProps<TData>) {
    return (row.getVisibleCells().map((cell) => {
        const isPinnedLeft = cell.column.getIsPinned() === 'left';
        const isResizing = cell.column.getIsResizing();
        return (
            <TableCell
                scope="col"
                key={cell.id}
                data-column-id={cell.column.id}
                data-state={row.getIsSelected() && 'selected'}
                data-scrolled={scrollState.left.isScrolled}
                className={cn(
                    'left-0 align-top border-b p-4 bg-card data-[state=selected]:bg-accent transition-colors',
                    isPinnedLeft ? 'md:sticky z-[1] data-[scrolled=true]:md:shadow-right' : '',
                    isResizing ? 'pointer-events-none' : 'pointer-events-auto',
                )}
                style={{ width: `calc(var(--col-${cell.column.id}-size) * 1px)` }}
            >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
        );
    })
    );
}
