import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function Dashcomp() {
  const [buyerdetails, setBuyerdetails] = useState([]);
  const [products, setProducts] = useState([]);

  // Memoize the fetchProductDetails function
  const fetchProductDetails = useCallback(async () => {
    try {
      const res = await axios.get("https://real-estate-backend-awzg.onrender.com/api/getall");
      setProducts(res.data.data);
      
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, []); // No dependencies means it's stable and doesn't change

  // Fetch Buyer Details
  async function fetchBuyerDetails() {
    try {
      const res = await axios.get("https://real-estate-backend-awzg.onrender.com/api/buyer/getall");
      setBuyerdetails(res.data.data);
    } catch (error) {
      console.error("Error fetching buyer details:", error);
    }
  }

  // Fetch both buyer and product details on component mount
  useEffect(() => {
    fetchBuyerDetails();
    fetchProductDetails();
  }, [fetchProductDetails]); // Now fetchProductDetails is memoized

  return (
    <div className="dashcomp">
      <hr />
      <h1 className="buyerdet">Buyer Details</h1>

      {buyerdetails.map((buyer) => {
        const matchedProduct = products.find(
          (prod) => prod._id === buyer.productid
        );
        console.log(matchedProduct);

        return (
          <div key={buyer._id} className="buyer-card">
            <h2>Buyer Info</h2>
            <p><strong>Name:</strong> {buyer.name}</p>
            <p><strong>Address:</strong> {buyer.address}</p>
            <p><strong>Phone No:</strong> {buyer.phoneno}</p>

            {matchedProduct ? (
              <>
                <h2>Selected Property</h2>
                <p><strong>Full Name:</strong> {matchedProduct.FullName}</p>
                <p><strong>Location:</strong> {matchedProduct.Address}</p>
                {matchedProduct.images &&
                  matchedProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={`https://real-estate-backend-awzg.onrender.com/uploads/${image}`}
                      alt={`Property ${index + 1}`}
                      width="400px"
                      height="300px"
                    />
                  ))}
              </>
            ) : (
              <p>Loading product details...</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Dashcomp;
