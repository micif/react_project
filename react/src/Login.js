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
import { useState, useContext, useEffect } from "react";
import UserContext from './UserContext';
import axios from 'axios';
import { Grid } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Fab from '@mui/material/Fab';
import { CalendarIcon } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';


const Login = (props) => {
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [color, setColor] = useState(["", ""])
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [user1, setUser1] = useState({})
    const { user, setUser } = useContext(UserContext);
    const [alert, setAlert] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const login = () => {

        let newcolor = ["", ""]
        if (userId === "") newcolor[0] = "error"
        if (password === "") newcolor[1] = "error"
        setColor([...newcolor])
        const user1 = {
            userId: userId,
            password: password
        }
        if (userId != "" && password != "") {
            setUser1({ ...user1 })
        }
    }

    useEffect(() => {
        if (user1.userId !== undefined) {
            try {
                axios.post('http://localhost:5102/User/Login', user1)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            const User = {
                                userId: userId, name:
                                    response.data.value.name,
                                password: password,
                                phone: response.data.value.phone,
                                email: response.data.value.email
                            }
                            setUser({ ...User })
                            const stringObj = JSON.stringify(User);
                            localStorage.setItem("user", stringObj)
                            navigate("../calendar", { replace: false });
                        }
                        else
                            setAlert(true)
                    })
            }
            catch (error) {
                console.log("error");
            }
        }

    }, [user1])







    const handleOnChange = (value, send) => {
        switch (send) {
            case "userId":
                setUserId(value)
                break;
            case "password":
                setPassword(value)
                break;
        }

        let newcolor = ["", ""]
        if (userId !== "") newcolor[0] = ""
        if (password !== "") newcolor[1] = ""
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
            // style={{ minHeight: '100vh' }}
            marginTop={20}
        >
            <Fab color="primary" aria-label="add" size="2" minHeight="2 " >

                {/* <PlusIcon/> */}
                <LoginIcon />
            </Fab>
            <Stack
                component="form"
                sx={{
                    width: '40ch',
                    //alignItems:"center"

                }}
                spacing={2}
                noValidate
                autoComplete="off"
                marginTop={2}
            >


                {color[0] === "error" ? <TextField
                    id="outlined-required"
                    label="User name"
                    color={color[0]}
                    sx={{
                        width: '40ch',
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            borderColor: "#CF1E1E", // Change this to the desired color
                        },
                    }}
                    onChange={(e) => handleOnChange(e.target.value, "userId")}
                /> :
                    <TextField sx={{ width: '40ch' }}
                        id="outlined-required"
                        label="User name"
                        color={color[0]}
                        onChange={(e) => handleOnChange(e.target.value, "userId")}
                    />}

                {color[1] === "error" ?
                    <FormControl helperText="Required field." sx={{
                        m: 0, width: '40ch', '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            borderColor: "#CF1E1E", // Change this to the desired color
                        }
                    }} variant="outlined"  >
                        <InputLabel htmlFor="outlined-adornment-password" color={color[1]}>Password</InputLabel>
                        <OutlinedInput
                            color={color[1]}
                            id="outlined-adornment-password-required"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment helperText="Required field." position="end">
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
                        <InputLabel htmlFor="outlined-adornment-password" color={color[1]}>Password</InputLabel>
                        <OutlinedInput
                            color={color[1]}
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

                {alert && <Alert severity="error">Username or password incorrect</Alert>}

                <Button size="large" variant="contained" onClick={() => login()} >login</Button>

            </Stack>
            <Button onClick={() => navigate("../register", { replace: false })} sx={{
                width: '20ch',
                margin: 2
            }} variant="text">new account</Button>
        </Grid>
    </>
    )
}
export default Login