import PlusMinusCounter from "../components/PlusMinusCounter.jsx";
import { Typography, List, ListItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function VoterForm({
  votableContent,
  candidates,
  voter,
  updateVotes,
  formState,
  castBallot,
}) {
  function shuffleArray(array) {
    const randomizedArray = array.map((el, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    });
    return randomizedArray;
    // for (let i = array.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [array[i], array[j]] = [array[j], array[i]];
    // }
  }

  const randomizedCandidates = shuffleArray(candidates);

  return (
    <>
      <Typography variant="h1" sx={{ borderBottom: 1 }}>
        {votableContent.name}
      </Typography>
      <Typography variant="h3" sx={{ color: "#808080" }}>
        Welcome to your ballot, {voter.name} 👋
      </Typography>
      <Typography variant="h3" fontWeight="bold" sx={{ mt: 6 }}>
        CANDIDATES
      </Typography>
      <List>
        {randomizedCandidates.map((candidate) => {
          return (
            <ListItem
              divider
              sx={{ justifyContent: "space-between" }}
              key={candidate.id}
            >
              <Typography variant="h3">{candidate.name}</Typography>
              <PlusMinusCounter
                candidate={candidate}
                updateVotes={updateVotes}
              />
            </ListItem>
          );
        })}
      </List>
      <Typography variant="subtitle" align="right">
        🗳 You have {voter.availableVotes} votes available
      </Typography>
      <LoadingButton
        onClick={castBallot}
        loading={formState.sending}
        variant="contained"
        loadingIndicator="Submitting..."
        sx={{ mt: 4, fontSize: 25 }}
      >
        Submit Ballot
      </LoadingButton>
    </>
  );
}
