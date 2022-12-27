import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from 'renderer/utils/useLocalStorage';

jest.mock('electron', () => ({
  ipcRenderer: {
    send: jest.fn(),
    removeAllListeners: jest.fn(),
    on: jest.fn(),
  },
}));

describe('useLocalStorage', () => {
  it('should get value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'test'));
    expect(result.current[0]).toBe('test');
  });

  it('should set value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'test'));
    const [, setValue] = result.current;
    act(() => {
      setValue('test2');
    });
    expect(result.current[0]).toBe('test2');
  });
});
