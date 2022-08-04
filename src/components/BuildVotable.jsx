import { Grid, Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Votable from "./Votable.jsx";
import Voter from "./Voter.jsx";
import VotersList from "./VotersList.jsx";
import VotableConfirmation from "../components/VotableConfirmation.jsx";
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
    voterVotes: "",
    id: uuidv4(),
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
    setCurrentVoter({
      voterName: "",
      voterEmail: "",
      voterVotes: "",
      id: uuidv4(),
    });
  }

  // CANDIDATES (current) state - update current candidate field
  const [currentCandidate, setCurrentCandidate] = useState("");

  // CANDIDATES state — complete list
  const [candidates, setCandidates] = useState([]);
  function addCandidate() {
    setCandidates((prevCandidates) => [
      { name: currentCandidate, id: uuidv4() },
      ...prevCandidates,
    ]);
    setCurrentCandidate("");
  }

  // VOTABLES state - accepts a string
  const [votable, setVotable] = useState("");

  // COLLECTIVE state
  const [completeVotable, setCompleteVotable] = useState({
    candidates,
    name: votable,
    voters,
  });

  useEffect(() => {
    // convert completeVotable object into acceptable data forms
    const { candidatesString, votersString } = convertData(candidates, voters);

    setCompleteVotable({
      candidates: candidatesString,
      name: votable,
      voters: votersString,
    });
  }, [candidates, voters, votable]);

  function convertData(candidates, voters) {
    // convert array of candidate objects into string
    let candidatesString = candidates
      .map((candidate) => {
        return candidate.name;
      })
      .join(", ");
    // convert voters array into string
    let votersString = voters
      .map((voter) => {
        return `${voter.voterName},${voter.voterEmail},${voter.voterVotes}`;
      })
      .join("\n");
    return { candidatesString, votersString };
  }

  // submit button disabled if incomplete form
  const [buttonState, setButtonState] = useState(true);
  useEffect(() => {
    const readyToGo = Object.values(completeVotable).every(
      (prop) => prop.length > 0
    );
    if (readyToGo) {
      setButtonState(false);
    }
  }, [completeVotable]);

  const [votableData, setVotableData] = useState({});

  function publishToServer(e) {
    e.preventDefault();

    // callRestApi(); <-- eventually want to be calling this as an imported function
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
    });

    instance
      .post("/votables", completeVotable)
      .then(function (response) {
        console.log(response);
        setVotableData(response);
        setIsOpen(true);
        // reset all states
        setVotable("");
        setCandidates([]);
        setVoters([]);
        setCurrentVoter({
          voterName: "",
          voterEmail: "",
          voterVotes: "",
          id: uuidv4(),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [isOpen, setIsOpen] = useState(false);
  function handleOpen() {
    setIsOpen((prevOpen) => !prevOpen);
    console.log("ran");
  }

  let votableConfirmation = isOpen ? (
    <VotableConfirmation
      isOpen={isOpen}
      handleOpen={handleOpen}
      votableData={votableData}
    />
  ) : (
    ""
  );

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
        <NameList people={candidates} />
      </Grid>
      <Grid item xs={12}>
        <Voter
          currentVoter={currentVoter}
          updateVoter={updateVoter}
          submitVoter={addVoterToArray}
        />
        <VotersList voters={voters} />
      </Grid>
      <Grid item xs={12}>
        {votableConfirmation}
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
