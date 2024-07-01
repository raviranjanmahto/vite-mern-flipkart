import { Box } from "@mui/material";
import Slide from "./Slide";

const MidSlide = ({ products, title }) => {
  const adURL =
    "https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70";

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}>
      <Box
        sx={{ width: { xs: "100%", md: "100%", lg: "83%" }, marginTop: "10px" }}
      >
        <Slide products={products} title={title} timer />
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          padding: "5px",
          marginTop: "10px",
          marginLeft: { lg: "10px", xs: "0" },
          width: { xs: "100%", lg: "17%" },
          display: { xs: "none", md: "none", lg: "block" },
        }}
      >
        <img src={adURL} alt='ad' style={{ width: "100%" }} />
      </Box>
    </Box>
  );
};

export default MidSlide;
