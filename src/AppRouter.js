import React, { useState } from "react";
import { HashRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import Favorites from "pages/Favorites"

const AppRouter = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider darkMode={darkMode}>
      <Router>
        <NavBar onToggleTheme={handleToggleTheme} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
