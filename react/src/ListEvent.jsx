import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import axios from 'axios';
import Event from './Event';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { ClockIcon } from '@mui/x-date-pickers';

const ListEvent = (props) => {
  const [dense, setDense] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
    setMenuPosition({ top: event.pageY, left: event.pageX });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteEvent = (eventId) => {
    try {
      axios.delete(`http://localhost:5102/Event/${eventId}`)
        .then((response) => {
          if (response.data.statusCode === 200) {
            props.refetch();
          }
        });
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <div>
        <List dense={dense}>
          {props.list.map((value) => (
            <ListItem key={value} style={{ cursor: 'context-menu' }}>
              <ListItemText
                variant="body2"
                primary={`${value.title} `}
                secondary={moment(value.time).format("h:mma")}
                onClick={(event) => handleClick(event, value)}
              />
              <Event
                setShowAlert={props.setShowAlert}
                Button="true"
                type="edit"
                event={value}
                dat={moment(value.startDate).add(-1, 'd')}
                refetch={props.refetch}
                onClick={() => deleteEvent(value.eventId)}
              />
              <IconButton edge="end" aria-label="delete" onClick={() => deleteEvent(value.eventId)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
      <Box sx={{ width: '200px', height: '20px' }}>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={menuPosition}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
         
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              marginLeft: 1,
              right:5,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box margin={4}>
            <Typography variant="h5"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    width: 100,
                }}>
               {`${selectedItem.title} `}
           
          </Typography>
          <Typography gutterBottom >
            <ClockIcon fontSize='3'/>
            {`  ${moment(selectedItem.time).format("h:mma")}`}
            <br></br>
            {`  ${selectedItem.description}`}
          </Typography>
          </Box>

        </Menu>
      </Box>


    </>
  );
};

export default ListEvent;
