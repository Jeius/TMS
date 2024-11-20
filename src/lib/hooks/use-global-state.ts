import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

function useGlobalState<T>(
  key: string,
  initialValue: T
): [T, (newValue: T | ((prev: T) => T)) => void] {
  const queryClient = useQueryClient();

  // Fetch the global state or set the initial value if it's not in the cache
  const { data: state } = useQuery<T>({
    queryKey: [key],
    queryFn: () => initialValue,
    staleTime: Infinity, // Ensures the data is treated as always fresh
    enabled: false, // Prevents the query from automatically refetching
  });

  // Setter function to update the global state
  const setState = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      queryClient.setQueryData<T>([key], (oldValue) =>
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(oldValue as T)
          : newValue
      );
    },
    [key, queryClient]
  );

  return [state ?? initialValue, setState];
}

export default useGlobalState;
