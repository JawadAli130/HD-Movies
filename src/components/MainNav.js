// simply sara code material ui sa uthaya h bottom navigation. jo jo icons chahiye wo khud la lo material ui icons sa.
// navigation bar ko styling k liye simply phly sa diye huy code me changing kr di Hain
// navigation k andr sab tab ko index diye hoty hain 0,1,2,3...
// values is liye use ki hain 0,1,2 jab change ho to un ki value sa hi pata chaly ga kis tab p ho is time
// push method me jo route diya h wo App.js me Route tag me define hoty hain
// [history] na b do gay to kam chaly ga ye bs warning ko khatam krny k liye likha h 

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    width:'100%',
    position:'fixed',
    bottom:0,
    zIndex:100,
    backgroundColor:'#2d313a'
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(()=>{
    if(value===0){history.push('/')}
    else if (value===1){history.push('/movies')}
    else if (value===2){history.push('/series')}
    else if (value===3){history.push('/search')}
  },[value,history]);

  return (
    <BottomNavigation value={value} onChange={(event, newValue) => {setValue(newValue);}} showLabels className={classes.root}>
      <BottomNavigationAction style={{color:'white'}} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction style={{color:'white'}} label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction style={{color:'white'}} label="TV Series" icon={<TvIcon />} />
      <BottomNavigationAction style={{color:'white'}} label="Search" icon={<SearchIcon/>} />
    </BottomNavigation>
  );
}