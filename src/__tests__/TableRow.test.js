import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import Pokemons from "../pages/Pokemons";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Pokemon row", () => {
  test("displays pokemon data correctly", async () => {
    render(<Pokemons />);

    await waitFor(() => {
      expect(screen.getByTestId("pokemon-name").textContent).toBe("Dummy");
    });
    await waitFor(() => {
      expect(screen.getByTestId("pokemon-image")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId("pokemon-attack").textContent).toBe("94");
    });
    await waitFor(() => {
      expect(screen.getByTestId("pokemon-defense").textContent).toBe("100");
    });

    await waitFor(() => {
      expect(screen.getByTestId("btn-edit-row")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId("btn-delete-row")).toBeInTheDocument();
    });
  });

  test("clic edit button", async () => {
    render(<Pokemons />);
    let btnEdit;
    await waitFor(() => {
      btnEdit = screen.getByTestId("btn-edit-row");
    });
    fireEvent.click(btnEdit);

    expect(screen.getByTestId("input-edit-name")).toBeVisible();
    expect(screen.getByTestId("input-edit-name")).toBeVisible();
    expect(screen.getByTestId("input-edit-url")).toBeVisible();
    expect(screen.getByTestId("input-edit-attack")).toBeVisible();
    expect(screen.getByTestId("input-edit-defense")).toBeVisible();
    expect(screen.getByTestId("btn-save-edit")).toBeVisible();
    expect(screen.getByTestId("btn-cancel-edit")).toBeVisible();
  });
});
