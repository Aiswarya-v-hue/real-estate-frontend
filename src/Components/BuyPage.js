import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Modal, Carousel } from "react-bootstrap"; // Import Carousel
import "../Buypage.css";
import { Link } from "react-router-dom";
import Buydesign from "./Buydesign";
import { useNavigate } from "react-router-dom";
import logout from '../Icons/logout.png';
function BuyPage() {
  const [apiinput, setApiInput] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();// ✅ Define navigate only once

  const [name, setName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
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


  useEffect(() => {
    axios
      .get("https://real-estate-backend-awzg.onrender.com/api/getall")
      .then((result) => {
        console.log("API Data:", result.data.data);
        const approvedProperties = JSON.parse(localStorage.getItem("approvedProperties")) || {};
        const filteredProperties = result.data.data.filter((property) => approvedProperties[property._id]);
        setApiInput(filteredProperties);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },[]);

  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBuy = (id) => {
    console.log(id);
    localStorage.setItem("productid", id);
  };

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
      <Buydesign />
<div className="buypage">
      <div className="buysetion">
        {apiinput.map((obj) => (
          <Card key={obj._id} style={{ width: "18rem", margin: "10px" }}>
            {obj.images && obj.images.length > 0 && (
              <Card.Img
                className="img"
                variant="top"
                src={`https://real-estate-backend-awzg.onrender.com${obj.images[0]}`}
                alt="Card image"
              />
            )}
            <Card.Body>
              <Card.Title>Dream Property Awaits</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {obj.Property_Address?.city || "Unknown City"},
                {obj.Property_Address?.state || "Unknown State"},
                {obj.Property_Address?.district || "Unknown District"},
                {obj.Property_Address?.pincode || "Unknown Pincode"}
              </Card.Subtitle>
              <Card.Text className="designtext">
                {obj.Property_description}
                <br />
                <span>{obj.Plot_Size} Sqft</span>
              </Card.Text>
              <Button className="view-detail-btn" onClick={() => handleViewDetail(obj)}>
                View In Detail
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal with Carousel for Multiple Images */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Property Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ textAlign: "center" }}>
              {/* Bootstrap Carousel to Show Multiple Images */}
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <Carousel>
                  {selectedProduct.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        src={`https://real-estate-backend-awzg.onrender.com${image}`}
                        alt={`Property-Images ${index + 1}`}
                        style={{
                          width: "100%",
                          maxHeight: "300px",
                          objectFit: "cover",
                          marginBottom: "20px",
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}

              <h2>{selectedProduct.Property_Address?.city || "Unknown City"}</h2>
              <p>{selectedProduct.Property_description}</p>
              <p>
                <strong>Plot Size:</strong> {selectedProduct.Plot_Size} Sqft
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Link to="/buyform">
              <Button onClick={() => handleBuy(selectedProduct._id)}>Buy</Button>
            </Link>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
    </div>
  );
}

export default BuyPage;
