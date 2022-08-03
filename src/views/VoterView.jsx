import NameList from "../components/NameList.jsx";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import axios from "axios";

function voterObject(voterID, votableObject) {
  console.log(votableObject);

  const allVoters = votableObject.voters;
  const voter = allVoters.find((voter) => voter.id === voterID);

  console.log(voter);
  return voter;
}

export default function VoterView() {
  // PLACEHOLDER: get info from url
  const urlParams = {
    votableID: "Test votableYgFjbbFmbZ",
    voterID: "voter bobVyPYsJIWld",
  };

  // create empty state variables
  const [candidates, setCandidates] = useState([]);
  const [voter, setVoter] = useState({
    availableVotes: 0,
    name: "",
  });
  useEffect(() => {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:5000",
    });

    // REQUIREMENT: get id from url
    instance(`/votables/${urlParams.votableID}`, {
      method: "get",
    }).then(function (response) {
      setCandidates(response.data.candidates);
      const voter = voterObject(urlParams.voterID, response.data);

      setVoter({ name: voter.name, availableVotes: voter.votes });
    });
  }, []);

  return (
    <>
      <h1>Welcome to your ballot, {voter.name} 👋</h1>
      <h2>You have {voter.availableVotes} votes available</h2>
      <NameList people={candidates} />
    </>
  );
}
