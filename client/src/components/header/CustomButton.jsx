import { Box, Button, Typography, styled } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginDialog from "../login/loginDialog";
import { useState } from "react";

const Wrapper = styled(Box)`
  display: flex;
  margin: 0 3% 0 auto;
  & > button,
  & > p,
  & > div {
    margin-right: 40px;
    font-size: 16px;
    align-items: center;
  }
  .btnLogin {
    color: #2874f0;
    background: #fff;
    text-transform: none;
    padding: 5px 40px;
    border-radius: 2px;
    box-shadow: none;
    font-weight: 600;
    height: 32px;
  }
`;

const CustomButton = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(true);
  };

  return (
    <Wrapper>
      <Button variant='contained' className='btnLogin' onClick={handleToggle}>
        Login
      </Button>
      <Typography style={{ marginTop: 3, width: 135 }}>
        Become a Seller
      </Typography>
      <Typography style={{ marginTop: 3 }}>More</Typography>
      <Box style={{ display: "flex", marginTop: 3 }}>
        <ShoppingCartIcon />
        <Typography>Cart</Typography>
      </Box>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButton;
