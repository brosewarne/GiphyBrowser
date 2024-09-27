import { db, SavedGiphyGif } from "@app/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React, { ReactNode, useState, createContext, useEffect } from "react";

interface ISavedGifsContext {
  gifs: string[] | undefined;
  setGifs: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export const SavedContext = createContext<ISavedGifsContext>({
  gifs: [],
  setGifs: () => {},
});

export function SavedGifsProvider({ children }: { children: ReactNode }) {
  const [savedGifs, savedGifsLoaded] = useLiveQuery(
    () =>
      db.savedGifs
        ?.toArray()
        .then((items: SavedGiphyGif[]) => [
          items.map((item) => item.giphyId).reverse(),
          true,
        ]),
    [db],
    [],
  );

  const [gifs, setGifs] = useState<string[] | undefined>([]);

  useEffect(() => {
    if (savedGifs) {
      setGifs(savedGifs);
    }
  }, [savedGifs, savedGifsLoaded]);

  return (
    <SavedContext.Provider value={{ gifs, setGifs }}>
      {children}
    </SavedContext.Provider>
  );
}
