import Dexie, { EntityTable } from "dexie";

interface SavedGiphyGif {
  id: number;
  giphyId: string;
}

const savedItemsdb = new Dexie("GiphyBrowserDB") as Dexie & {
  savedGifs: EntityTable<SavedGiphyGif, "id">;
};
savedItemsdb.version(1).stores({
  savedGifs: "++id, giphyId", // Primary key and indexed props
});

export async function getSavedGifs(): Promise<SavedGiphyGif[]> {
  return savedItemsdb.table("savedGifs").toArray();
}

export type { SavedGiphyGif };
export { savedItemsdb };
