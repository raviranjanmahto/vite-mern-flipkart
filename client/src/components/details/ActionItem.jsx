import { Box, Button } from "@mui/material";

const ActionItem = ({ product }) => {
  return (
    <Box>
      <img src={product.url} alt='product' />
      <Button variant='contained'>Add to cart</Button>
      <Button variant='contained'>Buy Now</Button>
    </Box>
  );
};

export default ActionItem;
