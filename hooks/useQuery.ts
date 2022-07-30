import { useState, useEffect, DependencyList } from "react";

const cache = new WeakMap();

type CacheKey = { path: string; param: Record<string, any> };

type PromiseType<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never;

const initialState = { data: undefined, loading: false, error: undefined };

export const useQuery = <TAsyncFn extends () => Promise<unknown>>(
  cacheKey: CacheKey,
  asyncFn: TAsyncFn,
  deps: DependencyList
) => {
  const [state, setState] = useState<{
    data: PromiseType<ReturnType<TAsyncFn>> | undefined;
    loading: boolean;
    error: Error | undefined;
  }>(initialState);
  const [keys, setKeys] = useState<object[]>([]);

  useEffect(() => {
    const _key = keys.find(
      (k) => JSON.stringify(k) === JSON.stringify(cacheKey)
    );
    const cachedData = cache.get(_key ?? {});

    if (cachedData) {
      return setState((prev) => ({ ...prev, data: cachedData }));
    }

    setState((prev) => ({ ...prev, loading: true }));
    asyncFn().then(
      (res) => {
        setState((prev) => ({
          ...prev,
          data: res as PromiseType<ReturnType<TAsyncFn>>,
          loading: false,
        }));
        cache.set(cacheKey ?? {}, res);
        setKeys([...keys, cacheKey]);

        return res;
      },
      (err) => {
        setState((prev) => ({ ...prev, error: err, loading: false }));
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);

  return state;
};
