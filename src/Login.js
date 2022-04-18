import React, { useState } from "react";
import axios from "axios";

const ControlledInputs = () => {
  const redirect = () => {
    window.location.href = "/new";
  };
  const [person, setPerson] = useState({
    password: "",
    email: "",
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
    // if ( person.password && person.email ) {

    axios
      .post("http://ttmg-backend.herokuapp.com/api/auth/staffLogin", {
        email: person.email,
        password: person.password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setPeople(person);
          console.log("People", people);
          setSucessStatus(true);
          setResponseMessage("Login is successful");
          setPerson({ password: "", email: "" });
          redirect();
        }
      })
      .catch((err) => {
        console.log("400", Object.keys(err), err.response, typeof err);
        if (err.response.status === 400) {
          setSucessStatus(true);
          setResponseMessage("Email/Password is Missing");
        }

        if (err.response.status === 401) {
          setSucessStatus(true);
          setResponseMessage("Email or password is incorrect");
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
              {/* {`${people.email} has logged in successfully`} */}
              {responseMessage}
            </div>
          ) : (
            <></>
          )}

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
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={person.password}
              onChange={handleChange}
              required
            />
          </div>

          <p>Forgot Password?</p>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </article>
    </>
  );
};

export default ControlledInputs;
