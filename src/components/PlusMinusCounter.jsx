import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Stack, Box } from "@mui/material";

export default function PlusMinusCounter({ candidate, updateVotes }) {
  return (
    <Stack spacing={2} direction="row">
      <RemoveCircleOutlineIcon
        onClick={() => updateVotes(candidate.id, false)}
      />
      <Box>{candidate.votes}</Box>
      <AddCircleOutlineIcon onClick={() => updateVotes(candidate.id, true)} />
    </Stack>
  );
}
