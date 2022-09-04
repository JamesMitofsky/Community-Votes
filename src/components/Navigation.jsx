import { AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink
          style={{
            textDecoration: "none",
            color: "unset",
            display: "flex",
            alignItems: "center",
          }}
          to="/"
        >
          <HowToVoteIcon />
          <Typography sx={{ marginLeft: 1, fontSize: 25 }}>
            Community Votes
          </Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
