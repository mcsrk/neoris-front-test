import React from "react";
import { render, screen } from "@testing-library/react";

import AddForm from "../components/AddForm";

describe("Renders form", () => {
  it("must display the main page title", async () => {
    render(<AddForm />);
    expect(screen.getByText(/nuevo pokemon/i)).toBeInTheDocument();
  });
});

// describe("Pokemons List", () => {
//   it("must display 3 pokemons", async () => {
//     render(<MainPage />);
//     expect(await screen.findAllByRole("listitem")).toHaveLength(3);
//   });
// });

// describe("Contains Pikachu", () => {
//   it("must contain 3 specific pokemons", async () => {
//     render(<MainPage />);
//     const [firstQuote, secondQuote, thirdQuote] = await screen.findAllByRole(
//       "listitem"
//     );
//     expect(firstQuote.textContent).toBe("Pikachu");
//     expect(secondQuote.textContent).toBe("Charmander");
//     expect(thirdQuote.textContent).toBe("Bulbasour");
//   });
// });
