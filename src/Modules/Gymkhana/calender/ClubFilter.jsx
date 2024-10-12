import { Select } from "@mantine/core";

function ClubFilter({ selectedClub, setSelectedClub }) {
  return (
    <Select
      value={selectedClub}
      onChange={setSelectedClub}
      data={[
        { value: "All Clubs", label: "All Clubs" },
        { value: "TPC", label: "TPC" },
        { value: "AFC", label: "AFC" },
        { value: "BMC", label: "BMC" },
        { value: "E-Cell", label: "E-Cell" },
      ]}
      placeholder="Filter by Club"
      style={{
        marginBottom: "20px",
        paddingLeft: "50px",
        paddingBottom: "-30px",
      }}
    />
  );
}

export default ClubFilter;
