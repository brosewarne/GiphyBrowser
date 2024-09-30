import { db, SavedGiphyGif } from "@app/utils";
import { useLiveQuery } from "dexie-react-hooks";
import React, { ReactNode, useState, createContext, useEffect } from "react";

interface SavedGifsState {
  savedGifs: string[] | undefined;
  savedGifsLoaded: boolean | undefined;
}

interface ISavedGifsContext {
  savedGifsState: SavedGifsState;
  setSavedGifsState: React.Dispatch<React.SetStateAction<SavedGifsState>>;
}

export const SavedContext = createContext<ISavedGifsContext>({
  savedGifsState: { savedGifs: [], savedGifsLoaded: false },
  setSavedGifsState: () => {},
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

  const [savedGifsState, setSavedGifsState] = useState<SavedGifsState>({
    savedGifs,
    savedGifsLoaded,
  });

  // useEffect to update the savedGifs on state when the indexedDB contents change. The app will access the savedGifs
  // from state rather than reading from indexedDB all the time
  useEffect(() => {
    if (savedGifs) {
      setSavedGifsState({savedGifs, savedGifsLoaded});
    }
  }, [savedGifs, savedGifsLoaded]);

  return (
    <SavedContext.Provider value={{ savedGifsState, setSavedGifsState }}>
      {children}
    </SavedContext.Provider>
  );
}
