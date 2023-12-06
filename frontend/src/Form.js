import React, { useState } from "react";

const Form = ({reloadPage}) => {
  const [formData, setFormData] = useState({
    time: "",
    temp: "",
    hum: "",
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
    if (formData.temp.trim() === "") {
      errors.temp = "Temperature is required";
    }
    if (formData.hum.trim() === "") {
      errors.hum = "Humidity is required";
    }

    if (Object.keys(errors).length === 0) {
      // Validation correct. Put API call here
      //   console.log("formData");
      //   console.log(formData);
      console.log("attempting to post new data");
      await fetch("http://localhost:8081/add", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: formData.time,
          temp: formData.temp,
          humidity: formData.hum,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
		setFormData({
        time: "Added",
        temp: "",
        hum: "",
      });
	  reloadPage();
    } else {
      setValidationErrors(errors);
    }
  };
  return (
    <div className="g-3 col-md-3 formBorder">
      <form className="row" id="checkout-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputTime" className="form-label">
            Timestamp
          </label>
          <input
            type="text"
            className={`form-control ${
              validationErrors.time ? "is-invalid" : ""
            }`}
            id="inputTime"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="YYYY-MM-DD-HH.MM.SS"
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Timestamp is required</div>

          <label htmlFor="inputTemp" className="form-label">
            Temperature
          </label>
          <input
            type="text"
            className={`form-control ${
              validationErrors.temp ? "is-invalid" : ""
            }`}
            id="inputTemp"
            name="temp"
            value={formData.temp}
            onChange={handleChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Temperature is required</div>

          <label htmlFor="inputTime" className="form-label">
            Humidity
          </label>
          <input
            type="text"
            className={`form-control ${
              validationErrors.time ? "is-invalid" : ""
            }`}
            id="inputTime"
            name="hum"
            value={formData.hum}
            onChange={handleChange}
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Humidity is required</div>
        </div>

        <button type="submit" className="btn btn-success text-dark makeApiCall">
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
