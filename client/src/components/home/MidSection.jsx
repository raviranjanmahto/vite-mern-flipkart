import { Grid } from "@mui/material";
import { imageURL } from "../../constants/data";

const MidSection = () => {
  return (
    <Grid container sx={{ marginTop: "10px" }}>
      {imageURL.map((url, index) => (
        <Grid key={index} item lg={4} md={4} sm={12} xs={12}>
          <img src={url} alt='ad' style={{ width: "100%" }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MidSection;
