import PlusMinusCounter from "../components/PlusMinusCounter.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, List, ListItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Success from "../components/alerts/Success.jsx";
import SendIcon from "@mui/icons-material/Send";

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

  // add zero voting fields to each candidate with map method
  function handleNewCandidates(candidatesArray) {
    const candidatesWithVoteField = candidatesArray.map((candidate) => {
      return {
        ...candidate,
        votes: 0,
      };
    });
    return candidatesWithVoteField;
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

      const votableCandidates = votableInfo.candidates.map((thisCandidate) => {
        return { ...thisCandidate, id: thisCandidate.id };
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

      const votesAlreadyExist =
        returnedCandidateVotes.length > 0 ? true : false;

      // either set candidates by default or add votes field and add those candidates
      const candidatesWithVotes = votesAlreadyExist
        ? returnedCandidateVotes
        : handleNewCandidates(votableCandidates);

      setCandidates(candidatesWithVotes);

      const voter = voterObject(urlParams.voterID, votableInfo);

      const votesMinusVotesCast = calculateAvailableVotes(
        voter.votes,
        candidatesWithVotes
      );

      setVoter({ name: voter.name, availableVotes: votesMinusVotesCast });

      setPageLoading(false);
    }
    fetchData();
  }, [urlParams.voterID, urlParams.votableID]);

  function calculateAvailableVotes(numberOfVotesAllowed, arrayOfCandidates) {
    const votesMinusVotesCast = arrayOfCandidates.reduce(
      (accumulator, currentCandidate) => {
        return accumulator - currentCandidate.votes;
      },
      numberOfVotesAllowed
    );
    return votesMinusVotesCast;
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
    setLoadingState(true);
    const objOfCandidates = candidates.reduce((acc, current) => {
      let newObj = { ...acc, [current.id]: current.votes };
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
        // alert success
        setSuccess(true);
        setLoadingState(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [loadingState, setLoadingState] = useState(false);
  const [success, setSuccess] = useState(false);
  function endSuccess() {
    setSuccess(false);
  }

  const [pageLoading, setPageLoading] = useState(true);

  const voterForm = (
    <>
      <Typography variant="h1">
        Welcome to your ballot, {voter.name} 👋
      </Typography>
      <Typography variant="h2">
        You have {voter.availableVotes} votes available 🗳
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
      <LoadingButton
        onClick={castBallot}
        loading={loadingState}
        variant="outlined"
        endIcon={<SendIcon />}
        loadingIndicator="Casting your vote..."
      >
        Cast Vote
      </LoadingButton>
    </>
  );

  // if (voter.name) {
  return (
    <>
      <Helmet>
        <title>Voting</title>
      </Helmet>
      {pageLoading ? <LoadingSpinner /> : voterForm}
      {success ? <Success endSuccess={endSuccess} succeeded={success} /> : null}
    </>
  );
}
