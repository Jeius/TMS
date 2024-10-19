import { columns } from '@/app/analytics/recent-activities-columns';
import { TableOptionsProps } from '@/app/browse/_components/table-options';
import { useDynamicWidth } from '@/hooks/use-dynamic-width';
import { Table as T } from '@tanstack/react-table';
import { useAnimate } from 'framer-motion';
import { debounce } from 'lodash';
import { FileStackIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { Button } from '../../../components/ui/button';
import { ScrollArea, ScrollBar } from '../../../components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow, } from '../../../components/ui/table';
import { TooltipProvider } from '../../../components/ui/tooltip';
import AnimatedTableCell from './animated-table-cell';
import AnimatedTableHead from './animated-table-head';
import { VisibilityColumn } from './column-visibility';

const TableOptions = dynamic(() => import('@/app/browse/_components/table-options')) as React.ComponentType<TableOptionsProps<any>>

type ThesesTableProps<TData> = React.HTMLAttributes<HTMLDivElement> & {
    table: T<TData>;
}

export default function ThesesTable<TData>({ table, ...props }: ThesesTableProps<TData>) {
    const [width, childRef] = useDynamicWidth();
    const [scope, animate] = useAnimate();
    const [scrollState, setScrollState] = React.useState({
        left: { value: 0, isScrolled: false },
    });

    const handleScrollLeft = debounce((e: Event) => {
        const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
        setScrollState(prevState => ({
            ...prevState,
            left: { value: scrollLeft, isScrolled: scrollLeft > 0 }
        }));
    }, 200, { leading: true });

    const handleScrollTop = debounce(() => {
        const currentRect = childRef.current?.getBoundingClientRect();
        const headerRect = document.getElementById("app-header")?.getBoundingClientRect();
        if (currentRect && headerRect) {
            const scrollTop = Math.max(0, headerRect.height - currentRect.top);
            animate("thead", {
                y: scrollTop,
                boxShadow: scrollTop > 0 ? "0 0 6px rgba(0, 0, 0, 0.15)" : undefined,
            }, { type: "tween", duration: 0 });
        }
    }, 0);

    React.useEffect(() => {
        window.addEventListener('scroll', handleScrollTop);
        const scrollArea = childRef.current?.querySelector('[data-radix-scroll-area-viewport]') as HTMLDivElement;
        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleScrollLeft);
        }

        return () => {
            if (scrollArea) {
                scrollArea.removeEventListener('scroll', handleScrollLeft);
            }
            window.removeEventListener('scroll', handleScrollTop);
        };
    }, []);

    return (
        <TooltipProvider>
            <div {...props}>
                {/* Table options and filters */}
                <div style={{ width }}
                    className="m-auto max-w-full box-content overflow-hidden bg-card text-card-foreground border border-b-0 rounded-t-xl shadow"
                >
                    <TableOptions table={table} />
                </div>

                {/* Scrollable table area */}
                <div className="relative">
                    <div className="m-auto bg-card shadow border max-w-fit overflow-hidden">
                        <ScrollArea
                            ref={childRef}
                            className="scroll-smooth whitespace-nowrap"
                        >
                            <div className="flex flex-1 text-sm">
                                <Table ref={scope} className="relative w-min h-full table-fixed sm:static whitespace-normal border-separate border-spacing-0">
                                    <TableHeader
                                        className="sticky top-0 z-10 text-xs hover:bg-transparent"
                                    >
                                        {table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id} className="align-top border-0 hover:bg-transparent">
                                                <AnimatedTableHead firstColumnId="title" headers={headerGroup.headers} scrollState={scrollState} />
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id} className="align-top hover:bg-transparent">
                                                    <AnimatedTableCell firstColumnId='title' row={row} scrollState={scrollState} />
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                    No records.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <div className="block border-l bg-card z-10">
                                    <VisibilityColumn table={table} />
                                </div>
                            </div>
                            <ScrollBar orientation="horizontal" className="z-10" />
                        </ScrollArea>
                    </div>
                </div>

                <div
                    className="m-auto max-w-full box-content overflow-hidden rounded-b-xl border border-t-0 py-3 bg-card text-card-foreground shadow"
                    style={{ width }}
                >
                    <Button size="lg"
                        variant="gradient"
                        className="p-2 sm:p-4 mx-auto flex space-x-2 font-sans"
                    >
                        <FileStackIcon aria-hidden="true" focusable="false" />
                        <strong>Load more theses</strong>
                    </Button>
                </div>
            </div>
        </TooltipProvider>
    );
}
