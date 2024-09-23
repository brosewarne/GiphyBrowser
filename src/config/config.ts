const apiKey = import.meta.env.VITE_GIPHY_BROWSER_API_KEY;
// use freeze for simple immutablity
export const GiphyBrowserConfig = Object.freeze({
  apiKey,
  numberOfItems: 9,
  baseUrl: "https://api.giphy.com/v1/gifs",
});
