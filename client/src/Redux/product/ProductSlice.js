import {createSlice} from '@reduxjs/toolkit';

//setting initail state
const initialState = {
    product: null,
    products: [],
    error: null,
    loading: null,
    totalStoreValue: 0,
    outOfStock: 0,
    category: [],
};


const productSlice = createSlice({
    name: 'product',
    initialState,

    reducers:{
        CreateStart: (state)=>{
            state.loading = true
          },
          CreateSuccess: (state, action)=>{
              state.products = action.payload,
              state.loading = true,
              state.error = null
          },
          CreateFailure: (state, action)=>{
              state.error = action.payload,
              state.loading = false
          },
          UpdateStart: (state)=>{
            state.loading = true
          },
          UpdateSuccess: (state, action)=>{
              state.products = action.payload,
              state.loading = true,
              state.error = null
          },
          UpdateFailure: (state, action)=>{
              state.error = action.payload,
              state.loading = false
          },
          GetProductStart: (state)=>{
            state.loading = true
          },
          GetProductSuccess: (state, action)=>{
              state.products = action.payload,
              state.loading = true,
              state.error = null
          },
          GetProductFailure: (state, action)=>{
              state.error = action.payload,
              state.loading = false
          },
          GetSingleProductStart: (state)=>{
            state.loading = true
          },
          GetSingleProductSuccess: (state, action)=>{
              state.product = action.payload,
              state.loading = true,
              state.error = null
          },
          GetSingleProductFailure: (state, action)=>{
              state.error = action.payload,
              state.loading = false
          },
          CALC_STORE_VALUE(state, action) {
            const products = action.payload;
      
            if (!Array.isArray(products)) {
              // Handle the case where the payload is not an array
              return;
            }
      
            const array = [];
            products.map((item) => {
              const { price, quantity } = item;
              const productValue = price * quantity;
              return array.push(productValue);
            });
            const totalValue = array.reduce((a, b) => {
              return a + b;
            }, 0);
            state.totalStoreValue = totalValue;
          },
      
          CALC_OUTOFSTOCK(state, action) {
            const products = action.payload;
      
            if (!Array.isArray(products)) {
              // Handle the case where the payload is not an array
              return;
            }
      
            const array = [];
            products.map((item) => {
              const { quantity } = item;
              return array.push(quantity);
            });
            let count = 0;
            array.forEach((number) => {
              if (number === 0 || number === '0') {
                count += 1;
              }
            });
            state.outOfStock = count;
          },
      
          CALC_CATEGORY(state, action) {
            const products = action.payload;
      
            if (!Array.isArray(products)) {
              // Handle the case where the payload is not an array
              return;
            }
      
            const array = [];
            products.map((item) => {
              const { category } = item;
              return array.push(category);
            });
            const uniqueCategory = [...new Set(array)];
            state.category = uniqueCategory;
          },
    }
});

export const {
  CreateFailure,
  CreateStart,
  CreateSuccess,
  GetProductFailure,
  GetProductStart,
  GetProductSuccess,
  GetSingleProductFailure,
  GetSingleProductStart,
  GetSingleProductSuccess,
  UpdateFailure,
  UpdateStart,
  UpdateSuccess,
  CALC_STORE_VALUE,
  CALC_OUTOFSTOCK,
  CALC_CATEGORY
} = productSlice.actions;


export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectCategory = (state) => state.product.category;
export const singleProduct = (state)=> state.product.product;
export default productSlice.reducer;


