import { Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Typography
      sx={{ textAlign: "center", marginBottom: 2 }}
      variant="subtitle1"
    >
      Coded by{" "}
      <a rel="noreferrer" target="_blank" href="https://github.com/Gregliest">
        <Link>Greg Lee in 🇺🇸</Link>
      </a>{" "}
      &{" "}
      <a
        rel="noreferrer"
        target="_blank"
        href="https://github.com/JamesMitofsky"
      >
        <Link>James Mitofsky in 🇫🇷</Link>
      </a>
    </Typography>
  );
}
