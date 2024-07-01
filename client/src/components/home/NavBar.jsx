import { Box, Typography, styled } from "@mui/material";
import { navData } from "../../constants/data";

const Component = styled(Box)(({ theme }) => ({
  background: "#fff",
  display: "flex",
  color: "#343a40",
  marginBottom: "20px",
  marginTop: "65px",
  justifyContent: "space-between",
  overflowX: "auto", // Allow horizontal scrolling
  [theme.breakpoints.up("md")]: {
    padding: "0px 0px 0px 0px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "0px 130px 0px 130px",
  },
  ".box": {
    padding: "12px 8px",
    textAlign: "center",
    flex: "0 0 auto", // Prevent shrinking of child boxes
  },
  ".text": {
    fontSize: "14px",
    fontWeight: 550,
    fontFamily: "inherit",
  },
}));

const NavBar = () => {
  return (
    <Component>
      {navData.map(data => (
        <Box key={data.text} className='box'>
          <img src={data.url} alt={data.text} />
          <Typography className='text'>{data.text}</Typography>
        </Box>
      ))}
    </Component>
  );
};

export default NavBar;
