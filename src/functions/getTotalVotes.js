import axios from "axios";

export default function getTotalVotes(votableID) {
  //   function candidateVotes(candidateArray) {}

  const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ADDRESS,
  });

  return instance
    .get(`/votables/${votableID}/tally`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
