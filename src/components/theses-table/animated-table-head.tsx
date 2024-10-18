import { TableHead } from '@/components/ui/table';
import { flexRender, Header } from '@tanstack/react-table';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

type AnimatedTableHeadProps<TData, TValue> = {
    headers: Header<TData, TValue>[];
    scrollState: { left: { isScrolled: boolean } };
    firstColumnId: string;
};

export default function AnimatedTableHead<TData, TValue>({
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
                        motion
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: 'spring', bounce: 0.2 }}
                        data-scroll-state={scrollState.left.isScrolled && 'scrolled'}
                        className={`left-0 px-4 border-b bg-muted bg-gradient-to-b from-white/75 dark:bg-gradient-to-t dark:from-black/45 ${isFirstColumn ? 'md:sticky z-[1] data-[scroll-state=scrolled]:md:shadow-right' : 'z-0'}`}
                        style={{
                            width: header.column.getSize(),
                            borderTop: scrollState.left.isScrolled ? '1px solid hsl(var(--border))' : '',
                        }}
                    >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                );
            })}
        </AnimatePresence>
    );
}
