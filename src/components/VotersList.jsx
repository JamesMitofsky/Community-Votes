import { List, ListItem, ListItemText } from "@mui/material";

export default function VotersList({ voters }) {
  // reverse list order to display most recent first
  const listItems = voters.map((voter) => {
    console.log("newid:", voter.id);
    let votesText = `votes: ${voter.voterVotes}`;
    return (
      <ListItem key={voter.id}>
        <ListItemText primary={voter.voterName} secondary={voter.voterEmail} />
        <ListItemText primary={votesText} align="right" />
      </ListItem>
    );
  });

  return <List> {listItems} </List>;
}
