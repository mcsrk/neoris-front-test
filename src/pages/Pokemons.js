import React, { useEffect, useState } from "react";
import { getRequest } from "../axiosClient";

import Actions from "../components/Actions";
import AddPokemon from "../components/AddForm";
import PokemonsTable from "../components/PokemonsTable";
import { sortObjArray } from "../utils/utils";

const Pokemons = () => {
  const [pokemonRaw, setPokemonRaw] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [visibleForm, setVisibleForm] = useState(false);

  const getData = async () => {
    setLoading(true);
    setError(false);

    const reqBody = {
      params: { idAuthor: "1" },
    };

    try {
      const searchRes = await getRequest("", reqBody);
      try {
        setPokemonRaw(sortObjArray(searchRes.data));
      } catch (error) {
        console.log({ error });
        setPokemonRaw([]);
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  const filterBysearchTerm = () => {
    setPokemonList(() => {
      if (searchTerm !== "") {
        const newState = pokemonRaw.filter((pokemon) => {
          return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        return newState;
      }
      return pokemonRaw;
    });
  };

  useEffect(() => {
    // it keeps in sync with new fetched data and with every update/delete/add action
    setPokemonList(sortObjArray(pokemonRaw));
    setSearchTerm("");
  }, [pokemonRaw]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterBysearchTerm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="container">
      <p>Listado de Pokemon</p>
      {error && <p className="error">Error cargando los datos. </p>}
      <Actions
        setVisibleForm={setVisibleForm}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {visibleForm && (
        <AddPokemon
          setVisibleForm={setVisibleForm}
          setPokemonRaw={setPokemonRaw}
        />
      )}
      <PokemonsTable
        pokemonList={pokemonList}
        setPokemonRaw={setPokemonRaw}
        loading={loading}
      />
    </div>
  );
};

export default Pokemons;
