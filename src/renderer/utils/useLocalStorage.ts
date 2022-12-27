import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { EVENT_CALL_NAME } from '../../constants';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    ipcRenderer.send(EVENT_CALL_NAME.GET_LOCAL_FROM_STORAGE, key);
    // istanbul ignore next
    ipcRenderer.on(EVENT_CALL_NAME.GET_LOCAL_FROM_STORAGE, (_, data) => {
      setStoredValue(data);
    });

    return () => {
      ipcRenderer.removeAllListeners(EVENT_CALL_NAME.GET_LOCAL_FROM_STORAGE);
    };
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    ipcRenderer.send(EVENT_CALL_NAME.GET_LOCAL_FROM_STORAGE, {
      key,
      value,
    });
  };

  return [storedValue, setValue] as const;
};
