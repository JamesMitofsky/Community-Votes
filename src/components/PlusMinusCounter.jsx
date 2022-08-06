import { Button } from "@mui/material";

export default function PlusMinusCounter({ candidate, updateVotes }) {
  //   handleCount(id, counter);
  return (
    <>
      {candidate.votes}
      <Button onClick={() => updateVotes(candidate.id, false)}>
        Plus button
      </Button>
    </>
  );
}
