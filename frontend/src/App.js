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
    console.log("can run something");
    return (
      <div className="col" key={product.id}>
        <div className="card shadow-sm">
          <img alt="Product Image" src={product.image} />
          <div className="card-body">
            <span style={{ fontSize: "16px", fontWeight: "600" }}>
              {product.title}
            </span>
            <p className="card-text">
            <strong>ID: </strong> {product.id} <br></br>
            <strong>Price: </strong>${product.price} <br></br>
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
          setOneProduct(data);
        })
        .catch();
      {
        console.log("Wrong number of Product id.");
      }
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
            <strong>ID: </strong> {product.id}<br></br>
            <strong>Price:</strong> ${product.price} <br></br>
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
        newPrice: "Price Updated",
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

const CREATE = () => {
  const [oneProduct, setOneProduct] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    newPrice: "",
    description: "",
    category: "",
    image: "",
    rate: "",
    count: "",
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
    if (formData.id.trim() === "") {
      errors.id = "ID is required";
    }
    if (formData.title.trim() === "") {
      errors.title = "Title is required";
    }
    if (formData.newPrice.trim() === "") {
      errors.newPrice = "Price is required";
    }
    if (formData.description.trim() === "") {
      errors.description = "Description is required";
    }
    if (formData.category.trim() === "") {
      errors.category = "Category is required";
    }
    if (formData.image.trim() === "") {
      errors.image = "Image is required";
    }
    if (formData.rate.trim() === "") {
      errors.rate = "Rate is required";
    }
    if (formData.count.trim() === "") {
      errors.count = "Count is required";
    }

    if (Object.keys(errors).length === 0) {
      console.log("attempting to post new data");
      await fetch("http://localhost:8081/add", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: formData.id,
          title: formData.title,
          price: formData.newPrice,
          description: formData.description,
          category: formData.category,
          image: formData.image,
          rate: formData.rate,
          count: formData.count,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      setFormData({
        id: "",
        title: "",
        newPrice: "",
        description: "",
        category: "",
        image: "",
        rate: "",
        count: "",
      });
      alert("Product created");
    } else {
      setValidationErrors(errors);
    }
  };

  return (
    <div>
      <h1>Create a new product </h1>
      <div>
        <div className="g-3 col-md-3 formBorder space">
          <form className="row g-3" id="checkout-form" onSubmit={handleSubmit}>
            <div>
              <div className="col-md-6">
                <label htmlFor="inputid" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.id ? "is-invalid" : ""
                  }`}
                  id="inputid"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">ID is required</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.title ? "is-invalid" : ""
                  }`}
                  id="inputTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Title is required</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputnewPrice" className="form-label">
                  Price
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

              <div className="col-md-12">
                <label htmlFor="inputDescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.description ? "is-invalid" : ""
                  }`}
                  id="inputDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Description is required</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputCategory" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.category ? "is-invalid" : ""
                  }`}
                  id="inputCategory"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Category is required</div>
              </div>

              <div className="col-md-12">
                <label htmlFor="inputImage" className="form-label">
                  Image
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.image ? "is-invalid" : ""
                  }`}
                  id="inputImage"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Image is required</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputRate" className="form-label">
                  Rate
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.rate ? "is-invalid" : ""
                  }`}
                  id="inputRate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Rate is required</div>
              </div>

              <div className="col-md-6">
                <label htmlFor="inputCount" className="form-label">
                  Count
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    validationErrors.count ? "is-invalid" : ""
                  }`}
                  id="inputCount"
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                />
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Count is required</div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success text-dark makeApiCall"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const DELTE = () => {
  const [oneProduct, setOneProduct] = useState([]);
  const [id, setId] = useState(-1);

  function getOneProduct(id) {
    console.log(id);
    setId(id);
    if (id >= 1) {
      fetch("http://127.0.0.1:8081/get/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          setOneProduct(data);
        });
    } else {
      console.log("Wrong number of Product id.");
    }
  }
  function handleClick() {
    fetch("http://localhost:8081/delete", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted");
        alert("This product has been deleted.");
      })
      .catch((err) => {
        console.log("Errror:" + err);
      });
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
          <button onClick={handleClick}>Delete</button>
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
              <Link to="/create">Create</Link>
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
          <Route path="/create" element={<CREATE />} />
          <Route path="/getid" element={<UPDATE />} />
          <Route path="/delete" element={<DELTE />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
