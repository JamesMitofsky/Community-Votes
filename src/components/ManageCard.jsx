import { Grid, TextField } from "@mui/material";

export default function ManageCard({ category }) {
  const thingLabel = `What is this ${category} called?`;
  const personLabel = `Who are the ${category}s?`;

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        label={category === "votable" ? thingLabel : personLabel}
      />
    </Grid>
  );
}
