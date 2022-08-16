import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import TableDisplay from "../components/TableDisplay.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Error from "../components/alerts/Error.jsx";
import setState from "../functions/stateManagement.js";

export default function ResultsView() {
  // const [candidateElms, setCandidateElms] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [votableName, setVotableName] = useState("");
  const [error, setError] = useState({
    state: false,
    response: {},
    message: "",
  });

  const [pageState, setPageState] = useState({
    insufficientParams: true,
    loading: false,
    loaded: false,
  });
  // briefer way to set page state
  function setPage(newStateName) {
    setState(setPageState, newStateName);
  }

  // get search parameters from the url
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = {
    votableID: searchParams.get("votableID"),
  };

  useEffect(() => {
    try {
      setPage("loading");

      if (urlParams.votableID === null) {
        // set error state if no votableID exists
        setError({
          state: true,
          message:
            "We couldn't find the votable ID you were looking for based on this link.",
        });
      }
      if (error.state === true) {
        console.log(
          "Exception: couldn't find the votable ID you were looking for based on this link."
        );
        return;
      }

      async function fetchData() {
        // request the results from the server
        const instance = axios.create({
          baseURL: process.env.REACT_APP_SERVER_ADDRESS,
          headers: {
            "x-access-token":
              "e40f68b57ced585d79955d151861d2dfe22ca3b96d0a9ccd084690a338138203",
          },
        });
        const votableTally = await instance
          .get(`/votables/${urlParams.votableID}/tally`)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
            setError({
              state: true,
              message: "We couldn't return the results from our server.",
            });
          });

        // transform candidate data to later be consumed by NamesList component
        const tallyCandidates = votableTally.map((candidate) => {
          return {
            ...candidate,
            name: candidate.candidateName,
            id: candidate.candidateId,
          };
        });
        setCandidates(tallyCandidates);

        // request the full votable object
        const altInstance = axios.create({
          baseURL: process.env.REACT_APP_SERVER_ADDRESS,
        });
        const completeVotable = await altInstance
          .get(`/votables/${urlParams.votableID}`)
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            console.log(error);
            setError({
              state: true,
              message:
                "We couldn't find the votableID included in the link you're using.",
            });
          });

        setVotableName(completeVotable.name);
        const { possibleVotes, castVotes } = calculateVoteUsage(
          completeVotable.voters,
          tallyCandidates
        );
        setVotesUsageData({ possibleVotes, castVotes });
        setState(setPageState, "loaded");
      }
      fetchData();
    } catch (error) {
      console.log("Catch statement:", error);
    }
  }, [urlParams.votableID, error.state]);

  const [votesUsageData, setVotesUsageData] = useState({
    possibleVotes: "—",
    castVotes: "—",
  });

  function calculateVoteUsage(voters, candidates) {
    const possibleVotes = voters.reduce((total, voter) => {
      return total + voter.votes;
    }, 0);

    const castVotes = candidates.reduce((total, candidate) => {
      return total + candidate.votes;
    }, 0);
    return { possibleVotes, castVotes };
  }

  const mainView = (
    <>
      <Typography variant="h2">
        Of the {votesUsageData.possibleVotes} votes which could have been cast,{" "}
        {votesUsageData.castVotes} were submitted.
      </Typography>
      <TableDisplay array={candidates} />
    </>
  );

  return (
    <>
      <Helmet>
        <title>Results</title>
      </Helmet>
      <Typography variant="h1">Results: {votableName}</Typography>

      {pageState.insufficientParams && (
        <Typography variant="h2">
          Sorry, we couldn't find the voting results you were looking for.
        </Typography>
      )}

      {pageState.loading && <LoadingSpinner />}

      {pageState.loaded && mainView}

      {error.state && (
        <Error
          state={error.state}
          message={error.message}
          response={error.response}
        />
      )}
    </>
  );
}
