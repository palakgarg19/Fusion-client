import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; // if using mantine date picker features
import "mantine-react-table/styles.css"; // make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useGetClubMembers } from "./BackendLogic/ApiRoutes";

function CoordinatorMembers({ clubName }) {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "club", // Key in your data object
        header: "Club", // Column header name
      },
      {
        accessorKey: "description",
        header: "Description",
      },

      {
        accessorKey: "member",
        header: "Member",
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    [validationErrors],
  );

  const {
    data: fetchedEvents = [],
    isError: isLoadingEventsError,
    isFetching: isFetchingEvents,
    isLoading: isLoadingEvents,
  } = useGetClubMembers(clubName);
  console.log(fetchedEvents, clubName);
  const table = useMantineReactTable({
    columns,
    data: fetchedEvents,
    enableEditing: true,
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: isLoadingEventsError
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,
    renderRowActions: ({ row }) => (
      <Flex gap="md">
        <Tooltip label="Delete">
          <ActionIcon
            color="red"
            onClick={() => {
              /* Implement delete logic */
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    state: {
      isLoading: isLoadingEvents,
      showAlertBanner: isLoadingEventsError,
      showProgressBars: isFetchingEvents,
    },
  });

  return <MantineReactTable table={table} />;
}

function CoordinatorMembersWithProviders({ clubName }) {
  return <CoordinatorMembers clubName={clubName} />;
}
CoordinatorMembersWithProviders.propTypes = {
  clubName: PropTypes.string,
};
CoordinatorMembers.propTypes = {
  clubName: PropTypes.string,
};

export default CoordinatorMembersWithProviders;
