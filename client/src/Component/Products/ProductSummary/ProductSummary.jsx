import { useEffect } from "react";
import "./Productsummary.scss";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import InforBox, { InforBoxvalue } from "../../InforBox/InforBox";
import { 
  CALC_STORE_VALUE,
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  selectTotalStoreValue,
  selectCategory,
  selectOutOfStock 
} from "../../../Redux/product/ProductSlice";


// Icons
const earningIcon = <FaMoneyBillTrendUp size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;


// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({products}) => {

 

  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">e-ventory Statistics</h3>

      <div className="info-summary">
      <InforBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />

        <InforBoxvalue
          icon={earningIcon}
          title={"Total Store Value"}
          count={`${formatNumbers(totalStoreValue.toFixed(2))} `}
          bgColor="card2"
          />

        <InforBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />

        <InforBox
          icon={categoryIcon}
          title={"All Categories"}
          count={category.length}
          bgColor="card4"
        />
        
      </div>
    </div>
  )
};

export default ProductSummary;
