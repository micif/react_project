import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';

const Event = (props) => {
    const [eventId, setEventId] = useState(props.event.eventId)
    const [open, setOpen] = useState(!props.Button);
    const [title, setTitel] = useState(props.event.title)
    const [selectDate, setDate] = useState(props.dat)
    const [SelectTime, setTime] = useState(moment(props.event.time))
    const [description, setDescription] = useState(props.event.description)
    const [event, setEvent] = useState({})
    const userObj = localStorage.getItem("user")
    const user = JSON.parse(userObj);


    const add = () => {
        let id
        if (eventId) {
            id = eventId;
        }
        else {
            id = uuidv4();
        }

        const event = {
            eventId: id,
            userId: user.userId,
            title: title,
            description: description,
            startDate: moment(selectDate).add(1, 'd'),
            time: SelectTime
        }
        console.log(SelectTime)
        console.log("date " + moment(selectDate).format())
        setEvent({ ...event })
    }
    useEffect(() => {
        if (event.eventId !== undefined) {
            try {
                axios.post(`http://localhost:5102/Event`, event)
                    .then((response) => {
                        if (response.data.statusCode === 200) {
                            props.setShowAlert(true);
                            props.refetch()
                        }
                        else {
                            <Alert severity="success">This is a success Alert.</Alert>

                        }
                    })
            }
            catch (error) {
                console.log("error");
            }
        }

    }, [event])
   
    const handleDateChange = (date) => {
        setDate(date);
    };
    const handleTimeChange = (time) => {
        setTime(time);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (!props.type) {
            setTime(null)
            setDate(null)
        }
        setOpen(false)
        setDescription("")
        setTitel("")
    };

    return (
        <React.Fragment>
            {props.Button && props.type === "edit" ?
                <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton> : props.Button && props.type == "AddIcon" ? 
                <AddIcon onClick={handleClickOpen} /> :
                    props.Button ?
                        <Button variant="outlined" onClick={handleClickOpen} sx={{ color: 'white', backgroundColor: 'inherit' }}>
                            add Event</Button> : props.Button && props.type === "plus"}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                {props.type === "edit" && <DialogTitle>edit event</DialogTitle>}
                {props.type !== "edit" && <DialogTitle>add event</DialogTitle>}

                <DialogContent>
                    <Stack
                        component="form"
                        sx={{
                            width: '40ch',
                        }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <TextField
                                id="standard-basic"
                                label="" variant="standard"
                                placeholder="title"
                                value={title}
                                fullWidth
                                sx={{ mb: 1, width: 320 }}
                                onChange={(e) => { setTitel(e.target.value) }}
                            />
                            <DatePicker
                                value={selectDate}
                                onChange={handleDateChange}
                                id="standard-basic"
                                label=""
                                fullWidth
                                sx={{ mb: 1, width: 320 }}
                            //onChange={(e) => { setDate(e.target.value) }}
                            />
                            <TimePicker
                                value={SelectTime}
                                onChange={handleTimeChange}
                                label=""
                                fullWidth
                                sx={{ mb: 1, width: 320 }}
                            // onChange={(e) => { setTime(e.target.value) }}
                            />
                            <TextField
                                id="outlined-basic"
                                label=""
                                value={description}
                                variant="outlined"
                                placeholder="Description"
                                fullWidth sx={{ mb: 1, width: 320 }}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </LocalizationProvider>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!title || !selectDate || !SelectTime || !description} onClick={() => { add(); handleClose() }} color="primary">
                        {props.type === "edit" ? "Edit" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}
export default Event