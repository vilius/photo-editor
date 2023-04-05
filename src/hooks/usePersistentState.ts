import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

// React Hook that uses setState but persists values to localStorage
// On Mount it will check localStorage for a value and use that if it exists.
// On Update it will update localStorage with the new value.
//
// Usage:
// const [variable, setVariable] = usePersistentState('key', 'default value');
export function usePersistentState<T>(
  globalUniqueKey: Array<string | undefined | null> | string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const key = Array.isArray(globalUniqueKey)
    ? globalUniqueKey.join('-')
    : globalUniqueKey;
  const [localStorageValue, setLocalStorageValue] = useLocalStorage(
    `use-persistent-state-${key}`,
    defaultValue
  );

  const [state, setState] = useState(localStorageValue);

  useEffect(() => {
    setLocalStorageValue(state);
  }, [state, setLocalStorageValue]);

  return [state, setState];
}
