import Dexie, { EntityTable } from "dexie";

interface SavedGiphyGif {
  id: number;
  giphyId: string;
}

const db = new Dexie("GiphyBrowserDB") as Dexie & {
  savedGifs: EntityTable<SavedGiphyGif, "id">;
};
db.version(1).stores({
  savedGifs: "++id, giphyId", // Primary key and indexed props
});

export type { SavedGiphyGif };
export { db };
