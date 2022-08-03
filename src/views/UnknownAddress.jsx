import { Link } from "react-router-dom";
import signsSVG from "../assets/signs.svg";

export default function UnkownAddress() {
  return (
    <>
      <h1>
        Whoops, sorry about that! Would you like to return{" "}
        <Link to="/">home</Link>?
      </h1>
      <img style={{ width: "inherit" }} src={signsSVG} alt="" />
    </>
  );
}
