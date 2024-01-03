import { Box, Typography, styled } from "@mui/material";
import { navData } from "../../constants/data";

const Component = styled(Box)`
  background: #fff;
  display: flex;
  color: #343a40;
  padding: 10px 130px 10px 130px;
  margin-bottom: 20px;
  margin-top: 65px;
  justify-content: space-between;
  .box {
    padding: 12px 8px;
    text-align: center;
  }
  .text {
    font-size: 14px;
    font-weight: 550;
  }
`;

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
