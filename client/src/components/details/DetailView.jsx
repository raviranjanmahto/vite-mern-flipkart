import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography, styled } from "@mui/material";

import { useGetProductDetailsQuery } from "../../api/productApi";
import { setProduct } from "../../features/products/productSlice";
import ActionItem from "./ActionItem";

const GridLeft = styled(Grid)`
  display: flex;
`;

const GridRight = styled(Grid)`
  color: #000000;
  margin-top: 50px;
`;

const DetailView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductDetailsQuery(id) || {};
  const product = useSelector(state => state.products.product);
  const fassured =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  useEffect(() => {
    if (data) dispatch(setProduct(data.product));
  }, [data, dispatch]);

  if (isLoading) return <Box>Loading...</Box>;

  return (
    <Grid container sx={{ backgroundColor: "#FFFFFF" }}>
      <GridLeft item xs={12} md={4} sm={8} lg={4}>
        <ActionItem product={product} />
      </GridLeft>
      <GridRight item xs={12} md={8} sm={8} lg={8}>
        <Typography>{product?.title?.longTitle}</Typography>
        <Typography sx={{ mt: 1, color: "#878787", fontSize: 14 }}>
          8 Ratings & 1 Reviews
          <Box component='span'>
            <img
              src={fassured}
              alt='fassured'
              style={{ width: 77, marginLeft: 20 }}
            />
          </Box>
        </Typography>
        <Typography sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
          <Box component='span' sx={{ fontSize: 28 }}>
            ₹{product?.price?.cost}
          </Box>
          <Box component='span' sx={{ color: "#878787" }}>
            <strike>₹{product?.price?.mrp}</strike>
          </Box>
          <Box component='span' sx={{ color: "#388E3C" }}>
            {product?.price?.discount}
          </Box>
        </Typography>
      </GridRight>
    </Grid>
  );
};

export default DetailView;
