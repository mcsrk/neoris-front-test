import React from "react";

const TextField = ({
  id,
  label,
  value,
  setValue,
  type,
  required = false,
  edit = false,
}) => {
  return (
    <div className={`text-field ${edit && "text-edit"}`}>
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span className="required">*</span>}:
        </label>
      )}

      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
      />
    </div>
  );
};

export default TextField;
