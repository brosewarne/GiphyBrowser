import React, { ReactNode, useState, createContext } from "react";
import { GiphyBrowserConfig } from "@app/config";

export type Configuration = {
  apiKey: string;
  numberOfItems: number;
  baseUrl: string;
};

export type Config = Configuration;

export const ConfigContext = createContext<Config>(GiphyBrowserConfig);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config] = useState(GiphyBrowserConfig);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
