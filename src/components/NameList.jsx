import { List, ListItem, ListItemText } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function NameList({ names }) {
  const listItems = names.map((name) => {
    return (
      <ListItem divider key={uuidv4()}>
        <ListItemText primary={name} />
      </ListItem>
    );
  });

  return <List>{listItems}</List>;
}
