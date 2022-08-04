import NameList from "../components/NameList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

function voterObject(voterID, votableObject) {
  const allVoters = votableObject.voters;
  const voter = allVoters.find((voter) => voter.id === voterID);
  return voter;
}

export default function VoterView() {
  // get search parameters from the url
  const searchParams = new URLSearchParams(window.location.search);

  // setSearchParams({ name: "james" });
  // PLACEHOLDER: get info from url
  const urlParams = {
    votableID: searchParams.get("votableID"),
    voterID: searchParams.get("voterID"),
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

  // if (voter.name) {
  return (
    <>
      <Typography variant="h1">
        Welcome to your ballot, {voter.name} 👋
      </Typography>
      <Typography variant="h2">
        You have {voter.availableVotes} votes available 🎉
      </Typography>
      <NameList people={candidates} />
    </>
  );
  // }
  // else {
  //   return (
  //     <>
  //       <Typography variant="h1">Hi, voter!</Typography>
  //       <Typography variant="p">
  //         We can't see who see who you are yet, but if the person running your
  //         elections has told you something is being voted on, you might want to
  //         check your email.
  //       </Typography>
  //     </>
  //   );
  // }
}
