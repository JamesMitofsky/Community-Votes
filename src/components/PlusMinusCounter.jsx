import { Button } from "@mui/material";

export default function PlusMinusCounter({ candidate, updateVotes }) {
  return (
    <>
      <Button onClick={() => updateVotes(candidate.id, true)}>+</Button>
      <Button onClick={() => updateVotes(candidate.id, false)}>-</Button>
    </>
  );
}
