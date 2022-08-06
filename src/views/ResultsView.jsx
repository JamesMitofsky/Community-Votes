import { Typography, List, ListItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import getTotalVotes from "../functions/getTotalVotes.js";

export default function ResultsView() {
  const [votablesData, setVotablesData] = useState([]);
  const [candidates, setCandidates] = useState([]);

  function listItemsFromArray(array) {
    const listElms = array.map((item) => {
      const isCandidate = item.candidateName ? true : false;
      console.log(item);
      return (
        <ListItem divider key={isCandidate ? item.candidateId : item.id}>
          {isCandidate ? item.candidateName : item.name}{" "}
          {isCandidate
            ? `earned ${item.votes} votes`
            : `was allotted ${item.votes} votes`}
        </ListItem>
      );
    });
    return listElms;
  }

  useEffect(() => {
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
      headers: {
        "x-access-token":
          "e40f68b57ced585d79955d151861d2dfe22ca3b96d0a9ccd084690a338138203",
      },
    });
    instance
      .get("/votables")
      .then(function (response) {
        setVotablesData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    votablesData.forEach((votable) => {
      getTotalVotes(votable.id).then((candidates) => {
        setCandidates(candidates);
      });
    });
  }, [votablesData]);

  return (
    <>
      <Typography variant="h1">Results</Typography>
      <Typography variant="subtitle1">
        Here are the results of all votables.
      </Typography>
      {votablesData.map((votable) => {
        const votableName = votable.name;
        const candidatesListItems = listItemsFromArray(candidates);
        const votersListItems = listItemsFromArray(votable.voters);
        return (
          <>
            <Typography variant="h2">Votable: {votableName}</Typography>
            <Typography variant="h3">Candidates</Typography>
            <List>{candidatesListItems}</List>
            <Typography variant="h3">Voters</Typography>
            <List>{votersListItems}</List>
          </>
        );
      })}
    </>
  );
}
