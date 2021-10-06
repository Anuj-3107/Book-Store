import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../Actions/productActions';
import Axios from "axios";

export default function SellScreen(props) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [publisher, setPublisher] = useState('');
    const [description, setDescription] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [phNumber, setPhNumber] = useState('');
    const [pinCode, setPinCode]= useState('');

  //const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const submitHandler = async(e) => {
    const bodyFormData = new FormData();
    bodyFormData.append('name',name);
    bodyFormData.append('image',image);
    bodyFormData.append('price',price);
    bodyFormData.append('publisher',publisher);
    bodyFormData.append('sellerName',sellerName);
    bodyFormData.append('description',description);
    bodyFormData.append('phNumber',phNumber);
    bodyFormData.append('pinCode',pinCode);
    const config={
      headers:{
          'content-type':'multipart/form-data',
          Authorization:`Bearer${userInfo.token}`
      }
  }
   // e.preventDefault();
     await Axios.post('/api/products/createProducts', bodyFormData,{config});
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Upload Product</h1>
          <label htmlFor="name">Book Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter book name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="image">Book Image</label>
          <input
            type="file"
            id="image"
            required
            onChange={(e) => setImage(e.target.files[0])}
          ></input>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="publisher">Publisher Name</label>
          <input
            type="text"
            id="publisher"
            placeholder="Enter publisher name"
            required
            onChange={(e) => setPublisher(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="sellername">Seller Name</label>
          <input
            type="text"
            id="sellername"
            required
            onChange={(e) => setSellerName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="phNumber">Mobile Number</label>
          <input
            type="text"
            id="phNumber"
            placeholder="Enter Mobile Number"
            required
            onChange={(e) => setPhNumber(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="pincode">Pin Code</label>
          <input
            type="text"
            id="pincode"
            placeholder="Enter pincode"
            required
            onChange={(e) => setPinCode(e.target.value)}
          ></input>
        </div>
        <div>
          <button className="primary" type="submit">
           Upload Product
          </button>
        </div>
      </form>
    </div>
  );
}