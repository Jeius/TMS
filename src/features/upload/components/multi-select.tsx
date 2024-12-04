import {
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
  useMultiSelect,
} from '@/components/ui/multi-select';
import { Spinner } from '@/components/ui/spinner';
import { useInfiniteQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export type MultiSelectItem = { id: string | number; value: string };

export type MultiSelectFunction = (
  page: number,
  search?: string
) => Promise<{
  items: MultiSelectItem[];
  currentPage: number;
  nextPage: number | null;
  search?: string;
}>;

type MultiSelectProps = {
  id: string;
  placeholder: string;
  queryFn: MultiSelectFunction;
};

export default function MultiSelect({
  id,
  placeholder = 'Select an option',
  queryFn,
}: MultiSelectProps) {
  const { ref: loaderRef, inView } = useInView();
  const { inputValue, setInputValue, activeIndex } = useMultiSelect();

  const { data, status, fetchNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: [id, 'select', inputValue],
      queryFn: async ({ pageParam }) => await queryFn(pageParam, inputValue),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: !!id,
    });

  const handleSearchChange = debounce(
    (value: string) => (activeIndex === -1 ? setInputValue(value) : undefined),
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
    if (inputValue) {
      refetch();
    }
  }, [inputValue, refetch]);

  return (
    <>
      <MultiSelectorTrigger>
        <MultiSelectorInput
          value={inputValue}
          onValueChange={handleSearchChange}
          placeholder={placeholder}
        />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {status === 'pending' ? (
            <div className="h-fit w-full p-2">
              <Spinner size="sm" />
            </div>
          ) : status === 'error' ? (
            <p className="w-full py-4 text-center text-xs">
              Error fetching from database
            </p>
          ) : (
            data.pages.map(({ items }) =>
              items.length
                ? items.map(({ id, value }) => (
                    <MultiSelectorItem
                      key={id}
                      value={value}
                      className="capitalize"
                    >
                      {value}
                    </MultiSelectorItem>
                  ))
                : inputValue && null
            )
          )}
          <div ref={loaderRef} className="w-full">
            <Spinner size="xs" show={isFetchingNextPage} />
          </div>
        </MultiSelectorList>
      </MultiSelectorContent>
    </>
  );
}
