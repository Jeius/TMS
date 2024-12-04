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
import { Separator } from './ui/separator';
import { Spinner } from './ui/spinner';

export type ComboboxItem = { id: string | number; value?: string };

export type ComboboxFunction = (
  page: number,
  search?: string
) => Promise<{
  items: ComboboxItem[];
  currentPage: number;
  nextPage: number | null;
  search?: string;
}>;

type ComboboxProps = React.ComponentPropsWithRef<typeof Button> & {
  id: string;
  placeholder: string;
  queryFn: ComboboxFunction;
  onItemChanged?: (id: string, item?: ComboboxItem) => void;
  externalResetTrigger?: boolean;
};

export function Combobox({
  id,
  queryFn,
  className,
  placeholder,
  defaultValue,
  variant = 'outline',
  externalResetTrigger,
  onItemChanged = () => {},
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | undefined>({
    id: '',
    value: defaultValue ? String(defaultValue) : undefined,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { ref: loaderRef, inView } = useInView();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const trigger = triggerRef.current;
  const popoverRef = useRef<HTMLDivElement>(null);
  const popoverSize = useElementSize(popoverRef);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollAreaSize = useElementSize(scrollAreaRef);

  const { data, status, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [id, 'filter', searchTerm],
      queryFn: async ({ pageParam }) => await queryFn(pageParam, searchTerm),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: !!id,
    });

  function handleSelect(item: ComboboxItem) {
    const newItem = item.value === selectedItem?.value ? undefined : item;
    setSelectedItem(newItem);
    onItemChanged(id, newItem);
    setOpen(false);
    setSearchTerm('');
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
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
      setSelectedItem(undefined);
    }
  }, [externalResetTrigger]);

  useEffect(() => {
    if (trigger && popoverSize) {
      const triggerRect = trigger.getBoundingClientRect();
      const popoverHeight = popoverSize.height;
      const availableSpace = window.innerHeight - triggerRect.bottom;
      const overlap = popoverHeight - availableSpace;

      if (open && overlap > 0) {
        window.scrollBy({
          top: overlap + 8,
          behavior: 'smooth',
        });
      }
    }
  }, [open, popoverSize, trigger]);

  return (
    <Popover key={`${id}-combobox`} open={open} onOpenChange={handleOpenChange}>
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
          {selectedItem?.value ? (
            <span className="font-semibold">{selectedItem.value}</span>
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
      <PopoverContent
        ref={popoverRef}
        id={`${id}-combobox-content`}
        className="z-40 flex w-min min-w-40 flex-col p-0 data-[side=top]:flex-col-reverse"
      >
        <div className="flex items-center px-3">
          <MagnifyingGlassIcon className="size-4 shrink-0 opacity-50" />
          <Input
            defaultValue={searchTerm}
            type="search"
            onChange={handleSearchChange}
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            className="flex w-full border-none px-2 text-xs shadow-none focus-visible:ring-0"
          />
        </div>
        <Separator />
        <ScrollArea
          ref={scrollAreaRef}
          className="max-h-52"
          style={{
            height: scrollAreaSize
              ? `min(${scrollAreaSize.height / 16}rem, 13rem)`
              : undefined,
          }}
        >
          {status === 'pending' ? (
            <div className="h-fit w-full p-2">
              <Spinner size="sm" />
            </div>
          ) : status === 'error' ? (
            <p className="w-full py-4 text-center text-xs">
              Error fetching from database
            </p>
          ) : (
            <ul className="flex flex-col p-2">
              {data?.pages.map(({ items, currentPage }) => (
                <React.Fragment key={currentPage}>
                  {items?.length
                    ? items?.map(({ id, value }) => (
                        <li key={value}>
                          <Button
                            variant="ghost"
                            value={value}
                            onClick={() => handleSelect({ id, value })}
                            className="h-fit w-full justify-start p-2"
                          >
                            <Check
                              className={cn(
                                selectedItem?.value === value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            <span className="whitespace-nowrap text-xs font-semibold capitalize">
                              {value}
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
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
