import React, { useEffect, useState } from "react";
import './ProductDetails.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Card from "../../card/Card";
import Loader from "../../loading/Loader";
import { 
  GetSingleProductFailure, 
  GetSingleProductStart, 
  GetSingleProductSuccess, 
  singleProduct } from "../../../Redux/product/ProductSlice";

const ProductDetails = () => {


  const dispatch = useDispatch();
  const {id} = useParams()
  
  const { isLoggedIn} = useSelector((state) => state.user);
  const productEdit = useSelector(singleProduct)


const [product, setProduct] = useState(productEdit);
const [loading, setLoading] = useState(false);

 //fetching the product from the database
 const fetchSingleproduct = async ()=>{

  try {
      setLoading(true)
      dispatch(GetSingleProductStart())

      const res = await fetch(`/api/product/singleproduct/${id}`);
      const data = await res.json();

      if (data.success === false ) {
          setLoading(false)
          dispatch(GetSingleProductFailure(data.message))
          toast.error(data.message);
          return; 
      }

      //console.log(data);
      dispatch(GetSingleProductSuccess(data));
      setProduct(data)
      setLoading(false);
  } catch (error) {
     setError(true)
     setLoading(false)
  }

 };

useEffect(()=>{
  if (isLoggedIn === true) {
    fetchSingleproduct();
  };
},[dispatch, id, isLoggedIn]);


  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };



  return (
    <div className="product-detail">
    <h3 className="--mt">Product Detail</h3>
    <Card cardClass="card">
      {loading && <Loader />}
      {product && (
        <div className="detail">
          <Card cardClass="group">
            {product?.image ? (
              <img
                src={product.image.filePath}
                alt={product.image.fileName}
              />
            ) : (
              <p>No image set for this product</p>
            )}
          </Card>
          <h4>Product Availability: {stockStatus(product.quantity)}</h4>
          <hr />
          <h4>
            <span className="badge">Name: </span> &nbsp; {product.name}
          </h4>
          <p>
            <b>&rarr; SKU : </b> {product.sku}
          </p>
          <p>
            <b>&rarr; Category : </b> {product.category}
          </p>
          <p>
            <b>&rarr; Price : </b> &#x20A6;{Number(product.price).toLocaleString('en-us')}
          </p>
          <p>
            <b>&rarr; Quantity in stock : </b> {product.quantity}
          </p>
          <p>
            <b>&rarr; Total Value in stock : </b> &#x20A6;{Number(product.price * product.quantity).toLocaleString('en-us')}
          </p>
          <hr />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description),
            }}
          ></div>
          <hr />
          <code className="--color-dark">
            Created on: {product.createdAt.toLocaleString("en-US")}
          </code>
          <br />
          <code className="--color-dark">
            Last Updated: {product.updatedAt.toLocaleString("en-US")}
          </code>
        </div>
      )}
    </Card>
  </div>
  )
}

export default ProductDetails;


