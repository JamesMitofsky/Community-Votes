import homeSVG from "../assets/home.svg";
import { Typography } from "@mui/material";
export default function LandingPage() {
  return (
    <>
      <Typography variant="h1">Association HQ!</Typography>
      <Typography variant="p">
        If there's something being voted on, the person running your elections
        will email you a link.
      </Typography>
      <img
        style={{ width: "inherit" }}
        src={homeSVG}
        alt="Three houses in a neighborhood together."
      />
    </>
  );
}
