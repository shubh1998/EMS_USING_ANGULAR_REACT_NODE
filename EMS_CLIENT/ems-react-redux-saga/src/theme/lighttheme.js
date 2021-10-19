import { createTheme } from '@material-ui/core/styles'

const lighttheme = createTheme({
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif `,
  },
  colors: {
    red: "#FF0000",
  },
  palette: {
    type: "light",
  },
});

export default lighttheme;