import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const classes = {
  root: {
    width: '100%',
    maxWidth: 360,
    margin:0
    // backgroundColor: theme.palette.background.paper,
  },
};


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


export default function CheckboxListSecondary(players) {
//   const [checked, setChecked] = React.useState([1]);

//   const handleToggle = value => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

  return (
    <List dense className={classes.root}>
      {players.map((player, idx) => {
        const labelId = `checkbox-list-secondary-label-${player.id}`;
        return (
          <ListItem key={player.id} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${idx + 1}`}
                src={ player.avatar ? player.avatar : `/static/images/avatar/1.jpg`} //{`logo192.png`}//
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={(player.name ? player.name : `Anonymous${player.id}`) + (player.admin ? ` (Admin)` : '')} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                // onChange={handleToggle(value)}
                // checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}