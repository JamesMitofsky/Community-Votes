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
import { Helmet } from "react-helmet-async";
import Error from "../components/alerts/Error.jsx";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

export default function BuildVotable() {
  // ------------------------------------------------------------
  // STATES
  const [voters, setVoters] = useState([]);
  function addVoter(voterName, voterEmail, voterVotes) {
    let voter = {
      voterName: voterName,
      voterEmail: voterEmail,
      voterVotes: voterVotes,
      id: uuidv4(),
    };
    setVoters((previousVoters) => [...previousVoters, voter]);
  }

  const [candidates, setCandidates] = useState([]);
  function addCandidate(candidateName) {
    setCandidates((prevCandidates) => [
      ...prevCandidates,
      { name: candidateName, id: uuidv4() },
    ]);
  }

  const [title, setTitle] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  // expecting ISO format string
  const [votableExpiration, setVotableExpiration] = useState(new Date());

  // submit button disabled if incomplete form
  const [submitEnabled, setSubmitEnabled] = useState(false);
  useEffect(() => {
    const readyToGo = [
      candidates,
      voters,
      title,
      votableExpiration.toISOString(),
      adminEmail,
    ].every((prop) => prop.length > 0);

    setSubmitEnabled(readyToGo);
  }, [candidates, voters, title, votableExpiration, adminEmail]);

  // ------------------------------------------------------------
  // Server

  // Returns a votable in the format expected by the server
  function getVotable() {
    const { candidatesString, votersString } = convertData(candidates, voters);

    return {
      candidates: candidatesString,
      name: title,
      voters: votersString,
      expiration: votableExpiration ? votableExpiration.toISOString() : "",
      adminEmail: adminEmail,
    };
  }

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
  const [votableResponse, setVotableResponse] = useState({});

  function publishToServer(e) {
    e.preventDefault();
    setLoading(true);

    const instance = axios.create({
      baseURL: process.env.REACT_APP_SERVER_ADDRESS,
    });

    // all these state sets should be getting batched with useReducer()
    instance
      .post("/votables", getVotable())
      .then(function (response) {
        setVotableResponse(response);
        setLoading(false);
        setSuccess(true);
        // reset all states
        setTitle("");
        setAdminEmail("");
        setVotableExpiration(new Date());
        setCandidates([]);
        setVoters([]);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        setError({ state: true, response: error });
      });
  }

  // ------------------------------------------------------------
  // UI
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
      votableData={votableResponse}
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
        <Grid item sx={{ mt: 1 }}>
          <Typography variant="h1">Create a votable!</Typography>
        </Grid>
        <Grid item>
          <TextInput
            currentText={title}
            setCurrentText={setTitle}
            helperText="What's being voted on?"
            label="Title"
          />
        </Grid>
        <Grid item>
          <TextInput
            currentText={adminEmail}
            setCurrentText={setAdminEmail}
            helperText="Where do you want the confirmation email sent?"
            label="Administrator Email"
          />
        </Grid>
        <Grid item sx={{ mt: 1 }}>
          <VotableExpiration
            votableExpiration={votableExpiration}
            handleExpirationChange={setVotableExpiration}
          />
        </Grid>
        <Grid item>
          <Typography variant="h2">Candidates</Typography>
          <NameList people={candidates} />
          <Candidate addCandidate={addCandidate} />
        </Grid>
        <Grid item>
          <Typography variant="h2">Voters</Typography>
          <VotersList voters={voters} />
          <Voter addVoter={addVoter} />
        </Grid>
        <Grid item>
          {votableConfirmation}
          <LoadingButton
            fullWidth
            onClick={publishToServer}
            loading={loading}
            variant="contained"
            loadingIndicator="Submitting..."
            disabled={!submitEnabled}
            sx={{ mt: 4, fontSize: 25 }}
          >
            Submit
          </LoadingButton>
          {error.state && (
            <Error state={error.state} response={error.response} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
