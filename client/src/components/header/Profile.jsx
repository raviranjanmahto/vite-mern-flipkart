import styled from "@emotion/styled";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../features/users/userSlice";
import { useLogoutUserMutation } from "../../api/userApi";

const Component = styled(Menu)`
  margin-top: 5px;
  .logout {
    font-size: 14px;
    margin-left: 10px;
  }
`;

const Profile = ({ account, setAccount }) => {
  const [open, setOpen] = useState(false);
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      setAccount("");
      toast.success("Logout success");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

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
        <MenuItem disabled={isLoading} onClick={handleLogout}>
          <LogoutIcon color='primary' fontSize='small' />
          <Typography className='logout'>Logout</Typography>
        </MenuItem>
      </Component>
    </>
  );
};

export default Profile;
