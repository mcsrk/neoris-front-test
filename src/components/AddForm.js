import React, { useState, useEffect } from "react";
import { postRequest } from "../axiosClient";
import SliderField from "./SliderField";
import TextField from "./TextField";

const AddForm = ({ setVisibleForm, setPokemonRaw }) => {
  const [enteredName, setEnteredName] = useState("");

  const [enteredImage, setEnteredImage] = useState("");

  const [sliderAttack, setSliderAttack] = useState(0);
  const [sliderDefense, setSliderDefense] = useState(0);

  const [formValid, setFormValid] = useState(false);

  const enteredNameValid = enteredName.trim().length >= 2;

  const enteredImageValid = enteredImage.trim().length > 0;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const clearFiedls = () => {
    setEnteredName("");
    setEnteredImage("");
    setSliderAttack(50);
    setSliderDefense(50);
  };

  const addPokemon = async () => {
    setLoading(true);
    setError(false);

    const reqBody = {
      name: enteredName,
      image: enteredImage,
      attack: sliderAttack,
      defense: sliderDefense,
      hp: 100,
      type: "Rayo",
      idAuthor: 1,
      params: { idAuthor: "1" },
    };

    try {
      const postReq = await postRequest(``, reqBody);
      try {
        // Push new pokemon into local state to avoid a new request
        setPokemonRaw((prevState) => {
          return [...prevState, postReq.data];
        });
        clearFiedls();
        setVisibleForm(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formValid) return;
    addPokemon();
  };

  const onCancelHandler = () => {
    setVisibleForm(false);
    clearFiedls();
  };

  useEffect(() => {
    if (enteredNameValid && enteredImageValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [enteredNameValid, enteredImageValid]);

  return (
    <>
      <form onSubmit={onSubmitHandler} className="form-add-pokemon">
        <legend className="title">Nuevo Pokemon</legend>

        <div className="row">
          <div className="column">
            <TextField
              id={"name"}
              label={"Nombre"}
              type={"text"}
              value={enteredName}
              setValue={setEnteredName}
              required
            />

            <TextField
              id={"url_image"}
              label={"Imagen (url)"}
              type={"url"}
              value={enteredImage}
              setValue={setEnteredImage}
              required
            />
          </div>

          <div className="column">
            <SliderField
              id={"attack"}
              label={"Ataque"}
              value={sliderAttack}
              setValue={setSliderAttack}
              min={0}
              max={100}
            />

            <SliderField
              id={"defense"}
              label={"Defensa"}
              value={sliderDefense}
              setValue={setSliderDefense}
              min={0}
              max={100}
            />
          </div>
        </div>
      </form>
      <div className="action-buttons">
        <button
          className="btn-primary"
          disabled={!formValid || loading}
          type="submit"
          onClick={onSubmitHandler}
        >
          {loading ? (
            <span className="lds-dual-ring" />
          ) : (
            <i className="fa-solid fa-floppy-disk" />
          )}
          Guardar
        </button>
        <button className="btn-secondary" onClick={onCancelHandler}>
          <i className="fa-solid fa-xmark" /> Cancelar
        </button>
      </div>
    </>
  );
};

export default AddForm;
