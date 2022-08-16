import { Link } from "react-router-dom";
import signsSVG from "../assets/signs.svg";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

export default function UnkownAddress() {
  return (
    <>
      <Helmet>
        <title>404 – Unknown Link</title>
      </Helmet>
      <Typography variant="h1">
        Whoops, sorry about that! Would you like to return{" "}
        <Link to="/">home</Link>?
      </Typography>
      <img style={{ width: "inherit" }} src={signsSVG} alt="" />
    </>
  );
}
