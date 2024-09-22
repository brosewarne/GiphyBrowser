const apiKey = import.meta.env.VITE_GIPHY_BROWSER_API_KEY;
export const GiphyBrowerConfig = Object.freeze({
  apiKey,
  numberOfItems: 9,
  baseUrl: "https://api.giphy.com/v1/gifs"
});
