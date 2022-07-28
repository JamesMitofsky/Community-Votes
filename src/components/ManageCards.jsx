import { Grid } from "@mui/material";
import ManageCard from "./ManageCard.jsx";

export default function ManageCards({ categories }) {
  let builtCards = categories.map((category) => {
    return <ManageCard category={category} />;
  });

  return (
    <Grid component="form" container rowSpacing={16} xs={12}>
      {builtCards}
    </Grid>
  );
}
