import { DataGrid } from "@mui/x-data-grid";

export default function TableDisplay({ array }) {
  const columns = [
    {
      field: "name",
      headerName: "Candidate Name",
      width: 200,
    },
    {
      field: "votes",
      headerName: "Votes",
      type: "number",
      width: 50,
    },
  ];
  return <DataGrid density="comfortable" rows={array} columns={columns} />;
}
