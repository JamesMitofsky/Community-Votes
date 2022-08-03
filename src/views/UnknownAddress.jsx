import { Link } from "react-router-dom";

export default function UnkownAddress() {
  return (
    <h1>
      Whoops, sorry about that! Would you like to return{" "}
      <Link to="/">home</Link>?
    </h1>
  );
}
