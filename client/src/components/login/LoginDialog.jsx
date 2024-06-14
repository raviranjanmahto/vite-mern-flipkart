import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../../context/AppContext";
import { useLoginUserMutation } from "../../api/userApi";
import { useSignupUserMutation } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/users/userSlice";

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
  display: flex;
  .imgLogin {
    background: #2874f0
      url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
      center 85% no-repeat;
    height: 81.7%;
    width: 28%;
    padding: 45px 35px;
    & > p,
    h5 {
      color: #fff;
      font-weight: 600;
    }
  }
  .lgnText {
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div,
    & > button,
    & > p {
      margin-top: 20px;
    }
  }
  .btnLogin {
    text-transform: none;
    background: #fb641b;
    color: #fff;
    height: 48px;
    border-radius: 2px;
  }
  .text {
    font-size: 12px;
    color: #878787;
  }
  .createAcc {
    font-size: 14px;
    text-align: center;
    color: #2874f0;
    font-weight: 500;
    cursor: pointer;
  }
`;

const initialSignup = {
  fName: "",
  lName: "",
  email: "",
  password: "",
};

const LoginDialog = ({ open, setOpen }) => {
  const [toggle, setToggle] = useState(true);
  const [data, setData] = useState(initialSignup);
  const [loginUser, { isLoading: isLoggingLoading }] = useLoginUserMutation();
  const [signupUser, { isLoading: isSignupLoading }] = useSignupUserMutation();

  const { setAccount } = useAppContext();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setToggle(true);
  };

  const handleChange = e => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLoginChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const { user } = await signupUser(data).unwrap();
      dispatch(setUser(user));
      toast.success("Signup successful");
      setOpen(false);
      setAccount(data?.fName);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleLogin = async () => {
    try {
      const { user } = await loginUser(data).unwrap();
      dispatch(setUser(user));
      toast.success("Login successful");
      setOpen(false);
      setAccount(user?.fName);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Component>
        <Box className='imgLogin'>
          <Typography variant='h5'>{`${
            toggle ? "Login" : "Looks like you're new here!"
          }`}</Typography>
          <Typography>
            {`${
              toggle
                ? "Get access to your Orders, Wishlist and Recommendations"
                : "Sign up with your mobile number to get started"
            }`}
          </Typography>
        </Box>
        {toggle ? (
          <Box className='lgnText' onChange={handleLoginChange}>
            <TextField
              variant='standard'
              name='email'
              required
              label='Enter Email/Mobile number'
            />
            <TextField
              variant='standard'
              name='password'
              type='password'
              required
              label='Enter Password'
            />
            <Typography className='text'>
              By continuing, you agree to Flipkart&apos;s Terms of Use and
              Privacy Policy.
            </Typography>
            <Button
              className='btnLogin'
              disabled={isLoggingLoading}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <Typography className='createAcc' onClick={() => setToggle(false)}>
              New to Flipkart? Create an account
            </Typography>
          </Box>
        ) : (
          <Box className='lgnText' onChange={handleChange}>
            <TextField
              variant='standard'
              name='fName'
              required
              label='Enter First name'
            />
            <TextField
              variant='standard'
              name='lName'
              label='Enter Last name'
            />
            <TextField
              variant='standard'
              name='email'
              label='Enter Email'
              required
            />
            <TextField
              variant='standard'
              name='password'
              type='password'
              label='Enter Password'
              required
            />

            <Button
              className='btnLogin'
              disabled={isSignupLoading}
              onClick={handleSignUp}
            >
              Continue
            </Button>
            <Typography style={{ textAlign: "center" }}>OR</Typography>
            <Typography className='createAcc' onClick={() => setToggle(true)}>
              Existing User? Log in
            </Typography>
          </Box>
        )}
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
