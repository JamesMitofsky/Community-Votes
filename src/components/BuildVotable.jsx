import { Grid, Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import Votable from "./Votable.jsx";
import Voter from "./Voter.jsx";
import VotersList from "./VotersList.jsx";
import Candidate from "./Candidate.jsx";
import NameList from "./NameList.jsx";
// import callRestApi from "../functions/callRestApi.js";
import axios from "axios";

export default function BuildVotable() {
  // STATES SECTION

  // VOTERS (current) state - currentVoter accepts object, eventually sending to the voters array (State 2)
  const [currentVoter, setCurrentVoter] = useState({
    voterName: "",
    voterEmail: "",
    voterVotes: 0,
  });
  function updateVoter(event) {
    const name = event.target.name;
    // does incoming property exist on object
    if (currentVoter[name] === undefined)
      console.log(
        `HOA Error: ${name} does not exist as a property of the currentVoter object.`
      );

    const value = event.target.value;
    setCurrentVoter({
      ...currentVoter,
      [name]: value,
    });
  }

  // VOTERS (all) state - voters accepts array of objects from State 1
  const [voters, setVoters] = useState([]);
  function addVoterToArray() {
    setVoters((prevVoters) => [currentVoter, ...prevVoters]);
    setCurrentVoter({ voterName: "", voterEmail: "", voterVotes: 0 });
  }

  // CANDIDATES (current) state - update current candidate field
  const [currentCandidate, setCurrentCandidate] = useState("");

  // CANDIDATES state — complete list
  const [candidates, setCandidates] = useState([]);
  function addCandidate() {
    setCandidates((prevCandidates) => [currentCandidate, ...prevCandidates]);
    setCurrentCandidate("");
  }

  // VOTABLES state - accepts a string
  const [votable, setVotable] = useState("");

  // COLLECTIVE state
  const [completeVotable, setCompleteVotable] = useState({
    votable,
    candidates,
    voters,
  });

  useEffect(() => {
    console.log("EFFECT in effect ;)");
    setCompleteVotable({
      votable: votable,
      candidates: candidates,
      voters: voters,
    });
  }, [candidates, voters, candidates]);

  // submit button disabled if incomplete form
  const [buttonState, setButtonState] = useState(true);
  useEffect(() => {
    const readyToGo = Object.values(completeVotable).every(
      (prop) => prop.length > 0
    );
    if (readyToGo) {
      setButtonState((prevButtonState) => !prevButtonState);
    }
  }, [completeVotable]);

  function publishToServer(e) {
    e.preventDefault();
    // callRestApi(); <-- eventually want to be calling this as an imported function
    const instance = axios.create({
      baseURL: "http://127.0.0.1:5000",
    });

    instance
      .post("/votables", {
        // dummy data for testing
        candidates: "Greg, James",
        name: "MyVotable",
        voters: "Greg,greg@votable.com,2\nJames,james@votable.com,3",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Grid component="form" container rowSpacing={5} style={{ display: "flex" }}>
      <Grid item xs={12}>
        <Typography variant="h2">Create a votable!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Votable currentVotable={votable} setCurrentVotable={setVotable} />
      </Grid>
      <Grid item xs={12}>
        <Candidate
          addCandidate={addCandidate}
          currentCandidate={currentCandidate}
          setCurrentCandidate={setCurrentCandidate}
        />
        <Typography variant="h3">
          {candidates.length > 0 ? "Registered Candidates" : ""}
        </Typography>
        <NameList names={candidates} />
      </Grid>
      <Grid item xs={12}>
        <Voter
          currentVoter={currentVoter}
          updateVoter={updateVoter}
          submitVoter={addVoterToArray}
        />
        <Typography variant="h3">
          {voters.length > 0 ? "Registered Voters" : ""}
        </Typography>
        <VotersList voters={voters} />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          onClick={publishToServer}
          disabled={buttonState}
          fullWidth
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Save this votable
        </Button>
      </Grid>
    </Grid>
  );
}
