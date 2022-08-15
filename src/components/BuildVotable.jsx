import { Grid, Typography } from "@mui/material";
import SuccessButton from "./SuccessButton.jsx";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TextInput from "./TextInput.jsx";
import Voter from "./Voter.jsx";
import VotersList from "./VotersList.jsx";
import VotableConfirmation from "../components/VotableConfirmation.jsx";
import VotableExpiration from "../components/VotableExpiration.jsx";
import Candidate from "./Candidate.jsx";
import NameList from "./NameList.jsx";
import { Helmet } from "react-helmet";
import Error from "../components/alerts/Error.jsx";
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
  const [adminEmail, setAdminEmail] = useState("");
  function handleAdminEmail(newValue) {
    setAdminEmail(newValue);
  }
  console.log(adminEmail);

  // expecting ISO format string
  const [votableExpiration, setVotableExpiration] = useState(new Date());

  // COLLECTIVE state
  const [completeVotable, setCompleteVotable] = useState({
    candidates,
    name: votable,
    voters,
    expiration: "",
    adminEmail: adminEmail,
  });

  function handleVotableExpiration(dateObj) {
    setVotableExpiration(dateObj);
  }

  useEffect(() => {
    // convert completeVotable object into acceptable data forms
    const { candidatesString, votersString } = convertData(candidates, voters);

    setCompleteVotable({
      candidates: candidatesString,
      name: votable,
      voters: votersString,
      expiration: votableExpiration ? votableExpiration.toISOString() : "",
      adminEmail: adminEmail,
    });
  }, [candidates, voters, votable, votableExpiration, adminEmail]);

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
    setLoading(true);

    // callRestApi(); <-- eventually want to be calling this as an imported function
    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
    });

    // all these state sets should be getting batched with useReducer()
    instance
      .post("/votables", completeVotable)
      .then(function (response) {
        setVotableData(response);
        setLoading(false);
        setSuccess(true);
        // reset all states
        setVotable("");
        setAdminEmail("");
        setCandidates([]);
        setVoters([]);
        setCurrentVoter({
          voterName: "",
          voterEmail: "",
          voterVotes: "",
          id: uuidv4(),
        });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setError({ state: true, response: error });
      });
  }

  const [error, setError] = useState({ state: false, response: {} });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  function handleSuccess() {
    setSuccess((prev) => !prev);
  }

  let votableConfirmation = success ? (
    <VotableConfirmation
      isOpen={success}
      handleOpen={handleSuccess}
      votableData={votableData}
    />
  ) : (
    ""
  );

  return (
    <>
      <Helmet>
        <title>Build Votable</title>
      </Helmet>
      <Grid
        component="form"
        container
        rowSpacing={3}
        direction="column"
        style={{ display: "flex" }}
      >
        <Grid item>
          <Typography variant="h1">Create a votable!</Typography>
        </Grid>
        <Grid item>
          <TextInput
            currentText={votable}
            setCurrentText={setVotable}
            helperText="What's being voted on?"
            label="Title"
          />
        </Grid>
        <Grid item>
          <TextInput
            currentText={adminEmail}
            setCurrentText={handleAdminEmail}
            helperText="Where do you want the confirmation email sent?"
            label="Administrator Email"
          />
        </Grid>
        <Grid item sx={{ mt: 1}}>
          <VotableExpiration
            votableExpiration={votableExpiration}
            handleExpirationChange={handleVotableExpiration}
          />
        </Grid>
        <Grid item>
          <Typography variant="h2">Candidates</Typography>
          <Candidate
            addCandidate={addCandidate}
            currentCandidate={currentCandidate}
            setCurrentCandidate={setCurrentCandidate}
          />
          <NameList people={candidates} />
        </Grid>
        <Grid item>
          <Typography variant="h2">Voters</Typography>
          <Voter
            currentVoter={currentVoter}
            updateVoter={updateVoter}
            submitVoter={addVoterToArray}
          />
          <VotersList voters={voters} />
        </Grid>
        <Grid item>
          {votableConfirmation}
          <SuccessButton
            publishToServer={publishToServer}
            loading={loading}
            success={success}
            incompleteForm={buttonState}
          />
          {error.state ? (
            <Error state={error.state} response={error.response} />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
