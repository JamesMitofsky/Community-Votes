import { Grid, Button, Typography } from "@mui/material";
import FormControlledInputs from "./FormControlledInputs.jsx";
import SaveIcon from "@mui/icons-material/Save";

export default function ManageCards({ categories }) {
  function handleSubmit() {
    alert("we've logged your vote!");
  }

  let builtCards = categories.map((category) => {
    return <FormControlledInputs category={category} />;
  });

  return (
    <Grid
      component="form"
      container
      rowSpacing={5}
      sx={12}
      style={{ display: "flex" }}
    >
      <Grid item xs={12}>
        <Typography item variant="h2">
          Create a votable!
        </Typography>
      </Grid>
      {builtCards}
      <Grid item xs={12}>
        <Button
          onClick={handleSubmit}
          fullWidth
          item
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save this votable
        </Button>
      </Grid>
    </Grid>
  );
}
