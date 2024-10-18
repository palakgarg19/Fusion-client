import "@mantine/core/styles.css";
import "@mantine/dates/styles.css"; // if using mantine date picker features
import "mantine-react-table/styles.css"; // make sure MRT styles were imported in your app root (once)
import React, { useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  ActionIcon,
  Flex,
  Stack,
  Text,
  Input,
  Tooltip,
  Modal,
  Box,
  Button,
  CloseButton,
  Group,
  Alert,
  Divider,
  Pill,
  ScrollArea,
} from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  rejectEventButton,
  modifyEventButton,
  useGetUpcomingEvents,
  useGetCommentsEventInfo,
  approveFICEventButton,
  approveCounsellorEventButton,
  approveDeanEventButton,
} from "./BackendLogic/ApiRoutes";
import { IconBase } from "@phosphor-icons/react";

const token = localStorage.getItem("authToken");

function EventApprovals({ clubName }) {
  const user = useSelector((state) => state.user);
  const userRole = user.role;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [validationErrors] = useState({});
  const [commentValue, setCommentValue] = useState("");
  const { data: commentsData } = useGetCommentsEventInfo(selectedEvent?.id);
  const columns = useMemo(
    () => [
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "event_name",
        header: "Event Title",
      },
      {
        accessorKey: "start_date",
        header: "Date",
      },
    ],
    [validationErrors],
  );

  const {
    data: fetchedEvents = [],
    isError: isLoadingEventsError,
    isFetching: isFetchingEvents,
    isLoading: isLoadingEvents,
  } = useGetUpcomingEvents(clubName);

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

        <Pill
          bg={
            row.original.status === "ACCEPT"
              ? "green"
              : row.original.status === "REJECT"
                ? "red"
                : "yellow"
          }
        >
          {row.original.status}
        </Pill>

        {row.original.status === "COORDINATOR" && (
          <Tooltip label="Edit">
            <ActionIcon
              color="blue"
              onClick={() => {
                // TODO: Implement Looooogic for this
              }}
            >
              <IconBase />
            </ActionIcon>
          </Tooltip>
        )}
      </Flex>
    ),
    state: {
      isLoading: isLoadingEvents,
      showAlertBanner: isLoadingEventsError,
      showProgressBars: isFetchingEvents,
    },
  });
  const mutation = useMutation({
    mutationFn: (commentData) => {
      console.log(commentData);
      return axios.post(
        "http://localhost:8000/gymkhana/api/create_event_comment/",
        {
          event_id: commentData.selectedEvent.id,
          commentator_designation: commentData.userRole,
          comment: commentData.commentValue,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
    },
  });
  const handleCommentSubmit = (values) => {
    mutation.mutate(values, {
      onSuccess: (response) => {
        // Handle success (you can redirect or show a success message)
        console.log("Successfully comment posted!!!", response.data);
        alert("Successfully comment posted!!!");
      },
      onError: (error) => {
        // Handle error (you can show an error message)
        console.error("Error during posting comment", error);
        alert("Error during posting comment");
      },
    });
  };
  const approveFICMutation = useMutation({
    mutationFn: (eventId) => {
      approveFICEventButton(eventId);
    },
    onSuccess: () => {
      // Handle what happens after approval, e.g., close the form
      alert("Approved by FIC");
      closeViewModal();
    },
  });
  const approveCounsellorMutation = useMutation({
    mutationFn: (eventId) => approveCounsellorEventButton(eventId),
    onSuccess: () => {
      // Handle what happens after approval, e.g., close the form
      alert("Approved by Counsellor");
      closeViewModal();
    },
  });
  const approveDeanMutation = useMutation({
    mutationFn: (eventId) => approveDeanEventButton(eventId),
    onSuccess: () => {
      // Handle what happens after approval, e.g., close the form
      alert("Approved by Dean Student");
      closeViewModal();
    },
  });

  // Mutation for reject
  const rejectMutation = useMutation({
    mutationFn: (eventId) => rejectEventButton(eventId),
    onSuccess: () => {
      // Handle what happens after rejection
      alert("Rejected the event");
      closeViewModal();
    },
  });

  // Mutation for modify
  const modifyMutation = useMutation({
    mutationFn: (eventId) => modifyEventButton(eventId),
    onSuccess: () => {
      // Handle what happens after modification
      closeViewModal();
    },
  });

  const handleFICApproveButton = (eventId) => {
    approveFICMutation.mutate(eventId);
  };
  const handleCounsellorApproveButton = (eventId) => {
    approveCounsellorMutation.mutate(eventId);
  };
  const handleDeanApproveButton = (eventId) => {
    approveDeanMutation.mutate(eventId);
  };

  const handleRejectButton = (eventId) => {
    rejectMutation.mutate(eventId);
  };
  const handleModifyButton = (eventId) => {
    modifyMutation.mutate(eventId);
  };

  return (
    <>
      <MantineReactTable table={table} />
      <Modal opened={!!selectedEvent} onClose={closeViewModal} w="40%">
        {/* View Content  */}
        {selectedEvent && (
          <Stack
            spacing="md"
            sx={{
              width: "40%", // Modal spans 40% of the screen
              padding: "20px",
              border: "1px solid #dfe1e5",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            }}
          >
            <Box>
              <Stack spacing="xs">
                <Text
                  size="lg"
                  style={{ fontWeight: 900 }}
                  align="center"
                  mb="xs"
                >
                  {selectedEvent.event_name}
                </Text>
                <Text size="sm" weight={700}>
                  <span style={{ fontWeight: 900, fontSize: "16px" }}>
                    Date Range:
                  </span>
                  {selectedEvent.start_date} - {selectedEvent.end_date}
                </Text>
                <Text size="sm" weight={700}>
                  <span style={{ fontWeight: 900, fontSize: "16px" }}>
                    Venue:
                  </span>
                  {selectedEvent.venue}
                </Text>
                <Text size="sm" weight={700}>
                  <span style={{ fontWeight: 900, fontSize: "16px" }}>
                    Description:
                  </span>{" "}
                  {selectedEvent.details}
                </Text>
              </Stack>

              <Divider my="sm" />

              <Box>
                <Stack>
                  <Text size="md" weight={700}>
                    Comments:
                  </Text>
                  <ScrollArea h={250}>
                    {commentsData?.map((comment) => (
                      <Box
                        key={comment.event_index}
                        my="sm"
                        style={{
                          border: "solid 2px black",
                          borderRadius: "5px",
                          padding: "2px",
                        }}
                      >
                        <Pill weight={900} size="md" c="blue" mb="5px">
                          {comment.commentator_designation}
                        </Pill>
                        <Text size="sm" p="2px" radius="lg">
                          {comment.comment}{" "}
                        </Text>
                        <Group justify="end">
                          <Pill>{comment.comment_date}</Pill>
                          <Pill>{comment.comment_time}</Pill>
                        </Group>
                      </Box>
                    ))}
                  </ScrollArea>

                  <Group position="apart" align="center">
                    <Input
                      placeholder="Add a comment"
                      value={commentValue}
                      onChange={(event) =>
                        setCommentValue(event.currentTarget.value)
                      }
                      w="290px"
                      rightSection={
                        <CloseButton
                          aria-label="Clear input"
                          onClick={() => setCommentValue("")}
                          style={{
                            display: commentValue ? undefined : "none",
                          }}
                        />
                      }
                    />
                    <Button
                      onClick={() => {
                        const objectComment = {
                          userRole,
                          commentValue,
                          selectedEvent,
                        };
                        handleCommentSubmit(objectComment);
                      }}
                      color="blue"
                    >
                      Submit
                    </Button>
                  </Group>
                </Stack>
              </Box>

              {(userRole === "FIC" ||
                userRole === "Dean" ||
                userRole === "Counsellor" ||
                userRole === "Professor") && (
                <Box mt="md">
                  <Group>
                    {(userRole === "FIC" || userRole === "Professor") && (
                      <Button
                        color="blue"
                        onClick={() => {
                          handleFICApproveButton(selectedEvent.id);
                        }}
                      >
                        FIC Approve
                      </Button>
                    )}
                    {userRole === "Dean" && (
                      <Button
                        color="blue"
                        onClick={() => {
                          handleDeanApproveButton(selectedEvent.id);
                        }}
                      >
                        Dean Approve
                      </Button>
                    )}
                    {userRole === "Counsellor" && (
                      <Button
                        color="blue"
                        onClick={() => {
                          handleCounsellorApproveButton(selectedEvent.id);
                        }}
                      >
                        Counsellor Approve
                      </Button>
                    )}
                    <Button color="red" onClick={handleRejectButton}>
                      Reject
                    </Button>
                    <Button color="yellow" onClick={handleModifyButton}>
                      Modify
                    </Button>
                  </Group>
                </Box>
              )}
            </Box>

            {(userRole === "FIC" ||
              userRole === "Dean" ||
              userRole === "Counsellor" ||
              userRole === "Professor") && (
              <Box mt="md">
                <Group jsutify="center">
                  {(userRole === "FIC" || userRole === "Professor") && (
                    <Button
                      color="blue"
                      onClick={() => {
                        handleFICApproveButton(selectedEvent.id);
                      }}
                    >
                      FIC Approve
                    </Button>
                  )}
                  {userRole === "Dean" && (
                    <Button
                      color="blue"
                      onClick={() => {
                        handleDeanApproveButton(selectedEvent.id);
                      }}
                    >
                      Dean Approve
                    </Button>
                  )}
                  {userRole === "Counsellor" && (
                    <Button
                      color="blue"
                      onClick={() => {
                        handleCounsellorApproveButton(selectedEvent.id);
                      }}
                    >
                      Counsellor Approve
                    </Button>
                  )}
                  <Button color="red" onClick={handleRejectButton}>
                    Reject
                  </Button>
                  <Button color="yellow" onClick={handleModifyButton}>
                    Modify
                  </Button>
                </Group>
              </Box>
            )}
          </Stack>
        )}
      </Modal>
    </>
  );
}

function EventApprovalsWithProviders({ clubName }) {
  return <EventApprovals clubName={clubName} />;
}
EventApprovalsWithProviders.propTypes = {
  clubName: PropTypes.string,
};
EventApprovals.propTypes = {
  clubName: PropTypes.string,
};

export default EventApprovalsWithProviders;
