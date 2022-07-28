import { Grid, Typography, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function ManageCard({ category }) {
  return (
    <Grid item>
      <Typography variant="h2">{category}</Typography>

      <TextField label="Outlined" focused />

      <Button startIcon={<AddIcon />} variant="contained">
        Add {category}
      </Button>
    </Grid>
  );
}
