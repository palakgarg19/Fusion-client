import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Container, FileInput } from "@mantine/core";
import PropTypes from "prop-types";
import "./GymkhanaForms.css";

function BudgetApprovalForm() {
  // Set up the form with initial values and validation
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      pdf: null,
    },

    validate: {
      title: (value) =>
        value.length < 2 ? "Title must have at least 2 letters" : null,
      description: (value) =>
        value.length === 0 ? "Description cannot be empty" : null,
      pdf: (value) => (!value ? "You must attach a PDF" : null),
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
          placeholder="Enter budget title"
          value={form.values.title}
          onChange={(event) =>
            form.setFieldValue("title", event.currentTarget.value)
          }
          error={form.errors.title}
          withAsterisk
        />

        {/* Description */}
        <TextInput
          label="Description"
          placeholder="Enter the budget description"
          value={form.values.description}
          onChange={(event) =>
            form.setFieldValue("description", event.currentTarget.value)
          }
          error={form.errors.description}
          withAsterisk
        />

        {/* PDF Upload */}
        <FileInput
          label="Attach PDF"
          placeholder="Upload your budget PDF"
          value={form.values.pdf}
          onChange={(file) => form.setFieldValue("pdf", file)}
          error={form.errors.pdf}
          accept=".pdf"
          withAsterisk
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

export { BudgetApprovalForm };

function BudgetForm({ clubName }) {
  return (
    <Container>
      <h2 className="club-header">Submit {clubName}'s Budget Proposal</h2>
      <BudgetApprovalForm />
    </Container>
  );
}

BudgetForm.propTypes = {
  clubName: PropTypes.string.isRequired,
};

export default BudgetForm;
