// import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; // if using mantine date picker features
import "mantine-react-table/styles.css"; // make sure MRT styles were imported in your app root (once)
import { useMemo, useState } from "react";
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import {
  ActionIcon,
  Button,
  Flex,
  Stack,
  Text,
  Title,
  Tooltip,
  Modal,
} from "@mantine/core";
import { ModalsProvider, modals } from "@mantine/modals";
import { IconEye, IconTrash } from "@tabler/icons-react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fakeEventData } from "./makeData"; // Assume this is your new data source for events

function EventApprovals() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "eventName",
        header: "Event Name",
        mantineEditTextInputProps: {
          required: true,
          error: validationErrors?.eventName,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              eventName: undefined,
            }),
        },
      },
      {
        accessorKey: "date",
        header: "Date",
        mantineEditTextInputProps: {
          required: true,
          error: validationErrors?.date,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              date: undefined,
            }),
        },
      },
      {
        accessorKey: "venue",
        header: "Venue",
        mantineEditTextInputProps: {
          required: true,
          error: validationErrors?.venue,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              venue: undefined,
            }),
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        mantineEditTextInputProps: {
          required: true,
          error: validationErrors?.status,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              status: undefined,
            }),
        },
      },
      {
        accessorKey: "softCopyLink",
        header: "Soft Copy Link",
        mantineEditTextInputProps: {
          required: true,
          error: validationErrors?.softCopyLink,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              softCopyLink: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );

  function useGetEvents() {
    return useQuery({
      queryKey: ["events"],
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return Promise.resolve(fakeEventData);
      },
      refetchOnWindowFocus: false,
    });
  }

  const {
    data: fetchedEvents = [],
    isError: isLoadingEventsError,
    isFetching: isFetchingEvents,
    isLoading: isLoadingEvents,
  } = useGetEvents();

  const openViewModal = (event) => {
    setSelectedEvent(event);
  };

  const closeViewModal = () => {
    setSelectedEvent(null);
  };

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
        <Tooltip label="View">
          <ActionIcon onClick={() => openViewModal(row.original)}>
            <IconEye />
          </ActionIcon>
        </Tooltip>
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

  return (
    <>
      <MantineReactTable table={table} />
      <Modal
        opened={!!selectedEvent}
        onClose={closeViewModal}
        title="Event Details"
      >
        {selectedEvent && (
          <Stack>
            <Text>
              <strong>Event Name:</strong> {selectedEvent.eventName}
            </Text>
            <Text>
              <strong>Date:</strong> {selectedEvent.date}
            </Text>
            <Text>
              <strong>Venue:</strong> {selectedEvent.venue}
            </Text>
            <Text>
              <strong>Status:</strong> {selectedEvent.status}
            </Text>
            <Text>
              <strong>Soft Copy Link:</strong>{" "}
              <a
                href={selectedEvent.softCopyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedEvent.softCopyLink}
              </a>
            </Text>
          </Stack>
        )}
      </Modal>
    </>
  );
}

const queryClient = new QueryClient();

function EventApprovalsWithProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalsProvider>
        <EventApprovals />
      </ModalsProvider>
    </QueryClientProvider>
  );
}

export default EventApprovalsWithProviders;
