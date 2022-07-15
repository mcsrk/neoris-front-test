import React from "react";

const SliderField = ({
  id,
  label,
  value,
  setValue,
  min,
  max,
  edit = false,
}) => {
  return (
    <div className={`slider-field ${edit && "slider-edit"}`}>
      {!edit && (
        <>
          <label htmlFor={id}>{label}:</label>
          <p>{min}</p>
        </>
      )}

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {!edit && <p>{max}</p>}
    </div>
  );
};

export default SliderField;
