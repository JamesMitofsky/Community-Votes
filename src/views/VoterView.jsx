import NameList from "../components/NameList.jsx";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function VoterView() {
  // UPDATE: retrieve voter name via their id found in the URL
  const voterName = "James";

  //   UPDATE: get possible candidates from votable id
  const names = [
    { name: "James", id: uuidv4() },
    { name: "Greg", id: uuidv4() },
  ];

  //   UPDATE: get available votes from votable info
  const [availableVotes, setAvailableVotes] = useState(3);

  return (
    <>
      <h1>Welcome to your ballot, {voterName} 👋</h1>
      <h2>You have {availableVotes} votes available</h2>
      <NameList names={names} />
    </>
  );
}
