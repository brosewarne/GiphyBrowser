/**
 * Simple hook for setting saved gif ids on localStorage.
 *
 * If save is true, then gifId is added to the savedItemsContext and then saved to localStorage
 * If save is false, then gifId is removed from the savedItemsContext and then removed from localStorage
 *
 * The list of saved ids is only read from localStorage once when the app starts and then maintained in context and
 * written back to localStorage when changes are made
 */
export function useGifLocalStorage({
  gifId,
  save,
  savedItemIds,
}: {
  gifId: string;
  save: boolean;
  savedItemIds: string;
}) {
  let newGifIds;
  if (save) {
    newGifIds = !!savedItemIds.length ? `${savedItemIds},${gifId}` : gifId;
  } else {
    newGifIds = savedItemIds
      .split(",")
      .filter((id) => id !== gifId)
      .join(",");
  }

  localStorage.setItem("savedItemIds", newGifIds);
  return newGifIds;
}
