import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NameList from "../components/NameList.jsx";

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
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [urlParams.votableID]);

  return (
    <>
      <Helmet>
        <title>Results</title>
      </Helmet>
      <Typography variant="h1">Results for {urlParams.votableID}</Typography>
      {candidates.length > 0 ? (
        <NameList people={candidates} />
      ) : (
        <Typography variant="h3">No votes have been cast.</Typography>
      )}
    </>
  );
}
