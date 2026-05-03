import { StorageKey } from "@/libs/enums/storage-key.enum";

export class StorageService {
  static getLastCity(fallback = "Sao Paulo") {
    if (typeof window === "undefined") {
      return fallback;
    }

    return window.localStorage.getItem(StorageKey.LastCity) ?? fallback;
  }

  static setLastCity(city: string) {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(StorageKey.LastCity, city);
  }
}
