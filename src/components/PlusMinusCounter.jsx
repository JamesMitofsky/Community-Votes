import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function PlusMinusCounter({ candidate, updateVotes }) {
  return (
    <>
      <AddCircleOutlineIcon onClick={() => updateVotes(candidate.id, true)} />
      <RemoveCircleOutlineIcon
        onClick={() => updateVotes(candidate.id, false)}
      />
    </>
  );
}
