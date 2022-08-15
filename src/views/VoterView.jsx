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
  // PAGE STATES

  // the current state of the voter page, representing the loading of the voter form
  const [pageState, setPageState] = useState({
    loading: true,
    insufficientParams: false,
    loaded: false,
  });

  const [formState, setFormState] = useState({
    insufficientParams: false,
    sending: false,
    sent: false,
  });

  const [errorState, setErrorState] = useState({
    state: false,
    message: "",
  });

  // used by state setting function to ensure only one state is active at a time
  // state example func:
  // setPageState(prevState => newState(prevState, "any_state_name"))
  function newState(prevStateObj, newStateName) {
    try {
      // retrieve all previous state names
      const prevStateKeys = Object.keys(prevStateObj);
      // create a new object setting all states to false
      const allFalseStates = prevStateKeys.reduce((acc, key) => {
        return { ...acc, [key]: false };
      }, {});

      // add single true object to all the false ones. Since it's the last added, it will be the sole survivor of the useState hook
      const newActiveStateObj = {
        ...allFalseStates,
        [newStateName]: true,
      };

      return newActiveStateObj;
    } catch (error) {
      console.log(error);
    }
  }

  // get search parameters from the url
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = {
    votableID: searchParams.get("votableID"),
    voterID: searchParams.get("voterID"),
  };

  // if any URL params are missing return error indicating this
  if (!urlParams.VotableID && !urlParams.voterID) {
    setPageState((prevState) => newState(prevState, "error"));
  }

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

  // get all votable data
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
          setErrorState({ state: true, message: error });
        });

      try {
        const votableCandidates = votableInfo.candidates.map(
          (thisCandidate) => {
            return { ...thisCandidate, id: thisCandidate.id };
          }
        );

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
          })
          .catch(function (error) {
            console.log(error);
            setErrorState({ state: true, message: error });
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

        // when async calls are done, set page as loaded
        setPageState((prev) => newState(prev, "loaded"));
      } catch (error) {
        setErrorState({ state: true, message: error });
      }
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
    setFormState((prevState) => newState(prevState, "sending"));
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
        setFormState((prevState) => newState(prevState, "sent"));
      })
      .catch(function (error) {
        console.log(error);
        setErrorState({ state: true, message: error });
      });
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
        loading={formState.sending}
        variant="contained"
        loadingIndicator="Submitting..."
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
      {pageState.loading && <LoadingSpinner />}
      {pageState.loaded && voterForm}

      {formState.sent && <Success succeeded={formState.sent} />}

      {errorState && (
        <Error state={errorState.state} response={errorState?.message} />
      )}
    </>
  );
}
