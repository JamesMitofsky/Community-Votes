import { Typography, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NeighborhoodImage from "../assets/community.jpeg";

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>Community Votes</title>
      </Helmet>
      <Box sx={{ marginBottom: 4 }}>
        <Typography sx={{ fontWeight: "bold" }} variant="h1">
          Community Organization Made Easy
        </Typography>
        <Typography variant="h3">
          A free, anonymous, & secure solution for voting
        </Typography>
      </Box>
      <img src={NeighborhoodImage} alt="Painting of a neighborhood" />
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Grid>
          <Typography variant="h2">Am I the audience for this app?</Typography>
          <Typography variant="body1">
            Community Votes is for groups of any size which need anonymous
            voting, potentially with weighted votes, as is a common use case
            with Homeowners Associations in the United States.
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h2">Is the app really free?</Typography>
          <Typography variant="body1">
            Yes, it's 100% free, and it'll be that way forever. There are no
            ads, sold data, or fees.
          </Typography>
        </Grid>
        <Grid>
          <Typography variant="h2">How does Community Votes work?</Typography>
          <Typography variant="body1">
            Learn more about how it works by visiting our{" "}
            <Link to="/FAQ">FAQ page</Link>!
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
