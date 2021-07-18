import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router";
import Switch from '@material-ui/core/Switch';
import { FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";

const NavBar = ({ onToggleTheme }) => {
  const [value, setValue] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const history = useHistory();

  const pageIndex = {
    home: 0,
    favorites: 1,
  };

  const pageRoutes = {
    home: '/',
    favorites: '/favorites',
  };

  useEffect(() => {
    const route = value === pageIndex.home
    ? pageRoutes.home
    : pageRoutes.favorites;

    history.push(route);
  }, [value]);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  const onToggleDarkMode = () => {
    onToggleTheme(!darkMode);
    setDarkMode(!darkMode);
  };
  
  const appBarStyle = {
    position: "fixed",
    top: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  return (
    <AppBar position="static" color="transparent" style={appBarStyle}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor={darkMode ? "primary" : "secondary"}
        // textColor="primary"
      >
        <Tab label="Home" index={0} />
        <Tab label="Favorites" index={1} />
      </Tabs>
      <FormGroup>
        <FormControlLabel control={
          <Switch
            checked={darkMode}
            onChange={onToggleDarkMode}
            name="checkDarkMode"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          }
          label="Dark Mode"
          style={{margin:"auto 20px"}}
        />  
      </FormGroup>
    </AppBar>
  );
};

export default NavBar;
