import React from "react";
import { render, screen } from "@testing-library/react";

import { MainPage } from "../components/MainPage";

describe("Main Page mount", () => {
  it("must display the main page title", () => {
    render(<MainPage />);
    expect(screen.getByText(/Pokemons/i)).toBeInTheDocument();
  });
});

describe("Pokemons List", () => {
  it("must display 3 pokemons", async () => {
    render(<MainPage />);
    expect(await screen.findAllByRole("listitem")).toHaveLength(3);
  });
});

describe("Contains Pikachu", () => {
  it("must contain 3 specific pokemons", async () => {
    render(<MainPage />);
    const [firstQuote, secondQuote, thirdQuote] = await screen.findAllByRole(
      "listitem"
    );
    expect(firstQuote.textContent).toBe("Pikachu");
    expect(secondQuote.textContent).toBe("Charmander");
    expect(thirdQuote.textContent).toBe("Bulbasour");
  });
});
