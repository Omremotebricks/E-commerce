import { useEffect, useState } from "react";

function useLocalStorage(key, initialData) {
  const [data, setData] = useState(() => {
    try {
      const storedData = localStorage.getItem(key);
      return storedData ? JSON.parse(storedData) : initialData;
    } catch (error) {
      console.error(error);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }, [key, data]);

  return [data, setData];
}

export default useLocalStorage;
