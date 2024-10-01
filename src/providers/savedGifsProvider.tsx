import React, { ReactNode, createContext } from "react";

import { useSavedGifIds } from "./useSavedGifIds";

interface SavedGifsState {
  savedGifs: string[] | undefined;
  savedGifsLoaded: boolean | undefined;
}

interface ISavedGifsContext {
  savedGifsState: SavedGifsState;
}

export const SavedContext = createContext<ISavedGifsContext>({
  savedGifsState: { savedGifs: [], savedGifsLoaded: false },
});

export function SavedGifsProvider({ children }: { children: ReactNode }) {
  const { data: savedGifs, isFetching } = useSavedGifIds();

  return (
    <SavedContext.Provider
      value={{ savedGifsState: { savedGifs, savedGifsLoaded: !isFetching } }}
    >
      {children}
    </SavedContext.Provider>
  );
}
