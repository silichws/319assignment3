import "./App.css";

const About = () => {
  return (
    <div className="about">
      <div className="header">
        <h1>About The Project</h1>
      </div>
      <p className="description">This single page application acts as a frontend for managing a database of products.
        The applicaton is meant more for administrative users of the database to have a nice and clean
        interface to create new products, update existing products, and remove products from the catalog.
      </p>
      <div className="header">
        <h1>About Us</h1>
      </div>
      <h3>COM S - 319 Construction of User Interfaces</h3>
      <p>Instructor: Dr. Abraham N. Aldaco Gastelum</p>
      <p>Date : December 5, 2023 </p>

      <p></p>

      <p>
        Developers: <br />
        William Silich
        <br />
        Email : wasilich@iastate.edu
        <br />
        Jake Sweeney
        <br />
        Email : jsweenz@iastate.edu
        <br />
      </p>
    </div>
  );
};
export default About;
