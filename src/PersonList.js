import React, { useState, useEffect } from "react";
import axios from "axios";

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10")
      .then((response) => {
        setPersons(response.data.results);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">User List</h1>
      {persons.map((person, index) => (
        <div
          key={index}
          className="card mb-4"
          style={{
            backgroundColor: "#17a2b8",
            color: "white",
            borderRadius: "10px",
          }}
        >
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center align-items-center p-2">
              <img
                src={person.picture.large}
                className="img-fluid rounded-circle"
                alt={`${person.name.first} ${person.name.last}`}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {`${person.name.title} ${person.name.first} ${person.name.last}`}
                </h5>
                <p className="card-text">
                  <strong>User Name:</strong> {person.login.username}
                  <br />
                  <strong>Gender:</strong> {person.gender.toUpperCase()}
                  <br />
                  <strong>Time Zone Description:</strong>{" "}
                  {person.location.timezone.description}
                  <br />
                  <strong>Address:</strong> {`${person.location.street.number} ${
                    person.location.street.name
                  }, ${person.location.city}, ${person.location.state}, ${
                    person.location.country
                  } - ${person.location.postcode}`}
                  <br />
                  <strong>Email:</strong> {person.email}
                  <br />
                  <strong>Birth Date and Age:</strong>{" "}
                  {`${person.dob.date.substring(0, 10)} (${person.dob.age})`}
                  <br />
                  <strong>Phone:</strong> {person.phone}
                  <br />
                  <strong>Cell:</strong> {person.cell}
                </p>
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonList;
