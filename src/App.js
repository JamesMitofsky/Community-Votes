import ManageCards from "./components/ManageCards.jsx";
import Navigation from "./components/Navigation.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import { Box, Container } from "@mui/material";

export default function App() {
  const categories = ["Votables", "Candidates", "Voters"];

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <Navigation />
        </Box>
        <Container>
          <ManageCards categories={categories} />
        </Container>
      </ThemeProvider>
    </div>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#468BB2",
    },
    secondary: {
      main: "#F9F0A7",
    },
  },
  typography: {
    fontSize: 8,
    h1: { fontSize: 35 },
    h2: { fontSize: 25 },
  },
});
