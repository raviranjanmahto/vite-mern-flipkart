import { AppBar, Toolbar, Box, Typography, styled } from "@mui/material";
import Search from "./Search";
import CustomButton from "./CustomButton";

const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
`;

const Component = styled(Box)`
  margin-left: 12%;
  line-height: 0;
`;

const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;

const SubImage = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});

const Header = () => {
  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: 55 }}>
        <Component>
          <img src={logoURL} alt='logo' style={{ width: 75 }} />
          <Box style={{ display: "flex" }}>
            <SubHeading>
              Explore&nbsp;
              <Box component='span' style={{ color: "#ffe500" }}>
                Plus
              </Box>
            </SubHeading>
            <SubImage src={subURL} alt='sub logo' />
          </Box>
        </Component>
        <Search />
        <Box style={{ margin: "0 5% 0 auto" }}>
          <CustomButton />
        </Box>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
