import { AppBar, Toolbar, Box, Typography, styled } from "@mui/material";
import Search from "./Search";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
  .component {
    margin-left: 12%;
    line-height: 0;
    color: inherit;
    text-decoration: none;
  }
  .subHeading {
    font-size: 10px;
    font-style: italic;
  }
  .imgSubHeading {
    width: 10px;
    height: 10px;
    margin-left: 4px;
  }
`;

const Header = () => {
  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: 55 }}>
        <Link to='/' className='component'>
          <img src={logoURL} alt='logo' style={{ width: 75 }} />
          <Box style={{ display: "flex" }}>
            <Typography className='subHeading'>
              Explore&nbsp;
              <Box component='span' style={{ color: "#ffe500" }}>
                Plus
              </Box>
            </Typography>
            <img className='imgSubHeading' src={subURL} alt='sub logo' />
          </Box>
        </Link>
        <Search />
        <Box style={{ margin: "0 5% 0 auto" }}>
          <CustomButton />
        </Box>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
