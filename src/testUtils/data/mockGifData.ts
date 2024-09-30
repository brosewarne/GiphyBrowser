import { GiphyGif } from "@app/models";

export const mockGifData = {
  type: "sports",
  id: "1234",
  url: "http://abc.com",
  title: "SomeGif",
  uniqueId: "a",
  images: {
    original: {
      url: "http://abc.original.com",
      width: "200px",
      height: "150px",
    },
    fixed_width: {
      url: "http://abc.width.com",
    },
    fixed_height: {
      url: "http://abc.height.com",
    },
  },
};

export const getMockGifData = (numItems: number): GiphyGif[] => {
  return Array.from(Array(numItems).keys()).map((i) => {
    return { ...mockGifData, uniqueId: `${i}` };
  });
};
