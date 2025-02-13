import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import image from "../images/homeimage-1.jpeg";
import logout from "../Icons/logout.png";

function Brokerpage() {
  const navigate = useNavigate(); // ✅ Define navigate only once

  const [name, setName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logdetails, setlogdetails] = useState({ email: "", password: "" });
  const [error, seterror] = useState(null);

  useEffect(() => {
    const storedName = sessionStorage.getItem("username");
    if (storedName) {
      setName(storedName.toUpperCase());
    }
  }, []);

  const handleLogout = (event) => {
    console.log("Logout button clicked");
    event.stopPropagation();
    sessionStorage.clear();
    navigate("/login");
  };

  function handleInputChange(e) {
    setlogdetails({ ...logdetails, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    seterror(null);

    try {
      const response = await fetch("https://real-estate-backend-awzg.onrender.com/api/broker/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logdetails),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        seterror(data.message || "Login failed");
      }
    } catch (error) {
      seterror("Something went wrong, please try again.");
    }
  }

  return (
    <div>
      <nav className="navbar">
        <div className="nav-logo">Estatery</div>
        <ul className="nav_link">
          <li><Link className="scroll-link" to="/">HomePage</Link></li>
          <li>
            <Link className="scroll-link" to="/buypage">Buy</Link>
          </li>
          <li>
            <Link className="scroll-link" to="/sellerform">Sell</Link>
          </li>
          <li>
            <Link className="scroll-link" to="/about">About Us</Link>
          </li>
          <li>
            <Link className="scroll-link" to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link className="scroll-link" to="/brokerpage">Broker Page</Link>
          </li>
        </ul>

        {name ? (
          <div className="nav-username">
            <h1 className="navhead" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ cursor: "pointer" }}>
              Welcome, {name}
            </h1>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleLogout}>
                  <img className="logout" src={logout} alt="logout" />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="nav_btns">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="login-btn">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>

      <div className="designform">
        <div className="divimg">
          <img src={image} alt="home" className="image" />
        </div>
        <div className="brologcss">
          <h2>Login</h2>
          <br />
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} className="broform">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={logdetails.email} onChange={handleInputChange} required />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={logdetails.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="brobutt">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Brokerpage;
