import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Container } from "@mantine/core";
import PropTypes from "prop-types";
import "./GymkhanaForms.css";

function EventsApprovalForm() {
  // Set up the form with initial values and validation
  const form = useForm({
    initialValues: {
      title: "",
      date: "",
      time: "",
      venue: "",
      duration: "",
    },

    validate: {
      title: (value) =>
        value.length < 2 ? "Title name must have at least 2 letters" : null,
      date: (value) => (value.length === 0 ? "Date cannot be empty" : null),
      time: (value) => (value.length === 0 ? "Time cannot be empty" : null),
      venue: (value) => (value.length === 0 ? "Venue cannot be empty" : null),
    },
  });

  // Submit handler
  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
    // Add your submission logic here
  };

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleSubmit)} className="club-form">
        {/* Title */}
        <TextInput
          label="Title"
          placeholder="Enter event name"
          value={form.values.title}
          onChange={(event) =>
            form.setFieldValue("title", event.currentTarget.value)
          }
          error={form.errors.title}
          withAsterisk
        />

        {/* Date */}
        <TextInput
          label="Date"
          placeholder="Enter the date (e.g., YYYY-MM-DD)"
          value={form.values.date}
          onChange={(event) =>
            form.setFieldValue("date", event.currentTarget.value)
          }
          error={form.errors.date}
          withAsterisk
        />

        {/* Time */}
        <TextInput
          label="Time"
          placeholder="Enter time of the event"
          value={form.values.time}
          onChange={(event) =>
            form.setFieldValue("time", event.currentTarget.value)
          }
          error={form.errors.time}
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

        {/* Duration */}
        <TextInput
          label="Duration"
          placeholder="Enter the duration (e.g., 2 hours)"
          value={form.values.duration}
          onChange={(event) =>
            form.setFieldValue("duration", event.currentTarget.value)
          }
        />

        {/* Submit Button */}
        <Group position="center" mt="md">
          <Button type="submit" className="submit-btn">
            Submit
          </Button>
        </Group>
      </form>
    </Container>
  );
}

export { EventsApprovalForm };

function EventForm({ clubName }) {
  return (
    <Container>
      <h2 className="club-header">Apply for {clubName}'s Event !!!</h2>
      <EventsApprovalForm />
    </Container>
  );
}

EventForm.propTypes = {
  clubName: PropTypes.string.isRequired,
};

export default EventForm;
