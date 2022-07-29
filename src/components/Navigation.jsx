import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h1" component="div">
          HOA Votes
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
