import React from "react";

const Actions = ({ setVisibleForm, searchTerm, setSearchTerm }) => {
  return (
    <div className="actions">
      <form>
        <div className="inner-form">
          <div className="input-field">
            <button className="btn-search" type="button">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              id="search"
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </form>

      <div>
        <button className="btn-primary" onClick={() => setVisibleForm(true)}>
          <i className="fa-solid fa-plus"></i>Nuevo
        </button>
      </div>
    </div>
  );
};

export default Actions;
