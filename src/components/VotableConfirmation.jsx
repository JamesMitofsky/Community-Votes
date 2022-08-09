import {
  Box,
  Button,
  Modal,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import NameList from "./NameList";

export default function VotableConfirmation({
  isOpen,
  handleOpen,
  votableData,
}) {
  const { candidates, name, voters, id } = votableData.data;

  return (
    <>
      <Modal
        sx={{ padding: "2rem" }}
        open={isOpen}
        onClose={handleOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Typography id="modal-modal-title" variant="h2">
              ✅{" "}
              <Box
                component="span"
                style={{ textDecoration: "underline" }}
                class="underline"
              >
                {name}
              </Box>{" "}
              was successfully created!
            </Typography>
            <Typography variant="h3">
              {candidates.length} Candidate{candidates.length > 1 ? "s" : "s"}{" "}
            </Typography>
            <NameList people={candidates} />
            <Typography variant="h3">
              {voters.length} Voter{voters.length > 1 ? "s" : "s"}
            </Typography>
            <NameList people={voters} />
            <Typography variant="h3">Votable ID</Typography>
            <Typography variant="p" sx={{ display: "block" }}>
              {id}
            </Typography>
            <Button sx={{ mt: 5 }} variant="contained" onClick={handleOpen}>
              Okay
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
