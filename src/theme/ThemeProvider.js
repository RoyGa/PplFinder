import React from "react";
import { createMuiTheme, ThemeProvider as Provider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const ThemeProvider = ({ children, darkMode }) => {
  const palletType = darkMode ? "dark" : "light";
  const backgroundColor = darkMode ? "#303030" : "#FAFAFA";
  const color = darkMode ? "#84ffff" : "#757575"; 

  const overrides = {
    MuiTab: {
      root: {
        backgroundColor,
      },
    },
    MuiCheckbox: {
      colorPrimary: {
        color,
        '&$checked': {
          color,
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar-track': {
          backgroundColor,
        },
        '*::-webkit-scrollbar-thumb': {
          background: color,
          backgroundClip: "padding-box",
          border: "7px solid transparent",
        },     
      }
    }
  };

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        overrides,
        palette: {
          type: palletType,
          primary: {
            main: "#84ffff",
          },
          secondary: {
            main: "#757575",
          },
          error: {
            main: "#f06292",
          },
        },
      }),
    [palletType]
  );

  return (
    <Provider theme={theme}>
      <CssBaseline />
      {children}
    </Provider>
  );
};

export default ThemeProvider;
