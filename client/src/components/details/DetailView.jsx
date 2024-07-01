import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import { useGetProductDetailsQuery } from "../../api/productApi";
import { setProduct } from "../../features/products/productSlice";
import ActionItem from "./ActionItem";

const DetailView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetProductDetailsQuery(id) || {};
  const product = useSelector(state => state.products.product);

  useEffect(() => {
    if (data) dispatch(setProduct(data.product));
  }, [data, dispatch]);

  return (
    <Box>
      <Box>
        <ActionItem product={product} />
      </Box>
      <Box>
        <Typography>{product?.title?.longTitle}</Typography>
      </Box>
    </Box>
  );
};

export default DetailView;
