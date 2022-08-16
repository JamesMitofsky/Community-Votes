import { CircularProgress, Stack } from "@mui/material";

export default function LoadingSpinner({ isLoading }) {
  return (
    <>
      <Stack
        display="flex"
        margin="auto"
        justifyContent="center"
        flexdirection="column"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Stack>
    </>
  );
}
