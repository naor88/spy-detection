import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import {indigo500} from 'material-ui/styles/colors';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// menuButton: {
//     marginRight: theme.spacing(2),
//   },

const styles = {
    root: {
        flexGrow: 1,
      },
      toolbarStyle: {
          backgroundColor: '#455A64'
      },
      title: {
        flexGrow: 1,
      },
}
  
export default function AppHeader() {
    return (
      <div className={styles.root}>
        <AppBar position="static" style={styles.toolbarStyle}>
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Avatar src={`/static/images/avatar/spy.png`} />
            <Typography variant="h6" style={styles.title}>
            <p style={{textAlign:"center", margin:0}}>Spy Detection</p>
            </Typography>
            <Avatar src={`/static/images/avatar/detective.png`} />
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </div>
    );
}