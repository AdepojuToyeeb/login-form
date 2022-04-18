import React, { useState } from "react";
// JS
// const input = document.getElementById('myText');
// const inputValue = input.value
// React
// value, onChange

const ControlledInputs = () => {
  const [person, setPerson] = useState({ firstName: "", password: "", email: "", phone: "" });
  const [people, setPeople] = useState([]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.firstName && person.password && person.email&& person.phone) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      setPerson({ firstName: "", password: "", email: "" , phone: ""});
    }
  };
  return (
    <>
      <article className="form">
        <form>
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
              type="password"
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
              type="number"
              placeholder="Phone Number"
              id="phone"
              name="phone"
              value={person.phone}
              onChange={handleChange}
              required
            />
          </div>
          <p>Forgot Password?</p>
          <p>No account? <span>Sign Up</span></p>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </article>
    </>
  );
};

export default ControlledInputs;
