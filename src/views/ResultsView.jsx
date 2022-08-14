import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TableDisplay from "../components/TableDisplay.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Error from "../components/alerts/Error.jsx";

export default function ResultsView() {
  // const [candidateElms, setCandidateElms] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [votableData, setVotableData] = useState({});

  // get search parameters from the url
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = {
    votableID: searchParams.get("votableID"),
  };

  useEffect(() => {
    // request the results from the server
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
      headers: {
        "x-access-token":
          "e40f68b57ced585d79955d151861d2dfe22ca3b96d0a9ccd084690a338138203",
      },
    });
    instance
      .get(`/votables/${urlParams.votableID}/tally`)
      .then(function (response) {
        // transform candidate data to later be consumed by NamesList component
        const candidates = response.data.map((candidate) => {
          return {
            ...candidate,
            name: candidate.candidateName,
            id: candidate.candidateId,
          };
        });

        // create list elements of all candidate votes
        setCandidates(candidates);
        setPageLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
        setError({ state: true, response: error });
      });

    // request the full votable object
    const altInstance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
    });
    altInstance
      .get(`/votables/${urlParams.votableID}`)
      .then(function (response) {
        console.log("full response", response);
        setVotableData(response.data);
        setVotesUsageData(calculateVoteUsage());
      })
      .catch(function (error) {
        console.log(error);
        setError({ state: true, response: error });
      });
  }, [urlParams.votableID]);

  const [votesUsageData, setVotesUsageData] = useState({});

  const [error, setError] = useState({ state: false, response: {} });
  const [pageLoaded, setPageLoaded] = useState(false);
  const votableID = urlParams.votableID;

  function calculateVoteUsage() {
    const possibleVotes = votableData.voters.reduce((total, voter) => {
      return total + voter.votes;
    }, 0);

    const castVotes = candidates.reduce((total, candidate) => {
      return total + candidate.votes;
    }, 0);
    return { possibleVotes, castVotes };
  }

  const mainView = (
    <>
      <Typography variant="h1">Results: {votableData.name}</Typography>
      {candidates.length > 0 ? (
        <>
          <Typography variant="h2">
            Of the {votesUsageData.possibleVotes} votes which could have been
            cast, {votesUsageData.castVotes} were submitted.
          </Typography>

          <TableDisplay array={candidates} />
        </>
      ) : (
        <Typography variant="h3">No votes have been cast.</Typography>
      )}
    </>
  );

  return (
    <>
      <Helmet>
        <title>Results</title>
      </Helmet>
      {/* If votable ID is coming but the page hasn't loaded, show the spinner */}
      {votableID && !pageLoaded ? (
        <LoadingSpinner />
      ) : // If page has loaded, show the main view. If not loaded but there is no ID, print text.
      pageLoaded ? (
        mainView
      ) : (
        'There are no results to view. Please make sure there is a "votableID" parameter in the link you used.'
      )}
      {error.state ? (
        <Error state={error.state} response={error.response} />
      ) : null}
    </>
  );
}
