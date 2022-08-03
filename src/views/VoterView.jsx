import NameList from "../components/NameList.jsx";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VoterView() {
  // REQUIREMENT: get info from url
  const urlParams = {
    voterName: "James",
    availableVotes: 3,
  };

  // create states waiting to accept values
  const [candidates, setCandidates] = useState([]);
  const [availableVotes, setAvailableVotes] = useState(
    urlParams.availableVotes
  );

  useEffect(() => {
    // get votable from server
    const instance = axios.create({
      baseURL: "http://127.0.0.1:5000",
    });

    // REQUIREMENT: get id from url
    const votableID = "Test votableYgFjbbFmbZ";
    instance(`/votables/${votableID}`, {
      method: "get",
      responseType: "stream",
    }).then(function (response) {
      const candidateArray = response.data.candidates;
      setCandidates(candidateArray);
    });
  }, []);

  return (
    <>
      <h1>Welcome to your ballot, {urlParams.voterName} 👋</h1>
      <h2>You have {availableVotes} votes available</h2>
      <NameList people={candidates} />
    </>
  );
}
