import React, { useState } from "react";

const DeleteForm = () => {
  const [formData, setFormData] = useState({
    time: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (formData.time.trim() === "") {
      errors.time = "Timestamp is required";
    }

    if (Object.keys(errors).length === 0) {
      // Validation correct. Put API call here
      console.log("formData");
      console.log(formData);
      console.log("attempting to post new robot");
      fetch("http://localhost:8081/delete", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: formData.time,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setFormData({
            time: "Deleted",
          });
        })
        .catch((err) => {console.log("Errror:" + err);
        setFormData({
          time: "Error: Could not find time entered",
        });});
    } else {
      setValidationErrors(errors);
    }
  };
  return (
    <div className="g-3 col-md-3 formBorder">
      <form className="row " id="checkout-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputTime" className="form-label">
            Timestamp
          </label>
          <input
            placeholder="YYYY-MM-DD-HH.MM.SS"
            type="text"
            className={`form-control ${
              validationErrors.time ? "is-invalid" : ""
            }`}
            id="inputTime"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Timestamp is required</div>
        </div>
        <button type="submit" className="btn btn-danger text-dark makeApiCall">
          Delete
        </button>
      </form>
    </div>
  );
};

export default DeleteForm;
