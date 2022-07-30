import { List, ListItem, ListItemText } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function CandidatesList({ candidates }) {
  // reverse list order to display most recent first
  const recentFirstListing = candidates.reverse();
  const listItems = recentFirstListing.map((candidate) => {
    return (
      <ListItem key={uuidv4()}>
        <ListItemText primary={candidate} />
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}
