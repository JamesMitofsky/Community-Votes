import { Helmet } from "react-helmet-async";
import { Typography, Grid, Link } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <Typography variant="h1">FAQ</Typography>
      <Typography variant="subtitle1">
        Welcome to HOA Votes! Here's a quick explanation of how this app works:
      </Typography>
      <Grid container alignItems="center">
        <CreateIcon />
        <Typography variant="h2" sx={{ ml: 1 }}>
          Create
        </Typography>
      </Grid>
      <Typography variant="body1">
        Create a votable by filling out the form found on the{" "}
        <Link to="/admin">Admin page</Link>.
      </Typography>
      <Grid container alignItems="center">
        <HowToVoteIcon />
        <Typography variant="h2" sx={{ ml: 1 }}>
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
        <Typography variant="h2" sx={{ ml: 1 }}>
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
