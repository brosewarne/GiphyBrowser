import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const response = {
  data: [{ id: "1234" }, { id: "5678" }],
  pagination: { total_count: 2, count: 2, offset: 0 },
  meta: { response_id: "1234" },
};
const handlers = [
  http.get("https://api.giphy.com/v1/gifs/trending", () => {
    return HttpResponse.json(response);
  }),
  http.get("https://api.giphy.com/v1/gifs/search", () => {
    return HttpResponse.json(response);
  }),
  http.get("https://api.giphy.com/v1/gifs", () => {
    return HttpResponse.json(response);
  }),
];

export const mockHttpServer = setupServer(...handlers);
