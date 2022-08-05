import { List, ListItem, ListItemText } from "@mui/material";

export default function VotersList({ voters }) {
  // reverse list order to display most recent first
  const listItems = voters.map((voter) => {
    console.log("newid:", voter.id);
    return (
      <ListItem key={voter.id}>
        <ListItemText primary={voter.voterName} secondary="Name" />
        <ListItemText primary={voter.voterEmail} secondary="Email" />
        <ListItemText primary={voter.voterVotes} secondary="Votes" />
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}
