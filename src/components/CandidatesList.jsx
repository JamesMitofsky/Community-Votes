import { List, ListItem, ListItemText } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function CandidatesList({ candidates }) {
  const listItems = candidates.map((candidate) => {
    return (
      <ListItem key={uuidv4()}>
        <ListItemText primary={candidate} />
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}
