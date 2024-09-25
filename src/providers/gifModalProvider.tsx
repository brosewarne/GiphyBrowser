import { GiphyGif } from "@app/models";
import React, { ReactNode, useState, createContext } from "react";

export interface IGifModalContext {
  gifData: GiphyGif | null;
  setGifData: React.Dispatch<React.SetStateAction<GiphyGif | null>>;
}

export const GifModalContext = createContext<IGifModalContext>({
  gifData: null,
  setGifData: () => {},
});

export function GifModalProvider({ children }: { children: ReactNode }) {
  const [gifData, setGifData] = useState<GiphyGif | null>(null);

  return (
    <GifModalContext.Provider value={{ gifData, setGifData }}>
      {children}
    </GifModalContext.Provider>
  );
}
