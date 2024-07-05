import "./Home.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Stack, useTheme } from "@mui/material";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { addToCart } from "../../Redux/cartSlice";
import {Button,styled, IconButton,Badge,Typography,} from "@mui/material";
import { Add,  Remove } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {decreaseQuantity,increaseQuantity,} from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const Home = () => {
  const { data, error, isLoading } = useGetproductsByNameQuery("bulbasaur");
  const theme = useTheme();
  // @ts-ignore
  const { selectedProducts, selectedProductsID } = useSelector((state) => state.cartt);
  const dispatch = useDispatch();

  const productQuantity = (itemApi) => {
    const myProducts = selectedProducts.find((itemUser) => {
      return itemUser.id  === itemApi.id;
    })
    return myProducts.quantity
  }
  const navigate = useNavigate()
  
  // data is error
  if (error) {
    return <>Oh no, there was an error</>;
  }
  // data is loading
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  // data is exist
  if (data) {
    return (
      <Stack
        direction={"row"}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item, index) => {
          return (
            <Card
              className="card"
              key={index}
              sx={{ maxWidth: 277, mb: 6, mx: 2 }}
            >
              <CardMedia
                component="img"
                height="277"
                image={item.imageLink[0]}
                alt="Paella dish"
                onClick={() => {
                  navigate(`product-details/${item.id}`)
                }
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>

              <CardActions
                disableSpacing
                sx={{ justifyContent: "space-between" }}
              >
                {selectedProductsID.includes(item.id) ?  (
                  <div
                    dir="rtl"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <IconButton
                      sx={{ color: "primary", ml: "10px" }}
                      onClick={() => {
                        dispatch(increaseQuantity(item.id));
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>

                    <StyledBadge badgeContent={productQuantity(item)} color="primary" />

                    <IconButton
                      sx={{ color: "primary", mr: "10px" }}
                      onClick={() => {
                        dispatch(decreaseQuantity(item.id));
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                  </div>
                ) : (
                  <Button
                    sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      dispatch(addToCart(item));
                    }}
                  >
                    <ShoppingCartIcon sx={{fontSize:"18px",mr:1}} />
                    add to cart
                  </Button>
                )}

                <Typography
                  mr={1}
                  variant="body1"
                  color={theme.palette.error.light}
                >
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
