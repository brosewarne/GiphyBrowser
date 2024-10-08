import React from "react";
import { vi } from "vitest";
import { SearchContext } from "@app/app/providers";

export const mockSetSearchTerm = vi.fn();

export const getMockSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SearchContext.Provider
      value={{ searchTerm: "", setSearchTerm: mockSetSearchTerm }}
    >
      {children}
    </SearchContext.Provider>
  );
};
