import { columns } from '@/app/analytics/_components/recent-activities-columns';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow, } from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Table as Tb } from '@tanstack/react-table';
import { useAnimate } from 'framer-motion';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { AnimatedTableCell, AnimatedTableHead } from './animated-table-elements';
import { VisibilityColumn } from './column-visibility';

type ThesesTableContentProps<TData> = {
    table: Tb<TData>;
}

export default function ThesesTableContent<TData>({ table }: ThesesTableContentProps<TData>) {
    const [scope, animate] = useAnimate();
    const [scrollState, setScrollState] = useState({ left: { value: 0, isScrolled: false } });
    const { refetch: updateWidth } = useQuery({
        queryKey: ['tableWidth'], refetchOnMount: false, staleTime: Infinity,
        queryFn: () => {
            if (scope.current) {
                return `${scope.current.offsetWidth}px`;
            }
            return 'auto';
        },
    });

    useEffect(() => {
        const current = scope.current;
        const resizeObserver = new ResizeObserver(() => { updateWidth() });
        scope.current && resizeObserver.observe(scope.current);
        return () => { current && resizeObserver.unobserve(current) };
    }, [scope, updateWidth]);

    useEffect(() => {
        const handleScrollLeft = debounce((e: Event) => {
            const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
            setScrollState(prevState => ({
                ...prevState,
                left: { value: scrollLeft, isScrolled: scrollLeft > 0 }
            }));
        }, 200, { leading: true });

        const handleScrollTop = debounce(() => {
            const currentRect = scope.current?.getBoundingClientRect();
            const headerRect = document.getElementById('app-header')?.getBoundingClientRect();
            if (currentRect && headerRect) {
                const scrollTop = Math.max(0, headerRect.height - currentRect.top);
                animate('thead', {
                    y: scrollTop,
                    boxShadow: scrollTop > 0 ? '0 0 6px rgba(0, 0, 0, 0.15)' : undefined,
                }, { type: 'tween', duration: 0 });
            }
        }, 0);

        window.addEventListener('scroll', handleScrollTop);
        const scrollArea = scope.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
        scrollArea && scrollArea.addEventListener('scroll', handleScrollLeft);
        return () => {
            scrollArea && scrollArea.removeEventListener('scroll', handleScrollLeft);
            window.removeEventListener('scroll', handleScrollTop);
        };
    }, [scope, animate]);

    return (
        <ScrollArea
            ref={scope}
            className="scroll-smooth whitespace-nowrap max-w-fit"
        >
            <div className="flex flex-1 text-sm">
                <Table className="relative w-min h-full table-fixed sm:static whitespace-normal border-separate border-spacing-0">
                    <TableHeader className="sticky top-0 z-10 text-xs hover:bg-transparent">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="align-top border-0 hover:bg-transparent">
                                <AnimatedTableHead firstColumnId="title" headers={headerGroup.headers} scrollState={scrollState} />
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length
                            ? (table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} className="align-top hover:bg-transparent">
                                    <AnimatedTableCell firstColumnId='title' row={row} scrollState={scrollState} />
                                </TableRow>
                            )))
                            : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No records.
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
                {table.getAllColumns().filter(column => column.getCanHide() && !column.getIsVisible()).length
                    ? (
                        <div className="block border-l border-y bg-card/80 z-10 lg:pr-20">
                            <VisibilityColumn table={table} />
                        </div>
                    ) : (null)}
            </div>
            <ScrollBar orientation="horizontal" className="z-10" />
        </ScrollArea>
    );
}
