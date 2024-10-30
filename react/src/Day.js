import { useContext, useEffect } from "react";
import ContextMenu from "./ContextMenu";
import UserContext from "./UserContext";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card } from "@mui/material"
import ListEvent from "./ListEvent";
import Fab from '@mui/material/Fab';
import Event from "./Event";
import React from "react";
import moment from "moment/moment"
const Day = (props) => {
  const { user } = useContext(UserContext)
  const [addEvent, setAddEvent] = React.useState(false);
  let borderStyle;
  {
    if (props.date == moment().format('DD/MM/yyyy')) {
      borderStyle = "3px solid #1976D2"
    }
  }
  const componentToSetMenu = () =>
    <Card sx={{ border: borderStyle, marginLeft: 3, borderWidth: 1, minWidth: 100, maxHeight: 50, minHeight: 790, boxShadow: 4, maxWidth: 250, position: "relative" }}>
      <CardContent >

        <Typography sx={{ fontSize: 20 }} color="ButtonText" gutterBottom>
          {props.day === "Saturday" ? "Sabath 🕯🕯" : props.day}
        </Typography>
        <Typography variant="body2">
          {props.date}
          <br />
          <br />
          <br />
        </Typography>
        <Typography variant="body2">
          <ListEvent setShowAlert={props.setShowAlert} list={props.events.sort()} refetch={props.refetch} />
        </Typography>
      </CardContent>
      <Typography variant="body2" sx={{
        position: "absolute",
        bottom: 20,
        right: 20
      }}>
        <Fab color="primary" aria-label="add" size="2" minHeight="2">

          <Event type="AddIcon" Button={true} dat={props.dat} refetch={props.refetch} event={{}} setShowAlert={props.setShowAlert} />
        </Fab>
      </Typography>

    </Card>

  return (<>

    <ContextMenu setShowAlert={props.setShowAlert} contextComponent={componentToSetMenu} fToDay={props.fToDay} refetch={props.refetch} d={props.dat} ty></ContextMenu >
  </>
  )
}
export default Day
