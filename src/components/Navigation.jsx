import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
          HOA Votes
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
