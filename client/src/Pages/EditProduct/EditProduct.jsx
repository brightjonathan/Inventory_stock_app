import { useEffect, useState } from 'react';
import ProductForm from '../../Component/Products/productForm/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    singleProduct,
    GetSingleProductStart,
    GetSingleProductSuccess,
    GetSingleProductFailure,
    UpdateFailure,
    UpdateStart,
    UpdateSuccess
  } from '../../Redux/product/ProductSlice';
  import Loader from '../../Component/loading/Loader';
  import { toast } from "react-toastify";



const EditProduct = () => {

    const {id} = useParams()
  
    const productEdit = useSelector(singleProduct)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
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
        setLoading(false);
    } catch (error) {
       setError(true)
       setLoading(false)
    }

   };

  useEffect(()=>{
      fetchSingleproduct();
  },[dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };


  const saveProduct = async (e) => {
    e.preventDefault();


    // if (!product.name || !product.category || !product.quantity || !product.price || !product.description || !product.productImage) {
    //   toast.error('Pls all input fields are required!')
    // }

    const formData = new FormData();
    formData.append("name", product?.name);

    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    //console.log(...formData);
    try {
      setLoading(true);
      dispatch(UpdateStart());
      const res = await fetch(`/api/product/updatepproduct/${id}`, {
        method: 'PATCH',
        body: formData
      });

      if (!res.ok) {
        setLoading(false);
        dispatch(UpdateFailure(`Error: ${res.statusText}`));
        //toast.error(`Error: ${res.statusText}`);
        return;
      }

      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        dispatch(UpdateFailure(data.message));
        toast.error(data.message);
        return;
      }
      dispatch(UpdateSuccess(data))
      setLoading(false);
      navigate('/dashboard');
      toast.success("Updated successfully");
    } catch (error) {
      setLoading(false);
      dispatch(CreateFailure(error.message));
      toast.error(data.message);
    }

  };



  return (
    <div>
      {loading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  )
}

export default EditProduct;
