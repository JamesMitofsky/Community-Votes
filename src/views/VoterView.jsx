import NameList from "../components/NameList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

function voterObject(voterID, votableObject) {
  const allVoters = votableObject.voters;
  const voter = allVoters.find((voter) => voter.id === voterID);
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
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
    });
    instance
      .get(`/votables/${urlParams.votableID}`)
      .then(function (response) {
        setCandidates(response.data.candidates);
        const voter = voterObject(urlParams.voterID, response.data);
        setVoter({ name: voter.name, availableVotes: voter.votes });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [urlParams.voterID, urlParams.votableID]);

  return (
    <>
      <h1>Welcome to your ballot, {voter.name} 👋</h1>
      <h2>You have {voter.availableVotes} votes available</h2>
      <NameList people={candidates} />
    </>
  );
}
