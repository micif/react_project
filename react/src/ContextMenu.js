
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Event from './Event';

export default function ContextMenu(props) {
  const [addEvent, setAddEvent] = React.useState(false);
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleOnClickEvent = () => {
    setAddEvent(true)
    handleClose();
    //<Event></Event>
  };

  const handleOnClickToday = () => {
    props.fToDay();
    handleClose();
  };

  const ContextComponent = props.contextComponent;

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      <ContextComponent />
      <Menu
        open={contextMenu !== null && !addEvent} // Only open the menu if addEvent is false
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleOnClickEvent}> Add Event </MenuItem>
        <MenuItem onClick={handleOnClickToday}>Go to today</MenuItem>
      </Menu>
      {addEvent && <Event setShowAlert={props.setShowAlert} Button={false} dat={props.d} refetch={props.refetch} event={{}}/>}
    </div>
  );
}
