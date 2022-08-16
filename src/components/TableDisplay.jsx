import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableDisplay({ array }) {
  const mostToLeast = array.sort((a, b) => a.votes - b.votes).reverse();

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mostToLeast.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.candidateName}</TableCell>
              <TableCell>{row.votes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// import { DataGrid } from "@mui/x-data-grid";

// export default function TableDisplay({ array }) {
//   const columns = [
//     {
//       field: "name",
//       headerName: "Candidate Name",
//       width: 200,
//     },
//     {
//       field: "votes",
//       headerName: "Votes",
//       type: "number",
//       width: 50,
//     },
//   ];
//   return <DataGrid density="comfortable" rows={array} columns={columns} />;
// }
