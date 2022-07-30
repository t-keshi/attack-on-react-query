import { useState, useEffect, DependencyList } from "react";

type PromiseType<T extends Promise<any>> = T extends Promise<infer P>
  ? P
  : never;

const initialState = { data: undefined, loading: false, error: undefined };

export const useAsync = <TAsyncFn extends () => Promise<unknown>>(
  asyncFn: TAsyncFn,
  deps: DependencyList
) => {
  const [state, setState] = useState<{
    data: PromiseType<ReturnType<TAsyncFn>> | undefined;
    loading: boolean;
    error: Error | undefined;
  }>(initialState);

  useEffect(() => {
    setState((prev) => ({ ...prev, loading: true }));

    asyncFn().then(
      (res) => {
        console.log(res);
        setState((prev) => ({
          ...prev,
          data: res as PromiseType<ReturnType<TAsyncFn>>,
          loading: false,
        }));

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
