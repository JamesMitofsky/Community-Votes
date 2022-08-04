import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";

export default function SuccessButton({
  loading,
  success,
  publishToServer,
  incompleteForm,
}) {
  const buttonSx = {
    ...(success && {
      bgcolor: "green.500",
      "&:hover": {
        bgcolor: "green.700",
      },
    }),
  };

  // return true when either loading or form completed
  const buttonState = loading || incompleteForm;
  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <Button
        variant="contained"
        sx={buttonSx}
        disabled={buttonState}
        onClick={publishToServer}
      >
        Accept terms
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}
