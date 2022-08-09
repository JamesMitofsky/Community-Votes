import { List, ListItem, ListItemText } from "@mui/material";

export default function NameList({ people }) {
  const listItems = people.map((person) => {
    return (
      <ListItem divider key={person.id}>
        <ListItemText primary={person.name} secondary={`ID: ${person.id}`} />
      </ListItem>
    );
  });

  return people.length > 0 ? <List>{listItems}</List> : "";
}
