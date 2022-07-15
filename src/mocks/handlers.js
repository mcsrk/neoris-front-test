import { rest } from "msw";
export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 750,
          name: "Dummy",
          image:
            "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
          attack: 94,
          defense: 100,
          hp: 41,
          type: "Planta",
          id_author: 1,
        },
      ])
    );
  }),
];
