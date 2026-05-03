"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "open-weather:last-city";

export function useWeatherStorage(initialCity = "Sao Paulo") {
  const [city, setCity] = useState(() => {
    if (typeof window === "undefined") {
      return initialCity;
    }

    return window.localStorage.getItem(STORAGE_KEY) ?? initialCity;
  });

  const saveCity = useCallback((value: string) => {
    setCity(value);
    window.localStorage.setItem(STORAGE_KEY, value);
  }, []);

  return { city, saveCity };
}
