import React from "react";
import { render, screen } from "@testing-library/react";

import Pokemons from "../pages/Pokemons";

describe("Render title", () => {
  it("Renders the basic page title", async () => {
    render(<Pokemons />);

    expect(screen.getByText(/listado de pokemon/i)).toBeInTheDocument();
  });
});
