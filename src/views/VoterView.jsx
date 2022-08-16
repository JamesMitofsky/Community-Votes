import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import VoterForm from "../components/VoterForm.jsx";

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

  // DATA for rendering out
  const [candidates, setCandidates] = useState([]);
  const [votableContent, setVotableContent] = useState({});
  const [voter, setVoter] = useState({
    availableVotes: "",
    name: "",
  });

  //————————————————————————————————————————————————————————————————————————————————————

  // get search parameters from the url
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = {
    votableID: searchParams.get("votableID"),
    voterID: searchParams.get("voterID"),
  };

  useEffect(() => {
    // if all params exist, exit function
    if (urlParams.votableID && urlParams.voterID) return;

    setPageState((prevState) => newState(prevState, "insufficientParams"));
  }, [urlParams.voterID, urlParams.votableID]);

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
    if (pageState.insufficientParams) return;
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
        setVotableContent(votableInfo);

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
  }, [urlParams.voterID, urlParams.votableID, pageState.insufficientParams]);

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

    // prevent voter from voting for more than five candidates
    const candidatesVotedFor = candidates.reduce((acc, candidate) => {
      if (candidate.votes === 0) return acc;
      return [...acc, candidate.id];
    }, []);

    const numberVotedFor = candidatesVotedFor.length;
    const alreadyVotedFor = candidatesVotedFor.includes(id);

    // how many candidates is the voter allowed to select
    const voteLimit = 5;

    // stop voter if this next vote will put them over the max number of candidates they can vote for
    // however, allow them to vote if they're just giving one of their five candidates more votes
    if (isPlus && numberVotedFor >= voteLimit && !alreadyVotedFor) {
      alert(
        `You can vote for a maximum of ${voteLimit} candidates. Please remove your votes for one candidate if you'd like to vote for another.`
      );
      return;
    }

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

  return (
    <>
      <Helmet>
        <title>Voting</title>
      </Helmet>
      {pageState.loading && <LoadingSpinner />}

      {pageState.insufficientParams && (
        <Typography variant="h2" component="h1">
          There's nothing to vote on right now.
        </Typography>
      )}

      {pageState.loaded && (
        <VoterForm
          votableContent={votableContent}
          candidates={candidates}
          voter={voter}
          updateVotes={updateVotes}
          formState={formState}
          castBallot={castBallot}
        />
      )}

      {formState.sent && <Success succeeded={formState.sent} />}

      {errorState && (
        <Error state={errorState.state} response={errorState?.message} />
      )}
    </>
  );
}
