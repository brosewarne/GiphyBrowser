import React, { ReactNode, createContext, useState } from "react";

import { useSavedGifIds } from "./useSavedGifIds";
import { db } from "@app/utils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface SavedGifsState {
  savedGifs: string[] | undefined;
  savedGifsLoaded: boolean | undefined;
  addSavedGif: UseMutationResult<number, Error, string, unknown> | null;
  removeSavedGif: UseMutationResult<void, Error, number, unknown> | null;
  version: number;
}

interface ISavedGifsContext {
  savedGifsState: SavedGifsState;
}

export const SavedContext = createContext<ISavedGifsContext>({
  savedGifsState: {
    savedGifs: [],
    savedGifsLoaded: false,
    addSavedGif: null,
    removeSavedGif: null,
    version: 0,
  },
});

export function SavedGifsProvider({ children }: { children: ReactNode }) {
  const [version, setVersion] = useState(0);
  const { data: savedGifs, isFetching } = useSavedGifIds(version);

  const addSavedGif = useMutation({
    mutationFn: (gifId: string) => {
      return db.savedGifs.add({
        giphyId: gifId,
      });
    },
    // version is used for the queryKey when fetching the saved gif ids from indexedDB
    onSuccess: () => setVersion(version + 1),
  });

  const removeSavedGif = useMutation({
    mutationFn: (gifId: number) => {
      return db.savedGifs.delete(gifId);
    },
    // version is used for the queryKey when fetching the saved gif ids from indexedDB
    onSuccess: () => setVersion(version + 1),
  });

  return (
    <SavedContext.Provider
      value={{
        savedGifsState: {
          savedGifs,
          savedGifsLoaded: !isFetching,
          addSavedGif,
          removeSavedGif,
          version,
        },
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}
