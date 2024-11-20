import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import {
  Check,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  Loader2,
} from 'lucide-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ScrollArea } from './ui/scroll-area';

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
  onValueChanged?: (value?: string) => void;
  id: string;
  queryFn: ComboboxFunction;
};

export function Combobox({
  defaultValue,
  className,
  variant = 'outline',
  onValueChanged = () => {},
  id,
  queryFn,
  ...props
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [searchTerm, setSearchTerm] = useState('');
  const { ref: loaderRef, inView } = useInView();
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
    onValueChanged(value);
    setOpen(false);
    setSearchTerm('');
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          role="combobox"
          aria-expanded={open}
          data-selected={open}
          size="sm"
          className={cn('w-min justify-between text-xs capitalize', className)}
          {...props}
        >
          {selectedValue ? (
            <span className="mr-2 font-semibold">{selectedValue}</span>
          ) : (
            <span className="mr-2 text-foreground/80">{placeholder}</span>
          )}
          <motion.div
            style={{ transformOrigin: 'center' }}
            animate={{ rotate: open ? 180 : 0 }}
            aria-hidden="true"
          >
            {open ? (
              <ChevronsDownUpIcon size={16} className="opacity-50" />
            ) : (
              <ChevronsUpDownIcon size={16} className="opacity-50" />
            )}
          </motion.div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 w-min min-w-36 p-0">
        <div className="flex items-center border-b px-3">
          <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            defaultValue={searchTerm}
            onChange={handleSearchChange}
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            className={cn(
              'flex h-10 w-full rounded-md bg-transparent py-3 text-xs font-semibold outline-none',
              'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
            )}
          />
        </div>
        <ScrollArea className="h-min max-h-52">
          {status === 'pending' ? (
            <div className="h-fit w-full p-2">
              <Loader2 className="m-auto size-4 animate-spin" />
            </div>
          ) : status === 'error' ? (
            <p className="w-full py-4 text-center text-xs">
              Error fetching from database
            </p>
          ) : (
            <ul className="flex flex-col space-y-1 p-2">
              {data?.pages.map(({ items, currentPage }) => (
                <React.Fragment key={currentPage}>
                  {items?.length ? (
                    items?.map((item) => (
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
                              'mr-2 h-4 w-4',
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
                  ) : (
                    <li className="w-full py-4 text-center text-xs">
                      No results found...
                    </li>
                  )}
                </React.Fragment>
              ))}

              <li ref={loaderRef} className="w-full">
                {isFetchingNextPage && (
                  <Loader2 className="m-auto size-4 animate-spin" />
                )}
              </li>
            </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
