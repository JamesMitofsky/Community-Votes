import { AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink style={{ textDecoration: "none", color: "unset" }} to="/">
          <Typography variant="h1">HOA Votes</Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
