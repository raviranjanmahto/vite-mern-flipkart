import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";

import { Box, Button, Divider, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Components = styled(Box)`
  background-color: #ffffff;
`;

const Deal = styled(Box)`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #7f7f7f;
`;

const Text = styled(Typography)`
  margin-top: 5px;
`;

const Slide = ({ products, title, timer }) => {
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  return (
    <Components>
      <Deal>
        <Typography
          sx={{ fontSize: "22px", fontWeight: 600, lineHeight: "32px" }}
        >
          {title}
        </Typography>
        {timer && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#7F7F7F",
              gap: "0.2rem",
            }}
          >
            <img src={timerURL} alt='timer logo' style={{ width: "24px" }} />
            <Countdown date={Date.now() + 14 * 60 * 60 * 1000} />
            <Typography>Left</Typography>
          </Box>
        )}
        <Button
          variant='contained'
          color='primary'
          sx={{
            marginLeft: "auto",
            backgroundColor: "#2874F0",
            borderRadius: "2px",
            fontSize: "13px",
          }}
        >
          View All
        </Button>
      </Deal>
      <Divider />
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
      >
        {products?.map((product, index) => (
          <Box key={index} textAlign='center' sx={{ padding: "25px 15px" }}>
            <img
              src={product.url}
              alt='product'
              style={{ width: "auto", height: "150px" }}
            />
            <Text sx={{ fontWeight: 600, color: "#212121" }}>
              {product.title?.shortTitle}
            </Text>
            <Text sx={{ color: "green" }}>{product.discount}</Text>
            <Text sx={{ color: "#212121", opacity: 0.6 }}>
              {product.tagline}
            </Text>
          </Box>
        ))}
      </Carousel>
    </Components>
  );
};

export default Slide;
