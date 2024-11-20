import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type HashParams = { [key: string]: string };

export function useHashParams(): HashParams {
  const router = useRouter();
  const [hashParams, setHashParams] = useState<HashParams>({});

  useEffect(() => {
    const parseHashParams = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.substring(1));
      const result: HashParams = {};

      params.forEach((value, key) => {
        result[key] = value;
      });

      setHashParams(result);
    };

    parseHashParams();
  }, [router]);

  return hashParams;
}
