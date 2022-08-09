import { List, ListItem, ListItemText } from "@mui/material";

export default function NameList({ people }) {
  // verify if people variable are candidates
  const hasVotes = people[0]?.votes ? true : false;

  // if candidates, sort by votes
  if (hasVotes) {
    people.sort((a, b) => b.votes - a.votes);
  }

  const listItems = people.map((person) => {
    return (
      <ListItem divider key={person.id}>
        <ListItemText
          primary={person.name}
          secondary={hasVotes ? person.votes : ""}
        />
      </ListItem>
    );
  });

  return people.length > 0 ? <List>{listItems}</List> : "";
}
