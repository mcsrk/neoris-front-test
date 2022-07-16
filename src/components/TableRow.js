import React, { useState, useEffect } from "react";
import { deleteRequest, putRequest } from "../axiosClient";
import PokemonImage from "./PokemonImage";
import SliderField from "./SliderField";
import TextField from "./TextField";

const renderActionButtons = (
  editing,
  setEditing,
  onEditHandler,
  onCancelHandler,
  onDeleteHandler
) => {
  return (
    <div className="td-actions">
      {editing ? (
        <>
          <button
            data-testid="btn-save-edit"
            className="row-action-button"
            title="Guardar"
            data-toggle="tooltip"
            onClick={onEditHandler}
          >
            <i className="icon-green fa-solid fa-floppy-disk" />
          </button>
          <button
            data-testid="btn-cancel-edit"
            className="row-action-button"
            title="Cancelar"
            data-toggle="tooltip"
            onClick={onCancelHandler}
          >
            <i className="icon-cancel fa-solid fa-xmark"></i>
          </button>
        </>
      ) : (
        <>
          <button
            data-testid="btn-edit-row"
            className="row-action-button"
            title="Editar"
            data-toggle="tooltip"
            onClick={() => setEditing((prev) => !prev)}
          >
            <i className="icon-primary fa-solid fa-pen-to-square" />
          </button>
          <button
            data-testid="btn-delete-row"
            className="row-action-button"
            title="Eliminar"
            data-toggle="tooltip"
            onClick={onDeleteHandler}
          >
            <i className="icon-primary fa-solid fa-trash-can"></i>
          </button>
        </>
      )}
    </div>
  );
};

const TableRow = ({ pokemonData, setPokemonRaw, loadingTable = false }) => {
  const [editing, setEditing] = useState(false);

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [error, setError] = useState(false);

  const [enteredName, setEnteredName] = useState(pokemonData?.name);
  const [enteredImage, setEnteredImage] = useState(pokemonData?.image);
  const [sliderAttack, setSliderAttack] = useState(pokemonData?.attack);
  const [sliderDefense, setSliderDefense] = useState(pokemonData?.defense);

  const modifyPokemon = async () => {
    setLoadingEdit(true);
    setError(false);

    const reqBody = {
      name: enteredName,
      image: enteredImage,
      attack: sliderAttack,
      defense: sliderDefense,
      hp: pokemonData?.hp,
      type: pokemonData?.type,
      idAuthor: 1,
    };

    try {
      const putRes = await putRequest(`${pokemonData.id}`, reqBody);
      try {
        const modifiedPokemon = putRes.data;

        // Replace in local state to avoid a new request
        setPokemonRaw((prevState) => {
          const newState = prevState.map((pokemon) => {
            if (pokemon.id === pokemonData.id) {
              return { ...pokemon, ...modifiedPokemon };
            }
            return pokemon;
          });
          return newState;
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setError(error);
    }
    setLoadingEdit(false);
  };

  const deletePokemon = async () => {
    setLoadingEdit(true);
    setError(false);
    try {
      await deleteRequest(`${pokemonData.id}`);
      try {
        // Remove in local state to avoid a new request
        setPokemonRaw((prevState) => {
          const newState = prevState.filter((pokemon) => {
            return pokemon.id !== pokemonData.id;
          });
          return newState;
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setError(error);
    }
    setLoadingEdit(false);
  };

  const onEditHandler = () => {
    modifyPokemon();
    setEditing((prev) => !prev);
  };

  const onCancelHandler = () => {
    setEditing((prev) => !prev);
  };

  const onDeleteHandler = () => {
    deletePokemon();
  };

  useEffect(() => {
    setEnteredName(pokemonData?.name);
    setEnteredImage(pokemonData?.image);
    setSliderAttack(pokemonData?.attack);
    setSliderDefense(pokemonData?.defense);
  }, [editing, pokemonData]);

  return (
    <tr className={loadingEdit || loadingTable ? "loading" : ""}>
      {editing ? (
        <>
          <td data-testid="input-edit-name">
            <TextField
              edit
              type={"text"}
              value={enteredName}
              setValue={setEnteredName}
            />
          </td>
          <td data-testid="input-edit-url">
            <TextField
              edit
              type={"url"}
              value={enteredImage}
              setValue={setEnteredImage}
              required
            />
          </td>
          <td data-testid="input-edit-attack">
            <SliderField
              edit
              min={0}
              max={100}
              value={sliderAttack}
              setValue={setSliderAttack}
            />
          </td>
          <td data-testid="input-edit-defense">
            <SliderField
              edit
              min={0}
              max={100}
              value={sliderDefense}
              setValue={setSliderDefense}
            />
          </td>
          <td>
            {renderActionButtons(
              editing,
              setEditing,
              onEditHandler,
              onCancelHandler,
              onDeleteHandler
            )}
          </td>
        </>
      ) : (
        <>
          <td data-testid="pokemon-name">{pokemonData.name}</td>
          <td data-testid="pokemon-image">
            <PokemonImage urlImage={pokemonData.image} />
          </td>
          <td data-testid="pokemon-attack">{pokemonData.attack}</td>
          <td data-testid="pokemon-defense">{pokemonData.defense}</td>
          <td>
            {renderActionButtons(
              editing,
              setEditing,
              onEditHandler,
              onCancelHandler,
              onDeleteHandler
            )}
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
