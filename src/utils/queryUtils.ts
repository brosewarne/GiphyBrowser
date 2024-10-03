import { PagedQueryResult } from "@app/models";

export const addUniqueId = (data: PagedQueryResult): PagedQueryResult => {
  const allIds: string[] = [];
  return {
    pageParams: data.pageParams,
    pages: data.pages.map(({ data, meta, pagination }) => ({
      meta,
      pagination,
      data: data.map((d) => {
        let id = d.id;
        if (allIds.includes(d.id)) {
          const count = 1;
          id = `${d.id}-${count + 1}`;
        }
        allIds.push(d.id);
        return { ...d, uniqueId: id };
      }),
    })),
  };
};
