import PlusMinusCounter from "../components/PlusMinusCounter.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button, List, ListItem } from "@mui/material";
import { Helmet } from "react-helmet";

export default function VoterView() {
  // get search parameters from the url
  const searchParams = new URLSearchParams(window.location.search);
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

  function voterObject(voterID, votableObject) {
    const allVoters = votableObject.voters;
    const voter = allVoters.find((voter) => voter.id === voterID);
    return voter;
  }

  // FIX: useEffect should not be async. This should be handled inside the useEffect function
  useEffect(() => {
    async function fetchData() {
      // sets baseline url for the server address
      const instance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_ADDRESS,
      });

      // returns votable object
      const votableInfo = await instance
        .get(`/votables/${urlParams.votableID}`)
        .then(function (response) {
          // object of candidate names and IDs
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

      // returns object with three properties: name, id, votes
      const returnedCandidateVotes = await instance
        .get(
          `/votables/${urlParams.votableID}/votes?voterId=${urlParams.voterID}`
        )
        .then(function (response) {
          // get candidate names and ids
          const candidates = response.data;

          // return all candidates with their votes attached
          const newArray = candidates.map((candidate) => {
            return {
              name: candidate.candidateName,
              id: candidate.candidateId,
              votes: candidate.votes,
            };
          });
          return newArray;
        });

      // add the number of votes each candidate has already received to their object in the array
      setCandidates(returnedCandidateVotes);

      const voter = voterObject(urlParams.voterID, votableInfo);
      setVoter({ name: voter.name, availableVotes: voter.votes });
    }
    fetchData();
  }, [urlParams.voterID, urlParams.votableID]);

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
      <Helmet>
        <title>Voting</title>
      </Helmet>
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
              divider
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
