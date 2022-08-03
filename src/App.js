import AdminView from "./views/AdminView.jsx";
import VoterView from "./views/VoterView.jsx";
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
        <Navigation />
        <Container sx={{ marginTop: 5 }} maxWidth="md">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<VoterView />}></Route>
              <Route path="/admin" element={<AdminView />}></Route>
              <Route path="*" element={<UnknownAddress />}></Route>
              <Route path="/buildURL" element={<UrlBuilder />}></Route>
            </Routes>
          </BrowserRouter>
        </Container>
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
