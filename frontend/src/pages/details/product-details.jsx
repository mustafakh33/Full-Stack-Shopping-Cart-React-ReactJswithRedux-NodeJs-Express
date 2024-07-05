import React, { useRef, useState } from "react";
import "./product-details.css";
import { useGetOneProductQuery } from "../../Redux/productsApi";
import { useParams } from "react-router-dom";
import { Badge, Box, CircularProgress, Typography, styled } from "@mui/material";
import DetailsThumb from "./DetailsThumb";
import { addToCart } from "../../Redux/cartSlice";
import {Button, IconButton} from "@mui/material";
import { Add,  Remove } from "@mui/icons-material";
import {decreaseQuantity,increaseQuantity,} from "../../Redux/cartSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from "react-redux";


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));


const ProductDetails = () => {
  // @ts-ignore
  const {  selectedProducts,selectedProductsID } = useSelector((state) => state.cartt);
  const dispatch = useDispatch();
  
  const productQuantity = (itemApi) => {
    const myProducts = selectedProducts.find((itemUser) => {
      return itemUser.id  === itemApi.id;
    })
    return myProducts.quantity
  }


  let { id } = useParams();
  // data => only one product
  const { data, error, isLoading } = useGetOneProductQuery(id);

  const [index, setindex] = useState(0);
  const myRef = useRef(null);

  const handleTab = (index) => {
    // this.setState({index: index})
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          {" "}
          ERROR{" "}
        </Typography>
      </Box>
    );
  }
  if (data) {
    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>
            {/* <Colors colors={item.colors} /> */}

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {/* <button className="cart">Add to cart</button> */}
            {selectedProductsID.includes(data.id) ?  (
                  <div
                    
                    style={{ display: "flex", alignItems: "center" , marginTop: "33px" }}
                  >
                    <IconButton
                      sx={{ color: "primary", mr: "10px" }}
                      onClick={() => {
                        dispatch(decreaseQuantity(data.id));
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>

                    <StyledBadge badgeContent={productQuantity(data)} color="primary" />
                     
                     <IconButton
                      sx={{ color: "primary", ml: "10px" }}
                      onClick={() => {
                        dispatch(increaseQuantity(data.id));
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  
                  </div>
                ) : (
                  <Button
                    sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                    style={{ marginTop: "33px" }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(addToCart(data));
                    }}
                  >
                    <ShoppingCartIcon sx={{fontSize:"18px",mr:1}} />
                    add to cart
                  </Button>
                )}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductDetails;