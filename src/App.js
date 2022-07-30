import AdminView from "./views/AdminView.jsx";
import Navigation from "./components/Navigation.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box styles={{ flexGrow: 1 }}>
          <Navigation />
        </Box>
        <AdminView />
      </ThemeProvider>
    </div>
  );
}

const theme = createTheme({
  typography: {
    fontSize: 14,
    h1: { fontSize: 35 },
    h2: { fontSize: 25 },
    h3: { fontSize: 20 },
  },
  palette: {
    primary: {
      main: "#468BB2",
    },
    secondary: {
      main: "#F9F0A7",
    },
  },
});
