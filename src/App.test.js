import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders without crashing", async () => {
  render(<App />);
  await waitFor(() => screen.findByText("Gipphy App"), { timeout: 100000 });
  const title = screen.getByText("Gipphy App");
  expect(title).toBeVisible();
});
