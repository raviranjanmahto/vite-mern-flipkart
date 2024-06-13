import styled from "@emotion/styled";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const Component = styled(Menu)`
  margin-top: 5px;
  .logout {
    font-size: 14px;
    margin-left: 10px;
  }
`;

const Profile = ({ account, setAccount }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box onClick={e => setOpen(e.currentTarget)}>
        <Typography style={{ marginTop: 2, cursor: "pointer" }}>
          {account}
        </Typography>
      </Box>
      <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={() => setOpen(false)}
      >
        <MenuItem onClick={() => setAccount("")}>
          <LogoutIcon color='primary' fontSize='small' />
          <Typography className='logout'>Logout</Typography>
        </MenuItem>
      </Component>
    </>
  );
};

export default Profile;
