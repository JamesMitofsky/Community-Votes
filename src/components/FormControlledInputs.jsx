import { FormControl, TextField, Grid } from "@mui/material";

export default function FormControlledInputs({ category }) {
  const helperText =
    category !== "Votable" ? `Separate ${category} with commas` : null;
  return (
    <Grid item xs={12}>
      <FormControl fullWidth>
        <TextField
          fullWidth
          helperText={helperText}
          label={category}
        ></TextField>
      </FormControl>
    </Grid>
  );
}
