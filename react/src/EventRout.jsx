import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Stack from '@mui/material/Stack';
import { useContext, useState, useEffect } from "react"
import moment from "moment";
const EventRout=(props)=>{
    const events={}
    const [eventId, setEventId] = React.useState(events.eventId)
    const [open, setOpen] = React.useState(!props.Button);
    const [title, setTitel] = React.useState(events.title)
    const [selectDate, setDate] = React.useState(moment(events.date))
    const [SelectTime, setTime] = React.useState(moment(events.time))
    const [description, setDescription] = React.useState(events.description)
    const [event, setEvent] = useState({})
    const handleDateChange = (date) => {
        setDate(date);
    };
    const handleTimeChange = (time) => {
        setTime(time);
    };

   

return(
    <>  <Stack
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
            value={selectDate} onChange={handleDateChange}
            id="standard-basic"
            label=""
            fullWidth
            sx={{ mb: 1, width: 320 }}
        //onChange={(e) => { setDate(e.target.value) }}
        />
        <TimePicker
            value={SelectTime} onChange={handleTimeChange}
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
</>
)
}
export default EventRout;