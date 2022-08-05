import AdminView from "./views/AdminView.jsx";
import VoterView from "./views/VoterView.jsx";
import LandingPage from "./views/LandingPage.jsx";
import UnknownAddress from "./views/UnknownAddress.jsx";
import Navigation from "./components/Navigation.jsx";
import UrlBuilder from "./views/UrlBuilder.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navigation />
          <Container sx={{ marginTop: 2 }} maxWidth="md">
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/voter" element={<VoterView />}></Route>
              <Route path="/admin" element={<AdminView />}></Route>
              <Route path="*" element={<UnknownAddress />}></Route>
              <Route path="/buildURL" element={<UrlBuilder />}></Route>
            </Routes>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

const theme = createTheme({
  typography: {
    fontSize: 14,
    h1: { fontSize: 35 },
    h2: { fontSize: 25, marginTop: 30 },
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
