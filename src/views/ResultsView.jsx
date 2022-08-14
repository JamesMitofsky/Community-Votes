import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NameList from "../components/NameList.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Error from "../components/alerts/Error.jsx";

export default function ResultsView() {
  // const [candidateElms, setCandidateElms] = useState([]);
  const [candidates, setCandidates] = useState([]);

  // get search parameters from the url
  const searchParams = new URLSearchParams(window.location.search);
  const urlParams = {
    votableID: searchParams.get("votableID"),
  };

  useEffect(() => {
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
  }, [urlParams.votableID]);

  const [error, setError] = useState({ state: false, response: {} });
  const [pageLoaded, setPageLoaded] = useState(false);
  const votableID = urlParams.votableID;

  const mainView = (
    <>
      <Typography variant="h1">Results for {urlParams.votableID}</Typography>
      {candidates.length > 0 ? (
        <NameList people={candidates} />
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
