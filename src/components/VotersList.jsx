import { List, ListItem, ListItemText } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function VotersList({ voters }) {
  const listItems = voters.map((voter) => {
    return (
      <ListItem key={uuidv4()}>
        <ListItemText primary={voter.voterName} secondary="Name" />
        <ListItemText primary={voter.voterEmail} secondary="Email" />
        <ListItemText primary={voter.voterVotes} secondary="Votes" />
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}
