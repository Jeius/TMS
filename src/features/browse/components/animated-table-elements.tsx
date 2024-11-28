import { TableCell, TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { flexRender, Header, Row } from '@tanstack/react-table';
import { ScrollState } from '../lib/types';
import ResizeHandle from './resize-handle';

type AnimatedTableHeadProps<TData, TValue> = {
  headers: Header<TData, TValue>[];
  scrollState: ScrollState;
};

export function AnimatedTableHead<TData, TValue>({
  headers,
  scrollState,
}: AnimatedTableHeadProps<TData, TValue>) {
  return headers.map((header) => {
    const isPinned = header.column.getIsPinned();
    const isResizing = header.column.getIsResizing();
    return (
      <TableHead
        key={header.id}
        id={header.id}
        scope="col"
        data-scrolled={scrollState.left.isScrolled}
        className={cn(
          'relative left-0 h-14 border-y bg-muted bg-gradient-to-b from-white/75 px-4 dark:bg-gradient-to-t dark:from-black/45',
          isPinned
            ? 'z-[1] md:sticky data-[scrolled=true]:md:shadow-right'
            : 'z-0',
          isResizing ? 'pointer-events-none' : 'pointer-events-auto'
        )}
        style={{ width: `calc(var(--header-${header?.id}-size) * 1px)` }}
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
  });
}

type AnimatedTableCellProps<TData> = {
  row: Row<TData>;
  scrollState: ScrollState;
};

export function AnimatedTableCell<TData>({
  row,
  scrollState,
}: AnimatedTableCellProps<TData>) {
  return row.getVisibleCells().map((cell) => {
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
          'left-0 border-b bg-card p-0 transition-colors data-[state=selected]:bg-accent',
          isPinnedLeft
            ? 'align-center z-[1] md:sticky data-[scrolled=true]:md:shadow-right'
            : 'align-top',
          isResizing ? 'pointer-events-none' : 'pointer-events-auto'
        )}
        style={{ width: `calc(var(--col-${cell.column.id}-size) * 1px)` }}
      >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </TableCell>
    );
  });
}
