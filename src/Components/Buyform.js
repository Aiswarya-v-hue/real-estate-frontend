import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import '../Styles/Buyform.css';
function BuyForm() {
  const [buyerInput, setBuyerInput] = useState({
    name: '',
    address: '',
    phoneno: '',
    productid: ''
  });

  const [propertyDetails, setPropertyDetails] = useState(null);
  const [orders, setOrders] = useState([]);  // Store recent orders
  const [showModal, setShowModal] = useState(false);
  const productid = localStorage.getItem('productid');

  // Fetch property details when component mounts
  useEffect(() => {
    if (productid) {
      setBuyerInput((prev) => ({ ...prev, productid }));

      axios.get(`https://real-estate-backend-awzg.onrender.com/api/getall`)
        .then((response) => {
          const selectedProduct = response.data.data.find((obj) => obj._id === productid);
          setPropertyDetails(selectedProduct);
        })
        .catch((error) => console.error('Error fetching product details:', error));
    }
  }, [productid]);

  const handleInputChange = (e) => {
    setBuyerInput({ ...buyerInput, [e.target.name]: e.target.value });
  };

  const createBuyer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://real-estate-backend-awzg.onrender.com/api/buyer/create",buyerInput);
alert("data posted ")

console.log(response.data);

      if (response.status === 201 && response.data.newBuyer) {
        const newOrder = response.data.newBuyer;
console.log(newOrder);

        setOrders([newOrder]); 
        
         // Store only the latest order
        setShowModal(true);
        alert("Order placed successfully");
setBuyerInput({
  name: '',
  address: '',
  phoneno: '',
  productid: ''

})

      } else {
        alert("Order creation failed.");
      }
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      alert("Failed to submit order.");
    }
   
  };

  const deleteOrder = async (id) => {
    if (!id) {
      alert("No order found to delete.");
      return;
    }
    try {
      await axios.delete(`https://real-estate-backend-awzg.onrender.com/api/buyer/remove/${id}`);

      // Remove order from UI
      setOrders([]);
      setShowModal(false);
      alert("Order deleted successfully");
    } catch (error) {
      alert("Unable to delete order.");
    }
  };

  return (
    <div className='coloringdiv'>
      <h2 className='buycss'>Buying Property</h2>
      <h6>Sending Request to Buy Selected Property Provide Below Details</h6>
      
      <div className='correctingdiv'>
      {propertyDetails ? (
        <div className='design'>
          <h4>Property Details:</h4>
          <p><strong>City:</strong> {propertyDetails.Property_Address?.city || "Unknown"}</p>
          <p><strong>Description:</strong> {propertyDetails.Property_description}</p>
          <p><strong>Plot Size:</strong> {propertyDetails.Plot_Size} Sqft</p>
        </div>
      ) : (
        <p>Loading property details...</p>
      )}

      <Form onSubmit={createBuyer} className='buyform'>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' name='name' value={buyerInput.name} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' name='address' value={buyerInput.address} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='text' name='phoneno' value={buyerInput.phoneno} onChange={handleInputChange} required />
        </Form.Group>
<br></br>
        <Button type='submit'>Submit Order</Button>
      </Form>

      {/* Modal for previewing order details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}className='modeldesign'>
        <Modal.Header closeButton>
          <Modal.Title>Order Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Recent Orders:</h5>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id}>
                <p><strong>Name:</strong> {order.name}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phoneno}</p>
                <p><strong>Product ID:</strong> {order.productid}</p>
                <Button variant='danger' onClick={() => deleteOrder(order._id)}>Cancel Order</Button>
              </div>
            ))
          ) : (
            <p>No recent orders found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
<div className='msgdiv'><p className='texti'>The broker will contact you shortly after submitting order please provide valid phone number   </p></div>
</div>

    </div>
  );
}

export default BuyForm;
