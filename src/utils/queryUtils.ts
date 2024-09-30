import { PagedQueryResult } from "@app/models";

export const addUniqueId = (data: PagedQueryResult): PagedQueryResult => {
  return {
    pageParams: data.pageParams,
    pages: data.pages.map(({ data, meta, pagination }) => ({
      meta,
      pagination,
      data: data.map((d) => ({ ...d, uniqueId: crypto.randomUUID() })),
    })),
  };
};
