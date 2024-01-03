import Carousel from "react-material-ui-carousel";
import { bannerData } from "../../constants/data";
import { Box } from "@mui/material";

const Banner = () => {
  return (
    <Carousel
      navButtonsAlwaysVisible
      animation='slide'
      duration={700}
      navButtonsProps={{
        style: {
          backgroundColor: "#fff",
          borderRadius: 2,
          color: "#868e96",
          margin: "-40px 0 0 0",
          paddingTop: "30px",
          paddingBottom: "30px",
        },
      }}
      indicatorIconButtonProps={{
        style: {
          marginTop: "-80px",
          zIndex: 1,
        },
      }}
    >
      {bannerData.map((item, i) => (
        <Box key={i}>
          <img src={item.url} alt='banner' />
        </Box>
      ))}
    </Carousel>
  );
};

export default Banner;
