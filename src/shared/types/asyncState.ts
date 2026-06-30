export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error' };

type AsyncDataTuple<T extends readonly AsyncState<unknown>[]> = {
  [K in keyof T]: T[K] extends AsyncState<infer R> ? R : never;
};

export function combineAsyncStates<T extends readonly AsyncState<unknown>[]>(
  ...states: T
): AsyncState<AsyncDataTuple<T>> {
  if (states.every((state) => state.status === 'idle')) {
    return { status: 'idle' };
  }

  if (states.some((state) => state.status === 'error')) {
    return { status: 'error' };
  }

  if (states.some((state) => state.status === 'loading' || state.status === 'idle')) {
    return { status: 'loading' };
  }

  return {
    status: 'success',
    data: states.map((state) => (state as { data: unknown }).data) as AsyncDataTuple<T>,
  };
}
