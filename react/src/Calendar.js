import moment from "moment/moment"
import { useContext, useState } from "react"
import Day from "./Day";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";
import Event from "./Event";
import { useEffect } from "react"
import ResponsiveAppBar from "./NavBar"
import { Outlet } from "react-router-dom"
import { Card } from "@mui/material"
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import useAxios from 'axios-hooks'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Calendar = () => {
    const today = moment()
    const [firstDay, setFirstDay] = useState(today.startOf('week'))
    //const [event, setEvent] = useState(false)
    // const { user } = useContext(UserContext)
   // const navigate = useNavigate()
    const userObj = localStorage.getItem("user")
    const [showAlert, setShowAlert] = useState(false);

    const user = JSON.parse(userObj);

    const [{ data, loading, error }, refetch] = useAxios(
        `http://localhost:5102/Event/${user.userId}`

    )
    const arrayDay = [0, 1, 2, 3, 4, 5, 6]

    const lastWeek = () => {
        const newdate = moment(firstDay).add(-7, 'd')
        setFirstDay(moment(newdate));
    }
    const nextWeek = () => {
        const newdate = moment(firstDay).add(7, 'd')
        setFirstDay(moment(newdate));
    }
    const toDay = () => {
        const today = moment()
        setFirstDay(moment(today.startOf('week')));
    }
    // const addEvent = () => {
    //     setEvent(true)
    // }

    // const search = () => {
    //     navigate("../search", { replace: false })
    // }
    // useEffect(() => {
    //     setEvent(false)

    // }, [event])
    // const ADD = () => {
    //     navigate(`../EventRout/${{}}`, { replace: false })
    // }
    return (
        <>
            {/* <button  onClick={() => ADD()}>ADD EVENT</button> */}
            {loading ? <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box> : <>
                <ResponsiveAppBar setShowAlert={setShowAlert} nextWeek={nextWeek} lastWeek={lastWeek} toDay={toDay} refetch={refetch} user={user} />
                <Outlet />
                <br></br>
                <br></br>
                <br></br>
                <Snackbar open={showAlert} autoHideDuration={3000} onClose={() => setShowAlert(false)}>
                    <MuiAlert onClose={() => setShowAlert(false)} severity="success">
                        Added successfully !
                    </MuiAlert>
                </Snackbar>
                {/* {showAlert && <Alert severity="success">This is a success Alert.</Alert>} */}

                <Grid container spacing={2} >

                    {arrayDay.map((item, k) => {
                        return (
                            <Grid key={item} xs={1.7}>
                                <Day key={item}
                                    date={moment(firstDay).add(item, 'd').format('DD/MM/yyyy')}
                                    day={moment(firstDay).add(item, 'd').format('dddd')}
                                    fToDay={toDay} d={"hhg"}
                                    refetch={refetch}
                                    setShowAlert={setShowAlert}
                                    dat={moment(firstDay).add(item, 'd')}
                                    events={data.value.filter((value) =>
                                        moment(value.startDate).utc().format('DD/MM/yyyy') === moment(firstDay).add(item, 'd').format('DD/MM/yyyy'))
                                    } />
                            </Grid>
                        )

                    })}
                </Grid></>}
        </>
    )
}

export default Calendar;


