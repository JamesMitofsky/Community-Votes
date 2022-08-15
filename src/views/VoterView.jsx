import PlusMinusCounter from "../components/PlusMinusCounter.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Typography, List, ListItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

// import alerts
import Success from "../components/alerts/Success.jsx";
import Error from "../components/alerts/Error.jsx";

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
          console.log(pageState);
          console.log(newStateObj(pageState, "loading")); // TESTING
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
    // if the candidate already has 5 votes, exit the function
    if (
      isPlus &&
      candidates.find((candidate) => candidate.id === id).votes >= 5
    )
      return;

    setCandidates((prevCandidates) => {
      let updatedCandidates = prevCandidates.map((candidate) =>
        candidate.id !== id
          ? candidate
          : { ...candidate, votes: candidate.votes + incrementDirection }
      );
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
        setError({ state: true, response: error });
      });
  }

  // entire page loading
  const [pageLoading, setPageLoading] = useState(true);
  // loading of the ballot
  const [loadingState, setLoadingState] = useState(false);
  // server returned an error
  const [error, setError] = useState({ state: false, response: {} });
  // server successfully posted the ballot
  const [success, setSuccess] = useState(false);
  // function for resetting success state after it's been displayed

  // the current state of the voter page, representing the loading of the voter form
  const [pageState, setPageState] = useState({
    insufficientParams: false,
    preLoad: false,
    loading: false,
    loaded: false,
    error: false,
  });

  // used by state setting function to ensure only one state is active at a time
  function newStateObj(prevStateObj, newStateName) {
    try {
      const preparedStateObj = {
        ...prevStateObj,
        [newStateName]: true,
      };

      return preparedStateObj;
    } catch (error) {
      console.log(error);
    }
  }

  function endSuccess() {
    setSuccess(false);
  }

  const voterForm = (
    <>
      <Typography variant="h1" sx={{ borderBottom: 1 }}>
        Welcome to your ballot, {voter.name} 👋
      </Typography>
      <Typography variant="h3" fontWeight="bold" sx={{ mt: 6 }}>
        CANDIDATES
      </Typography>
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
      <Typography variant="subtitle" align="right">
        🗳 You have {voter.availableVotes} votes available
      </Typography>
      <LoadingButton
        onClick={castBallot}
        loading={loadingState}
        variant="contained"
        loadingIndicator="Submitting your ballot..."
        sx={{ mt: 4, fontSize: 25 }}
      >
        Submit Ballot
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
      {/* display if server succeeds */}
      {success ? <Success endSuccess={endSuccess} succeeded={success} /> : null}
      {/* display if server has error */}
      {error.state ? (
        <Error state={error.state} response={error.response} />
      ) : null}
    </>
  );
}
