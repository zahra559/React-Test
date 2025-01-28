import React, { useState } from "react";

import "./Form.css";

export const UserForm = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.name && formState.email && formState.phoneNumber) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              onChange={handleChange}
              value={formState?.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <textarea
              name="email"
              onChange={handleChange}
              value={formState?.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">PhoneNumber</label>
            <input
              name="phoneNumber"
              onChange={handleChange}
              value={formState?.phoneNumber}
            />
          </div>
          {!defaultValue && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={formState?.password}
              />
            </div>
          )}
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
