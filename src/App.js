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
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box>
          <Navigation />
          <Container
            className={`${transitionStage}`}
            onAnimationEnd={() => {
              if (transitionStage === "fadeOut") {
                setTransistionStage("fadeIn");
                setDisplayLocation(location);
              }
            }}
            minheight="100vh"
            maxWidth="md"
            component="div"
            sx={{
              marginTop: 2,
              marginBottom: 4,
              display: "flex",
              flexdirection: "column",
              flexGrow: 1,
            }}
          >
            <Routes location={displayLocation}>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/voter" element={<VoterView />}></Route>
              <Route path="/results" element={<ResultsView />}></Route>
              <Route path="/admin" element={<AdminView />}></Route>
              <Route path="/buildURL" element={<UrlBuilder />}></Route>
              <Route path="*" element={<UnknownAddress />}></Route>
            </Routes>
          </Container>
        </Box>
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
