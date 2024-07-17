import { Box, Button, styled } from "@mui/material";
import { FlashOn, ShoppingCart } from "@mui/icons-material";

const LeftContainer = styled(Box)`
  min-width: 40%;
  padding: 40px 0 0 80px;
`;

const ImageContainer = styled(Box)`
  padding: 15px 20px;
  border: 1px solid #f0f0f0;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StyledButton = styled(Button)`
  width: 48%;
  height: 50px;
  border-radius: 2px;
`;

const ActionItem = ({ product }) => {
  return (
    <LeftContainer>
      <ImageContainer>
        <Image src={product.url} alt='product' />
      </ImageContainer>
      <StyledButton
        variant='contained'
        sx={{ marginRight: "10px", background: "#FF9F00" }}
      >
        <ShoppingCart /> Add to cart
      </StyledButton>
      <StyledButton variant='contained' sx={{ background: "#FB541B" }}>
        <FlashOn /> Buy Now
      </StyledButton>
    </LeftContainer>
  );
};

export default ActionItem;
