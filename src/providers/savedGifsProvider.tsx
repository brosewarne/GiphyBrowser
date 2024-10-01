import React, { ReactNode, createContext } from "react";

import { useSavedGifIds } from "./useSavedGifIds";
import { db } from "@app/utils";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

interface SavedGifsState {
  savedGifs: string[] | undefined;
  savedGifsLoaded: boolean | undefined;
  addSavedGif: UseMutationResult<number, Error, string, unknown> | null;
  removeSavedGif: UseMutationResult<void, Error, number, unknown> | null;
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
  },
});

export function SavedGifsProvider({ children }: { children: ReactNode }) {
  const { data: savedGifs, isFetching, refetch } = useSavedGifIds();

  const addSavedGif = useMutation({
    mutationFn: (gifId: string) => {
      return db.savedGifs.add({
        giphyId: gifId,
      });
    },
    // I'm not 100% happy with this, but I can't find a way to supply a unique-per-query key for react-query from the dexie db
    onSuccess: () => refetch(),
  });

  const removeSavedGif = useMutation({
    mutationFn: (gifId: number) => {
      return db.savedGifs.delete(gifId);
    },
    // I'm not 100% happy with this, but I can't find a way to supply a unique-per-query key for react-query from the dexie db
    onSuccess: () => refetch(),
  });

  return (
    <SavedContext.Provider
      value={{
        savedGifsState: {
          savedGifs,
          savedGifsLoaded: !isFetching,
          addSavedGif,
          removeSavedGif,
        },
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}
