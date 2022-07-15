import React from "react";
import TableRow from "./TableRow";

const PokemonsTable = ({ pokemonList, setPokemonRaw, loading }) => {
  // console.log({ pokemonList });

  return (
    <div>
      <table>
        <thead>
          <tr key="htable-head">
            <th scope="col">Nombre</th>
            <th scope="col">Imagen</th>
            <th scope="col">Ataque</th>
            <th scope="col">Defensa</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                className="td-loading"
                data-testid="td-loading-row"
                colSpan="6"
              >
                Cargando...
              </td>
            </tr>
          ) : pokemonList.length === 0 ? (
            <tr>
              <td className="td-no-result" colSpan="6">
                Sin resultados
              </td>
            </tr>
          ) : (
            pokemonList?.map((pokemon) => {
              return (
                <TableRow
                  key={pokemon.id}
                  pokemonData={pokemon}
                  setPokemonRaw={setPokemonRaw}
                  loadingTable={loading}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonsTable;
