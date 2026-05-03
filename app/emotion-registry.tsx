"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useState } from "react";

export function EmotionRegistry({ children }: PropsWithChildren) {
  const [{ cache, flush }] = useState(() => {
    const emotionCache = createCache({ key: "ow" });
    emotionCache.compat = true;

    const prevInsert = emotionCache.insert;
    let inserted: string[] = [];

    emotionCache.insert = (...args) => {
      const serialized = args[1];
      if (emotionCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flushInserted = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache: emotionCache, flush: flushInserted };
  });

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
