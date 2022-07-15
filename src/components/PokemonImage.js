import React from "react";
import { isImage } from "../utils/utils";

const PokemonImage = ({ urlImage }) => {
  return (
    <>
      {isImage(urlImage) ? (
        <div
          onClick={() => window.open(urlImage, "_blank").focus()}
          className="img-container"
        >
          <img alt="pokemon-img" src={urlImage} />
        </div>
      ) : (
        <div className="td-skeleton-image">
          <i className="fa-solid fa-image"></i>
        </div>
      )}
    </>
  );
};

export default PokemonImage;
