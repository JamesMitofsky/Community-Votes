import { Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Typography
      sx={{ textAlign: "center", marginBottom: 2 }}
      variant="subtitle1"
    >
      Coded by <Link href="https://github.com/Gregliest">Greg Lee in 🇺🇸</Link> &{" "}
      <Link href="https://github.com/JamesMitofsky">James Mitofsky in 🇫🇷</Link>
    </Typography>
  );
}
