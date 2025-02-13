import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Button, Carousel } from "react-bootstrap";
import "../Styles/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Dashboarddetails() {
  const [apiinput, setApiInput] = useState([]);

  function fetchApi() {
    axios.get("https://real-estate-backend-awzg.onrender.com/api/getall").then((response) => {
      console.log(response.data.data);
      setApiInput(response.data.data);
    });
  }

  useEffect(() => {
    fetchApi();
  }, []);

  async function deleteitems(id) {
    try {
      await axios.delete(`https://real-estate-backend-awzg.onrender.com/api/remove/${id}`);
      alert("Record deleted successfully");
    } catch (error) {
      alert("Record unable to delete", error);
    }
    fetchApi();
  }

  // Function to handle approval
  const handleApproval = (id) => {
    const storedApprovals = JSON.parse(localStorage.getItem("approvedProperties")) || {};
    storedApprovals[id] = !storedApprovals[id];
    localStorage.setItem("approvedProperties", JSON.stringify(storedApprovals));
    setApiInput([...apiinput]); // Force re-render
  };

  return (
     <div>
      <h1>Manage Property Approvals</h1>
      <div className="carddesign">
        {apiinput.map((obj) => {
          const isApproved =
            JSON.parse(localStorage.getItem("approvedProperties"))?.[obj._id] || false;

          return (
            <Card key={obj._id} style={{ width: "22rem" }}>
              {obj.images && obj.images.length > 0 && (
                <Carousel>
                  {obj.images.map((image, index) => (
                    <Carousel.Item key={index} className="design">
                      <img
                        className="img"
                        src={`https://real-estate-backend-awzg.onrender.com${image}`}
                        alt={`Property-image ${index + 1}`}
                        onError={(e) => {
                          console.error("Image failed to load:", e.target.src);
                          e.target.style.display = "none"; // Hide broken images
                        }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}

              <Card.Body>
                <Card.Title>Dream Property Awaits</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {obj.Property_Address?.city || "Unknown City"},
                  {obj.Property_Address?.district || "Unknown District"},
                  {obj.Property_Address?.state || "Unknown State"},
                  {obj.Property_Address?.pincode || "Unknown Pincode"}
                </Card.Subtitle>
                <Card.Text>
                  {obj.Property_description}
                  <br />
                  Plot Size: {obj.Plot_Size} sqft
                  <br />
                  Owner: {obj.FullName}
                  <br />
                  Address: {obj.Address}
                  <br />
                  Contact: {obj.ContactNumber}
                </Card.Text>
                <Button
                  variant={isApproved ? "success" : "danger"}
                  onClick={() => handleApproval(obj._id)}
                >
                  {isApproved ? "Approved" : "Not Approved"}
                </Button>
                <Button variant="danger" onClick={() => deleteitems(obj._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboarddetails;
