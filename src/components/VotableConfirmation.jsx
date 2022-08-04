import { Button, Modal, Typography, Card, CardContent } from "@mui/material";
import NameList from "./NameList";

export default function VotableConfirmation({
  isOpen,
  handleOpen,
  votableData,
}) {
  const { candidates, name, voters } = votableData.data;

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
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
              Votable Successfully Saved!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {name}
            </Typography>
            <Typography id="modal-modal-title" variant="h2">
              Candidate Names
            </Typography>
            <NameList people={candidates} />
            <Typography id="modal-modal-title" variant="h2">
              Voter Names
            </Typography>
            <NameList people={voters} />
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
