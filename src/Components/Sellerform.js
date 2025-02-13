import React, {  useState, useRef, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import '../Styles/sellerform.css';
import Seller from "./Seller";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logout from '../Icons/logout.png';

function Sellerform() {
  const [input, setInput] = useState({
    FullName: "",
    Address: "",
    ContactNumber: "",
    EmailAddress: "",
    Property_Address: {
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
    Plot_Size: "",
    Property_description: "",
  });
 
  const [images, setImages] = useState([]); // Handle multiple images
   // Store records fetched from the API
  const [editingId, setEditingId] = useState(null); // Track if editing a specific record
  const fileInputRef = useRef(null);
  const [apidetails,setapidetails]  = useState([])
  const [idtoupdel,setidtoupdel] = useState([])

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


  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["city", "district", "state", "pincode"].includes(name)) {
      setInput((prevInput) => ({
        ...prevInput,
        Property_Address: {
          ...prevInput.Property_Address,
          [name]: value,
        },
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  

  // Reset form fields
  const resetForm = () => {
    setInput({
      FullName: "",
      Address: "",
      ContactNumber: "",
      EmailAddress: "",
      Property_Address: {
        city: "",
        district: "",
        state: "",
        pincode: "",
      },
      Plot_Size: "",
      Property_description: "",
    });
    setImages([]);
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input field
    }
  };

  async function fetchapi() {
    try {
      const response = await axios.get("https://real-estate-backend-awzg.onrender.com/api/getall");
      console.log("API Response:", response.data); // Check full response structure
      if (response.data && Array.isArray(response.data.data)) {
        setapidetails(response.data.data);
      
        
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(() => {
    console.log("Updated apidetails:", apidetails);
  }, [apidetails]);  // This will log every time apidetails is updated
  



useEffect(()=>{
 fetchapi();
},[])




  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("FullName", input.FullName);
    formData.append("Address", input.Address);
    formData.append("ContactNumber", input.ContactNumber);
    formData.append("EmailAddress", input.EmailAddress);
    formData.append("Property_Address[city]", input.Property_Address.city);
    formData.append("Property_Address[district]", input.Property_Address.district);
    formData.append("Property_Address[state]", input.Property_Address.state);
    formData.append("Property_Address[pincode]", input.Property_Address.pincode);
    formData.append("Plot_Size", input.Plot_Size);
    formData.append("Property_description", input.Property_description);

    images.forEach((image) => {
      formData.append("images", image); // Correct image field name
    });

    try {
      const url = editingId
        ? `https://real-estate-backend-awzg.onrender.com/api/update/${editingId}`
        : `https://real-estate-backend-awzg.onrender.com/api/create`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(editingId ? "Record updated:" : "Record created:", response.data);
      setidtoupdel([response.data.data])
      console.log(idtoupdel[0]);
      
      // fetchApi();
      resetForm();
      alert(editingId ? "Record updated successfully!" : "Record created successfully!");
    } catch (error) {
      console.error("Error submitting record:", error);
      alert("Error submitting record. Please try again.");
    }
  };
  const updatedetails = async (id) => {
    try {
      const response = await axios.get(`https://real-estate-backend-awzg.onrender.com/api/getall`); // Wait for the latest data
      const data = response.data.data; // Extract the actual array of records
  
      if (!data || !Array.isArray(data)) {
        alert("Failed to fetch updated records.");
        return;
      }
  
      const updatedItem = data.find((obj) => obj._id === id);
  
      if (updatedItem) {
        setInput({
          FullName: updatedItem.FullName || "",
          Address: updatedItem.Address || "",
          ContactNumber: updatedItem.ContactNumber || "",
          EmailAddress: updatedItem.EmailAddress || "",
          Property_Address: updatedItem.Property_Address || { city: "", district: "", state: "", pincode: "" },
          Plot_Size: updatedItem.Plot_Size || "",
          Property_description: updatedItem.Property_description || "",
        });
        setEditingId(id);
        setImages([]); // Reset images
      } else {
        alert("Record not found.");
      }
    } catch (error) {
      console.error("Error fetching updated details:", error);
      alert("An error occurred while fetching records.");
    }
  };
  
  const deleteitems = async (id) => {
console.log("Deleting record with ID:", id);
    try {
      await axios.delete(`https://real-estate-backend-awzg.onrender.com/api/remove/${id}`);
      alert("Record deleted successfully!");
      setidtoupdel([]);
      fetchapi();
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Error deleting record. It might not exist or the server is down.");
    }
  };

  // Fetch data when the component mounts
  
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
<div className="formbackcol" >

      <Seller/>
<div className="formis">
<h1>SellerForm</h1>
<Form onSubmit={handleSubmit} className="innerform">
        {["FullName", "Address", "ContactNumber", "EmailAddress", "Plot_Size", "Property_description"].map((field) => (
          <Form.Group key={field}>
            <Form.Label>{field.replace("_", " ")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={field}
              onChange={handleChange}
              name={field}
              value={input[field]}
            />
          </Form.Group>
        ))}

        {["city", "district", "state", "pincode"].map((field) => (
          <Form.Group key={field}>
            <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
            <Form.Control
              type="text"
              placeholder={field}
              onChange={handleChange}
              name={field}
              value={input.Property_Address[field]}
            />
          </Form.Group>
        ))}

        <Form.Group>
          <Form.Label>Image Upload</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
        </Form.Group>
<br></br>
        <Button type="submit">{editingId ? "Save Changes" : "Submit"}</Button>
        <Button type="button" onClick={resetForm} variant="secondary" className="ms-2">
          Reset
        </Button>
      </Form>
      </div>
      <br></br>
<div className="divtosee">

{idtoupdel && idtoupdel.map((obj)=>(
<div key={obj._id}>
<img src={`https://real-estate-backend-awzg.onrender.com${obj.images[0]}`} alt="Property" width="200" />
<br></br>
  FullName:{obj.FullName}
  <br></br>Address:{obj.Address},ContactNumber:{obj.ContactNumber}, <br></br>Emailaddress:{obj.EmailAddress},<br></br>Propertyaddress:{obj.Property_Address.city}
{obj.Property_Address.district},{obj.Property_Address.state},{obj.Property_Address.pincode},<br></br>Plot_Size:{obj.Plot_Size}
<p>{obj.Property_description},</p>
<button style={{ background: "transparent", border: ".2px  solid black", color: "inherit" }} onClick={()=>{updatedetails(obj._id)}}>update </button>
<button style={{ background: "transparent", border: ".2px solid black", color: "inherit"  }} onClick={()=>{deleteitems(obj._id)}}>delete</button>
</div>
))}





</div>



    </div>

    </div>
  );
}

export default Sellerform;
