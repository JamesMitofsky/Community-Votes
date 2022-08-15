import { Grid, Typography } from "@mui/material";
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
import { LoadingButton } from "@mui/lab";

export default function BuildVotable() {
  // STATES SECTION
  const [voters, setVoters] = useState([]);
  function addVoterToArray(voterName, voterEmail, voterVotes) {
    let voter = {
      voterName: voterName,
      voterEmail: voterEmail,
      voterVotes: voterVotes,
      id: uuidv4(),
    };
    setVoters((previousVoters) => [...previousVoters, voter]);
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
  const [submitEnabled, setSubmitEnabled] = useState(false);
  useEffect(() => {
    const readyToGo = Object.values(completeVotable).every(
      (prop) => prop.length > 0
    );

    if (readyToGo) {
      setSubmitEnabled(true);
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
          <NameList people={candidates} />
          <Candidate
            addCandidate={addCandidate}
            currentCandidate={currentCandidate}
            setCurrentCandidate={setCurrentCandidate}
          />
        </Grid>
        <Grid item>
          <Typography variant="h2">Voters</Typography>
          <VotersList voters={voters} />
          <Voter
            submitVoter={addVoterToArray}
          />
        </Grid>
        <Grid item>
          {votableConfirmation}
          <LoadingButton
            fullWidth
            onClick={publishToServer}
            loading={loading}
            variant="contained"
            // loadingIndicator="Submitting your ballot..."
            disabled={!submitEnabled}
            sx={{ mt: 4, fontSize: 25 }}
          >
            Submit
          </LoadingButton>
          {error.state ? (
            <Error state={error.state} response={error.response} />
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
