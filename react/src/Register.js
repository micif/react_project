import * as React from 'react';
import { useNavigate } from "react-router-dom"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState, createContext, useContext } from "react";
import UserContext from './UserContext';
import axios from 'axios';
import { useEffect } from "react"
import Alert from '@mui/material/Alert';
import { Grid } from '@mui/material';
import RegisterIcon from '@mui/icons-material/AppRegistration';
import Fab from '@mui/material/Fab';
import { CalendarIcon } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';


const Register = () => {

  const [userArray, setUserArray] = useState(["", "", "", "", ""])
  const [color, setColor] = useState(["", "", "", "", ""])
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);

  const { user, setUser } = useContext(UserContext);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const register = () => {

    const newcolor = color.map((value, index) => {
      if (userArray[index] === "") {
        value = "error"
      }
      return value
    })
    setColor([...newcolor])
    var count = 0
    userArray.forEach((value) => {
      value != "" ? count++ : count--
    })
    if (count === 5) {
      const user1 = { userId: userArray[4], name: userArray[0], password: userArray[1], phone: userArray[2], email: userArray[3] }
      setUser({ ...user1 })
    }
  }
  useEffect(() => {
    if (user.userId !== undefined) {
      try {
        axios.post('http://localhost:5102/User/Register',user)
          .then((response) => {
            if (response.data.statusCode === 200) {
              setAlert(true)
              const stringObj = JSON.stringify(user); 
              localStorage.setItem("user",stringObj)
              navigate("../calendar", { replace: false });
            }
            else {
              setAlert(true)
              //alert(response.data.value.message)
            }
          })
      }
      catch (error) {
        console.log("error");
      }
    }

  }, [user])


  const handleOnChange = (value, send) => {
    switch (send) {
      case "userId":
        userArray[4] = value;
        setUserArray([...userArray])
        break;
      case "name":
        userArray[0] = value;
        setUserArray([...userArray])
        break;
      case "password":
        userArray[3] = value;
        setUserArray([...userArray])
        break;
      case "phone":
        userArray[2] = value;
        setUserArray([...userArray])
        break;
      case "email":
        userArray[1] = value;
        setUserArray([...userArray])
        break;
    }

    const newcolor = color.map((value, index) => {
      if (userArray[index] !== "") {
        value = ""
      }
      return value
    })
    setColor([...newcolor])
  }

  return (<>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
  <CalendarIcon
    sx={{
      display: { xs: 'none', md: 'flex' },
      mr: 1,
    }}
  />
  <Typography
    variant="h5"
    noWrap
    component="a"
    sx={{
      mr: 2,
      display: { xs: 'none', md: 'flex' },
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
    }}
  >
    CALENDAR
  </Typography>
</Box>
<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  //style={{ minHeight: '100vh' }}
  marginTop={10}
>
<Fab color="primary" aria-label="add" size="2" minHeight="2">
            
            {/* <PlusIcon/> */} 
            <RegisterIcon/>
          </Fab>
    <Stack
      component="form"
      sx={{
        width: '40ch',

      }}
            spacing={2}
      noValidate
      autoComplete="off"
      marginTop={2}

    >
      {
        color[4] === "error" ? <TextField 
          id="outlined-required"
          label="User name"
          color={color[4]}
          sx={{
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: "#CF1E1E", // Change this to the desired color
            },
          }}
          onChange={(e) => handleOnChange(e.target.value, "userId")}
        /> :
          <TextField
            
            id="outlined-required"
            label="User name"
            color={color[4]}
            onChange={(e) => handleOnChange(e.target.value, "userId")}
          />}
      {
        color[0] === "error" ? <TextField
          id="outlined-required"
          label="Name"
          color={color[0]}
          style={{ borderBlockColor: register }}
          sx={{
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: "#CF1E1E", // Change this to the desired color
            },
          }}
          onChange={(e) => handleOnChange(e.target.value, "name")}
        /> :
          <TextField
            id="outlined-required"
            label="Name"
            color={color[0]}
            onChange={(e) => handleOnChange(e.target.value, "name")}
          />}
      {color[1] === "error" ? <TextField
        id="outlined-required"
        label="Email"
        color={color[1]}
        sx={{
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: "#CF1E1E", // Change this to the desired color
          },
        }}
        onChange={(e) => handleOnChange(e.target.value, "email")}
      /> :
        <TextField
          id="outlined-required"
          label="Email"
          color={color[1]}
          onChange={(e) => handleOnChange(e.target.value, "email")}
        />}
      {color[2] === "error" ? <TextField
        
        id="outlined-required"
        label="Phone"
        color={color[2]}
        sx={{
          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: "#CF1E1E", // Change this to the desired color
          },
        }}
        onChange={(e) => handleOnChange(e.target.value, "phone")}
      /> :
        <TextField
          id="outlined-required"
          label="Phone"
          color={color[2]}
          variant="outlined"
          onChange={(e) => handleOnChange(e.target.value, "phone")}
        />}
      {color[3] === "error" ?
        <FormControl      sx={{ m: 0, width: '40ch' ,'& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: "#CF1E1E", // Change this to the desired color
        }}} variant="outlined"  >
          <InputLabel htmlFor="outlined-adornment-password" color={color[3]}>Password</InputLabel>
          <OutlinedInput
            color={color[3]}
            id="outlined-adornment-password-required"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment     position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => handleOnChange(e.target.value, "password")}

          />
        </FormControl> : <FormControl sx={{ m: 0, width: '40ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" color={color[3]}>Password</InputLabel>
          <OutlinedInput
            color={color[3]}
            id="outlined-adornment-password-required"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            onChange={(e) => handleOnChange(e.target.value, "password")}

          />
        </FormControl>}
        {alert && <Alert severity="error">User already exists</Alert>}

      <Button size="large" 
       variant="contained" onClick={() => register()} >register</Button>
    </Stack>
    </Grid>
  </>

  )
}
export default Register