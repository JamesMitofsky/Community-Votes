import { Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import OutboxIcon from "@mui/icons-material/Outbox";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Helmet } from "react-helmet";

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Typography variant="h1">Home</Typography>
      <Typography variant="subtitle1">
        Welcome to HOA Votes! Here's a quick explanation of how this app works:
      </Typography>
      <Grid container alignItems="center">
        <CreateIcon />
        <Typography variant="h2" sx={{mt: 2.3, ml: 1}}>
          Create
        </Typography>
      </Grid>
      <Typography variant="body1">
        Create a votable by filling out the form found on the{" "}
        <Link to="/admin">Admin page</Link>.
      </Typography>
      <Grid container alignItems="center">
        <OutboxIcon />
        <Typography variant="h2" sx={{mt: 2.3, ml: 1}}>
          Publish
        </Typography>
      </Grid>
      <Typography variant="body1">
        Votables are automatically published when you create them from the
        Admin page.
      </Typography>
      <Grid container alignItems="center">
        <HowToVoteIcon />
        <Typography variant="h2" sx={{mt: 2.3, ml: 1}}>
          Vote
        </Typography>
      </Grid>
      <Typography variant="body1">
        After publishing a votable, voters will receive an email shortly from
        the app. This email will include a link which is unique to them, letting
        them cast their allotted votes on the{" "}
        <Link to="/voter">voter page</Link>.
      </Typography>
      <Grid container alignItems="center">
        <NotificationsActiveIcon />
        <Typography variant="h2" sx={{mt: 2.3, ml: 1}}>
          Tally
        </Typography>
      </Grid>
      <Typography variant="body1">
        All votes will be tallied at the end of the voting period. These results
        will be tallied up on the <Link to="/results">results page</Link>.
      </Typography>
    </>
  );
}
