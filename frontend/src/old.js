import "./App.css";
import React, { useState } from "react";
import { Products } from "./Products";

const App = () => {
  const [ProductsCategory, setProductsCategory] = useState(Products);

  const [query, setQuery] = useState("");

  function toggleViews() {
    setIsBrowseViewVisible(!isBrowseViewVisible);
    setIsCartViewVisible(!isCartViewVisible);

    if (ViewConfirmation) {
      window.location.reload();
      setViewConfirmation(false);
    }

    const searchInput = document.getElementById("search");
    console.log(searchInput.value);
    searchInput.value = "";
    setQuery("");

    handleChange({ target: { value: "" } });
  }

  const [isBrowseViewVisible, setIsBrowseViewVisible] = useState(true);
  const [isCartViewVisible, setIsCartViewVisible] = useState(false);
  const [ViewConfirmation, setViewConfirmation] = useState(false);

  // BROWSE CODE ################

  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = Products.filter((eachProduct) => {
      if (e.target.value === "") return ProductsCategory;
      //   console.log(eachProduct);
      //   console.log(e.target.value.toLowerCase());
      return eachProduct.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setProductsCategory(results);
  };

  // CART CODE ################
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    // console.log(item);
    const existingCart = cart.find((cartItem) => cartItem.id === item.id);

    if (existingCart) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    // console.log(cart);
  };

  const removeFromCart = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id && cartItem.quantity > 0) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });

    setCart(updatedCart);
  };

  const cartItems = cart
    .filter((item) => item.quantity >= 1)
    .map((item) => (
      <div key={item.id}>
        <div className="row border-top border-bottom" key={item.id}>
          <div className="row main align-items-center">
            <div className="col-2">
              <img className="img-fluid" src={item.image} />
            </div>
            <div className="col">
              <div className="row text-muted">{item.title}</div>
              <div className="row">{item.category}</div>
            </div>
            <div className="col"></div>
            <div className="col">${item.price}</div>
            <div className="col">Quantity: {item.quantity}</div>
          </div>
        </div>
      </div>
    ));

  const cartTotal = () => {
    // console.log("trying to get total");
    const total = cart.reduce((acc, item) => {
      const itemPrice = item.price * item.quantity;
      if (item.quantity >= 0) {
        return acc + itemPrice;
      }

      return acc;
    }, 0);
    // console.log(total);

    return total;
  };
  const [formDataConfirm, setformDataConfirm] = useState({
	name: "",
	email: "",
	card: "",
	address: "",
	address2: "",
	city: "",
	state: "",
	zip: "",
  });

  // VALIDATION ##################
  function CheckoutForm() {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      card: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setValidationErrors({ ...validationErrors, [name]: "" });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = document.getElementById("checkout-form");
      const summaryCard = document.getElementById("confirmation-info");

      const errors = {};
      if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        errors.email = "Invalid email address";
      }
      if (formData.name.trim() === "") {
        errors.name = "Name is required";
      }
      if (formData.address.trim() === "") {
        errors.address = "Address is required";
      }
      if (formData.city.trim() === "") {
        errors.city = "City is required";
      }
      if (formData.state.trim() === "") {
        errors.state = "State is required";
      }
      if (isNaN(formData.zip) || formData.zip.length !== 5) {
        errors.zip = "Valid zip code is required";
      }
      if (!formData.card.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) {
        errors.card = "Invalid card format";
      }
      if (Object.keys(errors).length === 0) {
		console.log("formData");
		console.log(formData);
		setformDataConfirm(formData);

        form.classList.add("collapse");
        setViewConfirmation(true);
        summaryCard.classList.remove("collapse");
		
      } else {
        setValidationErrors(errors);
      }
    };

    return (
      <div>
        <div
          className="container"
		  id="formInfo"
        >
          <div className="row">
            <div className="col-2"></div>

            <div className="col-8">
              <h1 className="text-3xl category-title">
                {ViewConfirmation ? "" : "Payment Information"}
              </h1>

              <div id="liveAlertPlaceholder"></div>
              <form
                className="row g-3"
                id="checkout-form"
                onSubmit={handleSubmit}
				style={{ display: ViewConfirmation ? "none" : "float" }}
              >
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.name ? "is-invalid" : ""
                    }`}
                    id="inputName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Must be like, "John Doe"</div>
                </div>

                <div className="col-md-6">
                  <label for="inputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      validationErrors.email ? "is-invalid" : ""
                    }`}
                    id="inputEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Must be like, "abc@xyz.efg"
                  </div>
                </div>

                <div className="col-md-12">
                  <label for="inputCard" className="form-label">
                    Card Number
                  </label>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi-credit-card-fill"></i>
                    </span>
                    <input
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      type="text"
                      className={`form-control ${
                        validationErrors.card ? "is-invalid" : ""
                      }`}
                      id="inputCard"
                      name="card"
                      value={formData.card}
                      onChange={handleChange}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Must be like, "7777-7777-7777-7777"
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <label for="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    placeholder="1234 Main St"
                    type="text"
                    className={`form-control ${
                      validationErrors.address ? "is-invalid" : ""
                    }`}
                    id="inputAddress"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Address is required</div>
                </div>

                <div className="col-md-12">
                  <label for="inputAddress2" className="form-label">
                    Address 2
                  </label>
                  <input
                    placeholder="Apartment, studio, or floor"
                    type="text"
                    className={`form-control`}
                    id="inputAddress2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputCity" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.city ? "is-invalid" : ""
                    }`}
                    id="inputCity"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">City is required</div>
                </div>

                <div className="col-md-6">
                  <label for="inputState" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.state ? "is-invalid" : ""
                    }`}
                    id="inputState"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">State is required</div>
                </div>

                <div className="col-md-6">
                  <label for="inputZip" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validationErrors.zip ? "is-invalid" : ""
                    }`}
                    id="inputZip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Valid zip code is required</div>
                </div>

                <button type="submit" className="btn btn-success text-dark">
                  Order
                </button>
              </form>
              <div
                className="confirmationView"
                style={{ display: ViewConfirmation ? "block" : "none" }}
              >
                <div className="card" id="confirmation-info">
                  <div className="card-body">
                    <h5 className="card-title">Personal Information</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">	
                      <b> Name: </b> {formDataConfirm.name}
                    </li>
                    <li className="list-group-item">
                      <b> Email: </b> {formDataConfirm.email}
                    </li>
					<li className="list-group-item">
                      <b> Card ending in: </b> {formDataConfirm.card.substring(formDataConfirm.card.length - 4)}
                    </li>
					<li className="list-group-item">
                      <b> Address: </b> {formDataConfirm.address}
                    </li>
					<li className="list-group-item">
                      <b> Address 2: </b> {formDataConfirm.address2}
                    </li>
					<li className="list-group-item">
                      <b> City: </b> {formDataConfirm.city}
                    </li>
					<li className="list-group-item">
                      <b> State: </b> {formDataConfirm.state}
                    </li>
					<li className="list-group-item">
                      <b> Zip: </b> {formDataConfirm.zip}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CONFIRMATION CODE ################

  const showProducts = (ProductsCategory) => {
    return (
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
          Products ({ProductsCategory.length})
        </h2>
        <div
          className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-10"
          style={{ maxHeight: "800px", overflowY: "scroll" }}
        ></div>

        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {ProductsCategory.map((product, index) => (
              <div className="col" key={index}>
                <div className="card shadow-sm">
                  <img alt="Product Image" src={product.image} />
                  <div className="card-body">
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      {product.title}
                    </span>
                    <p className="card-text">
                      ${product.price} <br></br>
                      <strong>Description: </strong>
                      {product.description}
                      <br></br>
                      <strong>Tag</strong> - {product.category}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => {
                          addToCart(product);
                        }}
                        className="btn btn-sm btn-primary"
                      >
                        {" "}
                        +{" "}
                      </button>
                      <span className="item-quantity">
                        Quantity:{" "}
                        {cart.find((item) => item.id === product.id)
                          ?.quantity ?? 0}
                      </span>
                      <button
                        onClick={() => {
                          removeFromCart(product);
                        }}
                        className="btn btn-sm btn-primary"
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="top-0 p-4 flex justify-between items-center">
        <h1 className="text-3xl">
          <strong>IASG Online Store</strong>{" "}
        </h1>
        <button
          className="btn btn-md btn-primary"
          onClick={() => toggleViews()}
        >
          {isBrowseViewVisible ? "Checkout" : "Return"}
        </button>
      </div>
      <h2 className="text-3xl" id="confirmation">
        {ViewConfirmation ? "Payment Confirmed" : ""}
      </h2>
      <div
        className="browseView"
        style={{ display: isBrowseViewVisible ? "block" : "none" }}
      >
        <div>
          <div>
            <div>
              <div className="py-10">
                <input
                  id="search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="search"
                  value={query}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div>{showProducts(ProductsCategory)}</div>
        </div>
      </div>

      <div
        className="cartView"
        style={{ display: isCartViewVisible ? "block" : "none" }}
      >
        <div>
          <div className="card">
            <div className="row">
              <div className="col-md-8 cart">
                <div className="title">
                  <div className="row">
                    <div className="col">
                      <h4>
                        <b>
                          {ViewConfirmation ? "Summary of items" : "Your Cart"}
                        </b>
                      </h4>
                    </div>
                  </div>
                </div>
                <div>{cartItems}</div>
              </div>
              <div className="float-end">
                <p className="mb-0 me-5 d-flex align-items-center">
                  <span className="small text-muted me-2">Order total:</span>
                  <span className="lead fw-normal">
                    ${cartTotal().toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};

export default App;
