import AdminView from "./views/AdminView.jsx";
import VoterView from "./views/VoterView.jsx";
import ResultsView from "./views/ResultsView.jsx";
import LandingPage from "./views/LandingPage.jsx";
import UnknownAddress from "./views/UnknownAddress.jsx";
import Navigation from "./components/Navigation.jsx";
import UrlBuilder from "./views/UrlBuilder.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Container, Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navigation />
            <Container
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
              }}
              maxWidth="md"
            >
              <Routes>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/voter" element={<VoterView />}></Route>
                <Route path="/results" element={<ResultsView />}></Route>
                <Route path="/admin" element={<AdminView />}></Route>
                <Route path="/buildURL" element={<UrlBuilder />}></Route>
                <Route path="*" element={<UnknownAddress />}></Route>
              </Routes>
            </Container>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

const theme = createTheme({
  typography: {
    headers: {},
    fontSize: 14,
    h1: { fontSize: 35, fontWeight: 500 },
    h2: { fontSize: 25, marginTop: 10, marginBottom: 10, fontWeight: 500 },
    h3: { fontSize: 20, marginTop: 10, marginBottom: 0 },
  },
  palette: {
    primary: {
      main: "#468BB2",
      dark: "#075b8a",
    },
    secondary: {
      main: "#F9F0A7",
    },
  },
});
