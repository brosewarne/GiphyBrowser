import { vi } from "vitest";

const mockUseNavigate = vi.fn();
vi.mock("@tanstack/react-router", async () => {
  const mod = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router",
  );
  return {
    ...mod,
    useNavigate: () => mockUseNavigate,
  };
});

export default mockUseNavigate