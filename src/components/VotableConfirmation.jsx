import { useState, forwardRef } from "react";
import {
  Dialog,
  Button,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NameList from "./NameList";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VotableConfirmation({ isOpen, votableData }) {
  const { candidates, name, voters } = votableData.data;

  const [open, setOpen] = useState(isOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          // color={theme.palette.primary.dark}
          sx={{ bgcolor: "primary.success", position: "relative" }}
        >
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h2">
              Successfully created: "{name}"
            </Typography>
            <Button
              startIcon={<CloseIcon />}
              autoFocus
              color="inherit"
              onClick={handleClose}
            >
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 2 }}>
          <Typography variant="h2">Candidates</Typography>
          <Typography variant="subtitle1">
            Added {candidates.length} Candidate{candidates.length > 1 && "s"} 🤵
          </Typography>
          <NameList people={candidates} />
          <Typography variant="h2">Voters</Typography>
          <Typography variant="subtitle1">
            Added {voters.length} Voter{voters.length > 1 && "s"} 🧍
          </Typography>
          <NameList people={voters} />
        </Container>
      </Dialog>
    </div>
  );
}
