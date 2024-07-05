import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProducts: JSON.parse(localStorage.getItem("selectedProducts")) || [],
  selectedProductsID: JSON.parse(localStorage.getItem("selectedProductsID")) || [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, action) => {
    const productWithQuantity = {...action.payload, "quantity":1}
    state.selectedProducts.push(productWithQuantity);
    state.selectedProductsID.push(action.payload.id);
    localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));
    localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID));
    },

    increaseQuantity: (state, action) => {
        const incresdedProduct = state.selectedProducts.find((item) => {
            return item.id === action.payload;
        })
        incresdedProduct.quantity +=1;
        localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));
    },

    decreaseQuantity: (state, action) => {
        const decresdedProduct = state.selectedProducts.find((item) => {
            return item.id === action.payload;
        })
        decresdedProduct.quantity -=1;
        if (decresdedProduct.quantity === 0) {
            const newArray = state.selectedProducts.filter((item) => {
                return item.id !== action.payload;
            })
            const newArray2 = state.selectedProductsID.filter((item) => {
                return item !== action.payload;
            })
            state.selectedProducts = newArray
            state.selectedProductsID = newArray2
            localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID));

        }
        localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));
    },

    deleteProducts: (state, action) => {
        const newArray = state.selectedProducts.filter((item) => {
            return item.id !== action.payload;
        })
        const newArray2 = state.selectedProductsID.filter((item) => {
            return item !== action.payload;
        })
        state.selectedProducts = newArray
        state.selectedProductsID = newArray2

        localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts));
        localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID));

    },

  },
})

// Action creators are generated for each case reducer function
export const { addToCart,increaseQuantity ,decreaseQuantity , deleteProducts } = cartSlice.actions

export default cartSlice.reducer