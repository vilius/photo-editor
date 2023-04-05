import { renderHook, act } from '@testing-library/react';
import { usePersistentState } from './usePersistentState';

describe('usePersistentState', () => {
  it('preserves state when using same key', () => {
    const { result: instance1 } = renderHook(() =>
      usePersistentState('test-1', 0)
    );

    {
      const [state, setState] = instance1.current;
      expect(state).toBe(0);

      act(() => {
        setState(1);
      });
    }

    expect(instance1.current[0]).toBe(1);

    const { result: instance2 } = renderHook(() =>
      // Shares same key as instance1
      usePersistentState('test-1', 100)
    );

    {
      const [state] = instance2.current;
      expect(state).toBe(1);
    }

    const { result: instance3 } = renderHook(() =>
      usePersistentState('test-unique', 100)
    );
    expect(instance3.current[0]).toBe(100);
  });
});
