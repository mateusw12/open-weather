"use client";

import { useCallback, useState } from "react";
import { StorageService } from "@/libs/services/storage.service";

export function useWeatherStorage(initialCity = "Sao Paulo") {
  const [city, setCity] = useState(() => StorageService.getLastCity(initialCity));

  const saveCity = useCallback((value: string) => {
    setCity(value);
    StorageService.setLastCity(value);
  }, []);

  return { city, saveCity };
}
