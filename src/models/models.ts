export interface TrendingGifParams {
  resetItems: boolean;
  limit: number;
  offset: number;
}

export interface SearchGifParams extends TrendingGifParams {
  searchTerm: string;
}

export interface GiphyGif {
  type: string;
  id: string;
  uniqueId: string;
  url: string;
  title: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
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
  meta: {
    response_id?: string;
  };
}

export interface GiphyPagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface PagedQueryResult {
  pages: GiphyResponse[];
  pageParams: number[];
}
