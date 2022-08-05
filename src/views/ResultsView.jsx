import { Typography, Button, List, ListItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ResultsView() {
  const [votablesData, setVotablesData] = useState([]);

  function listItemsFromArray(array) {
    const listElms = array.map((item) => {
      return (
        <ListItem divider key={item.id}>
          {item.name}
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
        console.log(response);
        setVotablesData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Typography variant="h1">Results</Typography>
      <Typography variant="subtitle1">
        Here are the results of all votables.
      </Typography>
      {votablesData.map((votable) => {
        const votableName = votable.name;
        const candidatesListItems = listItemsFromArray(votable.candidates);
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
