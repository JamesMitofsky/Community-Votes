import PlusMinusCounter from "../components/PlusMinusCounter.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button, List, ListItem } from "@mui/material";

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
    availableVotes: "",
    name: "",
  });
  useEffect(() => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
    });
    instance
      .get(`/votables/${urlParams.votableID}`)
      .then(function (response) {
        // add vote count property to candidates for presentation to the voter who will cast their votes
        const candidatesWithVotes = addVoteParamToObjs(
          response.data.candidates
        );

        setCandidates(candidatesWithVotes);
        const voter = voterObject(urlParams.voterID, response.data);
        setVoter({ name: voter.name, availableVotes: voter.votes });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [urlParams.voterID, urlParams.votableID]);

  function addVoteParamToObjs(arrayOfObjs) {
    return arrayOfObjs.map((obj) => ({ ...obj, votes: 0 }));
  }

  function updateVotes(id, isPlus) {
    const incrementDirection = isPlus ? 1 : -1;
    const hasVotesRemaining = voter.availableVotes > 0;
    // if voter wants to add votes but doesn't have more votes to add, exit function
    if (isPlus && !hasVotesRemaining) return;
    // if the vote would move a candidate below zero, exit function
    if (
      !isPlus &&
      candidates.find((candidate) => candidate.id === id).votes <= 0
    )
      return;

    setCandidates((prevCandidates) => {
      let updatedCandidates = prevCandidates.map((candidate) =>
        candidate.id !== id
          ? candidate
          : { ...candidate, votes: candidate.votes + incrementDirection }
      );
      // updatedCandidate.votes = isPlus
      //   ? updatedCandidate.votes + 1
      //   : updatedCandidate.votes - 1;
      return updatedCandidates;
    });
    setVoter((prevVoter) => {
      return {
        ...prevVoter,
        availableVotes: isPlus
          ? prevVoter.availableVotes - 1
          : prevVoter.availableVotes + 1,
      };
    });
  }

  function castBallot() {
    const objOfCandidates = candidates.reduce((acc, current) => {
      let newObj = { ...acc, [current.id.trim()]: current.votes };
      return newObj;
    }, {});

    const candidatesAndVotes = {
      voterId: urlParams.voterID,
      // return all candidates mapped into object as key value pairs of id & votes
      votes: objOfCandidates,
    };

    console.log(candidatesAndVotes);

    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
    });
    instance
      .post(`/votables/${urlParams.votableID}/votes`, candidatesAndVotes)
      .then(function (response) {
        console.log(response);
        alert(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data);
      });
  }

  // if (voter.name) {
  return (
    <>
      <Typography variant="h1">
        Welcome to your ballot, {voter.name} 👋
      </Typography>
      <Typography variant="h2">
        You have {voter.availableVotes} votes available 🎉
      </Typography>
      <Typography variant="h3">Candidates</Typography>
      <List>
        {candidates.map((candidate) => {
          return (
            <ListItem
              sx={{ justifyContent: "space-between" }}
              key={candidate.id}
            >
              <Typography variant="h3">{candidate.name}</Typography>
              <PlusMinusCounter
                candidate={candidate}
                updateVotes={updateVotes}
              />
            </ListItem>
          );
        })}
      </List>
      {/* <CastVotes candidates={candidates} updateCandidate={updateCandidates} countVotes={} /> */}
      <Button onClick={castBallot} fullWidth variant="outlined">
        Cast Vote
      </Button>
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
