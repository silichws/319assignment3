import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const GET = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    fetch("http://127.0.0.1:8081/list")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
  }

  const showAllItems = product.map(function (product) {
    return (
      <div className="col" key={product.id}>
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
              <strong>Category:</strong> {product.category}
              <br></br>
              {/* <strong>Rating:</strong> - {product.rating} */}
            </p>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      {/* -------------
		Method GET all products
		-----------------*/}
      <h1>Catalog of Products</h1>
      <div>
        <h3>Showing all available Products.</h3>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-3">{showAllItems}</div>
        </div>
      </div>
    </div>
  );
};

const UPDATE = () => {
  const [oneProduct, setOneProduct] = useState([]);
  const [id, setId] = useState(-1);

  function getOneProduct(id) {
    console.log(id);

    if (id >= 1) {
      setId(id);
      fetch("http://127.0.0.1:8081/get/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          console.log(data[0].rating["rate"]);
          setOneProduct(data);
        });
    } else {
      console.log("Wrong number of Product id.");
    }
  }
  const showOneItem = oneProduct.map((product) => (
    <div className="col" key={product.id} style={{ width: 400 }}>
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
            <strong>Category:</strong> {product.category}
            <br></br>
            <strong>Rating:</strong> {product.rating["rate"]} (
            {product.rating["count"]} votes)
          </p>
        </div>
      </div>
    </div>
  ));
  const [formData, setFormData] = useState({
    newPrice: "",
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
    if (formData.newPrice.trim() === "") {
      errors.newPrice = "Price is required";
    }

    if (Object.keys(errors).length === 0) {
      console.log("attempting to post new data");
      await fetch("http://localhost:8081/update", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: id,
          price: formData.newPrice,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      setFormData({
        newPrice: "Added",
      });
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div>
      <h1>Show one Product by Id </h1>
      {/* -------------
	Method GET one product
	-----------------*/}
      <div>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="id"
          onChange={(e) => getOneProduct(e.target.value)}
        />
        <div className="container" style={{ margin: 10 }}>
          <div className="row row-cols-1 row-cols-md-3 g-3">{showOneItem}</div>
        </div>
        <div className="g-3 col-md-3 formBorder space">
          <form className="row" id="checkout-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="inputnewPrice" className="form-label">
                New Price
              </label>
              <input
                type="text"
                className={`form-control ${
                  validationErrors.newPrice ? "is-invalid" : ""
                }`}
                id="inputnewPrice"
                name="newPrice"
                value={formData.newPrice}
                onChange={handleChange}
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Price is required</div>
            </div>

            <button
              type="submit"
              className="btn btn-success text-dark makeApiCall"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const DELTE = () => {
  const [oneProduct, setOneProduct] = useState([]);

  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://127.0.0.1:8081/get/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          console.log(data[0].rating["rate"]);
          setOneProduct(data);
        });
    } else {
      console.log("Wrong number of Product id.");
    }
  }
  const showOneItem = oneProduct.map((product) => (
    <div className="col" key={product.id} style={{ width: 400 }}>
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
            <strong>Category:</strong> {product.category}
            <br></br>
            <strong>Rating:</strong> {product.rating["rate"]} (
            {product.rating["count"]} votes)
          </p>
          <button>Delete</button>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Show one Product by Id </h1>
      {/* -------------
	Method GET one product
	-----------------*/}
      <div>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="id"
          onChange={(e) => getOneProduct(e.target.value)}
        />
        <div className="container" style={{ margin: 10 }}>
          <div className="row row-cols-1 row-cols-md-3 g-3">{showOneItem}</div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/get">View all products</Link>
            </li>
            <li>
              <Link to="/getid">Update</Link>
            </li>
            <li>
              <Link to="/delete">DELETE</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/get" element={<GET />} />
          <Route path="/getid" element={<UPDATE />} />
          <Route path="/delete" element={<DELTE />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
