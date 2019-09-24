import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const classes = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};

const avatars = [
    `/static/images/avatar/1.jpg`,
    `/static/images/avatar/2.jpg`,
    `/static/images/avatar/3.jpg`,
    `/static/images/avatar/4.jpg`,
    `/static/images/avatar/5.jpg`,
    `/static/images/avatar/6.jpg`,
    `/static/images/avatar/7.jpg`,
    `/static/images/avatar/8.jpg`,
    `/static/images/avatar/9.jpg`,
    `/static/images/avatar/10.jpg`,
];

export default function TitlebarGridList(selectAvatarImage, closeModal) {
  return (
    <div style={classes.root}>
      <GridList cellHeight={25} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Avatars</ListSubheader>
        </GridListTile>
        {avatars.map(avatar => (
          <GridListTile style={{ height: '110px' }} key={avatar} onClick={e=>{
              console.log(avatar);
              selectAvatarImage(avatar);
              closeModal();
            }}>
            <img src={avatar} />
            {/* <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            /> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}