import { Link } from "react-router-dom";
import signsSVG from "../assets/signs.svg";
import { Typography } from "@mui/material";

export default function UnkownAddress() {
  return (
    <>
      <Typography variant="h1">
        Whoops, sorry about that! Would you like to return{" "}
        <Link to="/">home</Link>?
      </Typography>

      <img style={{ width: "inherit" }} src={signsSVG} alt="" />
    </>
  );
}
