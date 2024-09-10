type ParentalRating = "g" | "pg" | "pg-13" | "r";
type GifBundle =
  | "messaging_non_clips"
  | "clips_grid_picker"
  | "sticker_layering"
  | "low_bandwidth";

export interface TrendingGifParams {
  resetItems: boolean;
  limit: number;
  offset: number;
  rating?: ParentalRating;
  bundle?: GifBundle;
}

export interface SearchGifParams extends TrendingGifParams {
  searchTerm: string;
}

export interface GiphyGif {
  type: string;
  id: string;
  url: string;
  title: string;
  images: {
    original: {
      url: string;
    };
    fixed_width?: {
      url: string;
    };
    fixed_height?: {
      url: string;
    };
  };
}

export interface GiphyResponse {
  data: GiphyGif[];
  pagination: GiphyPagination;
}

export interface GiphyPagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface ITrendingPageContext {
  trendingItems: GiphyGif[];
  setTrendingItems: React.Dispatch<React.SetStateAction<any>>;
}

export interface ITrendingPaginationContext {
  trendingPagination: GiphyPagination;
  setTrendingPagination: React.Dispatch<React.SetStateAction<any>>;
}

export interface ISearchContext {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<any>>;
}

export interface ISearchItemsContext {
  searchItems: GiphyGif[];
  setSearchItems: React.Dispatch<React.SetStateAction<any>>;
}

export interface ISearchPaginationContext {
  searchPagination: GiphyPagination;
  setSearchPagination: React.Dispatch<React.SetStateAction<any>>;
}


export interface ISavedPageContext {
  savedItemIds: string;
  setSavedItemIds: React.Dispatch<React.SetStateAction<any>>;
}
