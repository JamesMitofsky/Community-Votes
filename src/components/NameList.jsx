import { List, ListItem, ListItemText } from "@mui/material";

export default function NameList({ names }) {
  const listItems = names.map((name) => {
    return (
      <ListItem divider key={name.id}>
        <ListItemText primary={name.name} />
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}
