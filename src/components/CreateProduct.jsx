// components/CreateProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
//   const [price, setPrice] = useState('');
  
  const [startingBid, setStartingBid] = useState(''); // New state for startingBid
  const [seller, setSeller] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to create a product');
        return;
      }
      
      const productData = { name, description,  startingBid, seller };
      const response = await axios.post('https://capstone-auction-platform-backend-task-1.onrender.com/api/products/create', productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Product created successfully');
      
      // Optionally clear the form fields after successful submission
      setName('');
      setDescription('');
    //   setPrice('');
      setSeller('');
      setStartingBid(''); // Clear the startingBid field

      navigate('/GetAllProducts');
      
    } catch (error) {
      console.error('Create product error:', error.response ? error.response.data : error.message);
      alert('Error creating product: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
      </div>
      <div>
        <label>Product Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          required
        />
      </div>
      {/* <div>
        <label>Starting Bid Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Starting Bid Price"
          required
        />
      </div> */}
      <div>
        <label>Starting Bid:</label> {/* New input field for startingBid */}
        <input
          type="number"
          value={startingBid}
          onChange={(e) => setStartingBid(e.target.value)}
          placeholder="Starting Bid Amount"
          required
        />
      </div>
      <div>
        <label>Seller:</label>
        <input
          type="text"
          value={seller}
          onChange={(e) => setSeller(e.target.value)}
          placeholder="Seller_ID"
          required
        />
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
}

export default CreateProduct;

