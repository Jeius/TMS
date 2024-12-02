import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useElementSize } from '@/lib/hooks/use-element-size';
import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { Check, ChevronsDownUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Spinner } from './ui/spinner';

export type ComboboxFunction = (
  page: number,
  search?: string
) => Promise<{
  items: string[];
  currentPage: number;
  nextPage: number | null;
  search?: string;
}>;

type ComboboxProps = React.ComponentPropsWithRef<typeof Button> & {
  id: string;
  queryFn: ComboboxFunction;
  onValueChanged?: (id: string, value?: string) => void;
  externalResetTrigger?: boolean;
};

export function Combobox({
  id,
  queryFn,
  className,
  defaultValue,
  variant = 'outline',
  externalResetTrigger,
  onValueChanged = () => {},
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [searchTerm, setSearchTerm] = useState('');
  const { ref: loaderRef, inView } = useInView();
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentSize = useElementSize(contentRef.current);
  const placeholder = id;

  const { data, status, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [id, 'filter', searchTerm],
      queryFn: async ({ pageParam }) => await queryFn(pageParam, searchTerm),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: !!id,
    });

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const item = e.currentTarget.value;
    const value = item === selectedValue ? undefined : item;
    setSelectedValue(value);
    onValueChanged(id, value);
    setOpen(false);
    setSearchTerm('');
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);

    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentHeight = Math.min(
        (contentSize?.height ?? Infinity) + 37,
        245
      );
      const availableSpace = window.innerHeight - triggerRect.bottom;
      const overlap = contentHeight - availableSpace;

      if (overlap > 0) {
        window.scrollBy({
          top: overlap + 16, // Adding a small buffer for padding.
          behavior: 'smooth',
        });
      }
    }
  }

  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    500,
    {
      trailing: true,
    }
  );

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage]);

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  useEffect(() => {
    if (externalResetTrigger) {
      setSelectedValue(undefined);
    }
  }, [externalResetTrigger]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant={variant}
          role="combobox"
          aria-expanded={open}
          data-selected={open}
          size="sm"
          className={cn('w-min justify-between text-xs capitalize', className)}
          {...props}
        >
          {selectedValue ? (
            <span className="font-semibold">{selectedValue}</span>
          ) : (
            <span className="dark:text-foreground/80">{placeholder}</span>
          )}
          <motion.span
            style={{ transformOrigin: 'center' }}
            animate={{ rotate: open ? 180 : 0 }}
            aria-hidden="true"
          >
            {open ? (
              <ChevronsDownUpIcon
                size="1rem"
                className="opacity-80 dark:opacity-50"
              />
            ) : (
              <ChevronsUpDownIcon
                size="1rem"
                className="opacity-80 dark:opacity-50"
              />
            )}
          </motion.span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 w-min min-w-40 p-0">
        <div className="flex items-center border-b px-3">
          <MagnifyingGlassIcon className="size-4 shrink-0 opacity-50" />
          <Input
            defaultValue={searchTerm}
            type="search"
            onChange={handleSearchChange}
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            className="flex w-full border-none px-2 text-xs shadow-none focus-visible:ring-0"
          />
        </div>
        <ScrollArea
          style={{
            height: contentSize
              ? `min(${contentSize.height / 16}rem, 13rem)`
              : undefined,
          }}
        >
          <div ref={contentRef}>
            {status === 'pending' ? (
              <div className="h-fit w-full p-2">
                <Spinner size="sm" />
              </div>
            ) : status === 'error' ? (
              <p className="w-full py-4 text-center text-xs">
                Error fetching from database
              </p>
            ) : (
              <ul className="flex flex-col space-y-1 p-2">
                {data?.pages.map(({ items, currentPage }) => (
                  <React.Fragment key={currentPage}>
                    {items?.length
                      ? items?.map((item) => (
                          <li key={item}>
                            <Button
                              variant="ghost"
                              size="sm"
                              value={item}
                              onClick={handleClick}
                              className="w-full justify-start"
                            >
                              <Check
                                className={cn(
                                  'mr-2 size-4',
                                  selectedValue === item
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              <span className="whitespace-nowrap text-xs font-semibold capitalize">
                                {item}
                              </span>
                            </Button>
                          </li>
                        ))
                      : searchTerm && (
                          <li className="w-full py-4 text-center text-xs">
                            No results found...
                          </li>
                        )}
                  </React.Fragment>
                ))}

                <li ref={loaderRef} className="w-full">
                  <Spinner size="xs" show={isFetchingNextPage} />
                </li>
              </ul>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
