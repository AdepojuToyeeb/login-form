import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const ControlledInputs = () => {
  const [person, setPerson] = useState({
    firstName: "",
    password: "",
    email: "",
    phone: "",
  });
  const [people, setPeople] = useState({});
  const [successStatus, setSucessStatus] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (person.firstName && person.password && person.email && person.phone) {
      // const newPerson = { ...person, id: new Date().getTime().toString() };
      // setPeople([...people, newPerson]);
      // setPerson({ firstName: "", password: "", email: "" , phone: ""});
    
      axios
        .post("https://ttmg-backend.herokuapp.com/api/auth/staffRegister", {
          email: person.email,
          name: person.firstName,
          password: person.password,
          mobile: person.phone,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setPeople(person);
            console.log("People", people);
            setSucessStatus(true);
            setResponseMessage("Registration is successful");
            setPerson({ firstName: "", password: "", email: "", phone: "" });
          }
        })
        .catch((err) => {
         
          console.log("400", Object.keys(err), err.response, typeof(err));
          if(err.response.status ===  400) {
            setSucessStatus(true);
            setResponseMessage("Some of the fields are missing or incorrect");
          }

          if(err.response.status ===  402) {
            setSucessStatus(true);
            setResponseMessage("User Already Exists with the given email id");
          }
        });
    // }
  };
  return (
    <>
      <article className="form">
        <form>
          {successStatus ? (
            <div className="success">
              {/* {`${people.firstName} has been registered successfully`} */}
              {responseMessage}
            </div>
          ) : (
            <></>
          )}

          <div className="form-control">
            <input
              type="text"
              placeholder="Name"
              id="firstName"
              name="firstName"
              value={person.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="Password"
              placeholder="password"
              id="password"
              name="password"
              value={person.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={person.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="tel"
              placeholder="Phone Number"
              id="phone"
              name="phone"
              value={person.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <p>
            Created Account ?
            <Link to={"./login"}> 
              <span>Login</span>
            </Link>
          </p>
          <div className = "buttons">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Register
          </button>
          </div>
        </form>
      </article>
    </>
  );
};

export default ControlledInputs;
