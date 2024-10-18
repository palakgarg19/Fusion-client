import React, { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Group,
  Container,
  Alert,
  Modal,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "./GymkhanaForms.css";

const token = localStorage.getItem("authToken");

function EventsApprovalForm({ clubName }) {
  console.log(clubName);

  // State for success, error messages, and modal visibility
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Set up the form with initial values and validation
  const form = useForm({
    initialValues: {
      event_name: "",
      venue: "",
      incharge: "",
      end_date: "",
      start_time: "",
      end_time: "",
      event_poster: "",
      details: "",
      club: clubName,
      start_date: "",
      status: "",
    },
    validate: {
      event_name: (value) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
      venue: (value) => (value.length === 0 ? "Venue cannot be empty" : null),
      incharge: (value) =>
        value.length === 0 ? "Incharge cannot be empty" : null,
      end_date: (value) =>
        value.length === 0 ? "End date cannot be empty" : null,
      start_time: (value) =>
        value.length === 0 ? "Start time cannot be empty" : null,
      end_time: (value) =>
        value.length === 0 ? "End time cannot be empty" : null,
      event_poster: (value) =>
        value.length === 0 ? "Event poster cannot be empty" : null,
      details: (value) =>
        value.length === 0 ? "Details cannot be empty" : null,
      start_date: (value) =>
        value.length === 0 ? "Start date cannot be empty" : null,
    },
  });

  // Mutation setup for submitting the form data via API
  const mutation = useMutation({
    mutationFn: (newEventData) => {
      return axios.put(
        "http://127.0.0.1:8000/gymkhana/api/new_event/",
        newEventData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }, // Replace with your actual API endpoint
      );
    },
    onSuccess: (response) => {
      console.log("Successfully registered:", response.data);
      setSuccessMessage("Event registered successfully!");
      setIsModalOpen(true); // Show the modal
      form.reset(); // Clear the form data after submission
    },
    onError: (error) => {
      console.error("Error during registration:", error);
      setErrorMessage("Registration failed. Please try again.");
    },
  });

  // Submit handler
  const handleSubmit = (values) => {
    // Perform form submission
    mutation.mutate(values);
  };

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleSubmit)} className="club-form">
        {/* Success Message */}
        {successMessage && (
          <Alert title="Success" color="green" mt="md">
            {successMessage}
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert title="Error" color="red" mt="md">
            {errorMessage}
          </Alert>
        )}

        {/* Event Name */}
        <TextInput
          label="Event Name"
          placeholder="Enter event name"
          value={form.values.event_name}
          onChange={(event) =>
            form.setFieldValue("event_name", event.currentTarget.value)
          }
          error={form.errors.event_name}
          withAsterisk
        />

        {/* Details */}
        <TextInput
          label="Details"
          placeholder="Enter the event details"
          value={form.values.details}
          onChange={(event) =>
            form.setFieldValue("details", event.currentTarget.value)
          }
          error={form.errors.details}
          withAsterisk
        />

        {/* Venue */}
        <TextInput
          label="Venue"
          placeholder="Enter the venue"
          value={form.values.venue}
          onChange={(event) =>
            form.setFieldValue("venue", event.currentTarget.value)
          }
          error={form.errors.venue}
          withAsterisk
        />

        {/* Incharge */}
        <TextInput
          label="Incharge"
          placeholder="Incharge"
          value={form.values.incharge}
          onChange={(event) =>
            form.setFieldValue("incharge", event.currentTarget.value)
          }
          error={form.errors.incharge}
          withAsterisk
        />

        {/* Start Date */}
        <TextInput
          label="Start Date"
          placeholder="Enter the start date (e.g., YYYY-MM-DD)"
          value={form.values.start_date}
          onChange={(event) =>
            form.setFieldValue("start_date", event.currentTarget.value)
          }
          error={form.errors.start_date}
          withAsterisk
        />

        {/* End Date */}
        <TextInput
          label="End Date"
          placeholder="Enter the end date (e.g., YYYY-MM-DD)"
          value={form.values.end_date}
          onChange={(event) =>
            form.setFieldValue("end_date", event.currentTarget.value)
          }
          error={form.errors.end_date}
          withAsterisk
        />

        {/* Start Time */}
        <TextInput
          label="Start Time"
          placeholder="Enter start time of the event"
          value={form.values.start_time}
          onChange={(event) =>
            form.setFieldValue("start_time", event.currentTarget.value)
          }
          error={form.errors.start_time}
          withAsterisk
        />

        {/* End Time */}
        <TextInput
          label="End Time"
          placeholder="Enter end time of the event"
          value={form.values.end_time}
          onChange={(event) =>
            form.setFieldValue("end_time", event.currentTarget.value)
          }
          error={form.errors.end_time}
          withAsterisk
        />

        {/* Event Poster */}
        <TextInput
          label="Event Poster"
          placeholder="Event Poster"
          value={form.values.event_poster}
          onChange={(event) =>
            form.setFieldValue("event_poster", event.currentTarget.value)
          }
          error={form.errors.event_poster}
          withAsterisk
        />

        {/* Submit Button */}
        <Group position="center" mt="md">
          {token && (
            <Button type="submit" className="submit-btn">
              Submit
            </Button>
          )}
        </Group>
      </form>

      {/* Modal for successful submission */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Success!"
      >
        <p>Your event has been successfully submitted!</p>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </Modal>
    </Container>
  );
}

export { EventsApprovalForm };

function EventForm({ clubName }) {
  return (
    <Container>
      <h2 className="club-header">Apply for {clubName}'s Event !!!</h2>
      <EventsApprovalForm clubName={clubName} />
    </Container>
  );
}

EventForm.propTypes = {
  clubName: PropTypes.string.isRequired,
};

export default EventForm;
