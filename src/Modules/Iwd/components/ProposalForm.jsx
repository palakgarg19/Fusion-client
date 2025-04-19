/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import {
  Container,
  Paper,
  TextInput,
  Textarea,
  Button,
  Flex,
  Title,
  Loader,
  Center,
  FileInput,
  Divider,
  Select,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import classes from "../iwd.module.css";
import { DesignationsContext } from "../helper/designationContext";
import { HandleProposalSubmission } from "../handlers/handlers";

function CreateProposalForm({ onBack, request_id, submitter, proposalType }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const designations = useContext(DesignationsContext);
  const designationsList = useMemo(
    () =>
      designations.map(
        (designation) =>
          `${designation.designation.name}|${designation.username}`,
      ),
    [designations],
  );
  // Fetch current role from Redux store.
  const currentRole = useSelector((state) => state.user.role);

  const form = useForm({
    initialValues: {
      id: request_id,
      supporting_documents: null,
      designation: "",
      items: [
        {
          name: "",
          description: "",
          unit: "",
          price_per_unit: "",
          quantity: "",
          docs: null,
        },
      ],
      status: "Pending",
      role: currentRole || "",
    },

    validate: (values) => {
      const errors = {};
      values.items.forEach((item, index) => {
        if (!item.name.trim())
          errors[`items.${index}.name`] = "Name is required";
        if (!item.description.trim())
          errors[`items.${index}.description`] = "Description is required";
        if (!item.unit.trim())
          errors[`items.${index}.unit`] = "Unit is required";
        if (!item.price_per_unit || isNaN(Number(item.price_per_unit)))
          errors[`items.${index}.price_per_unit`] = "Valid price is required";
        if (!item.quantity || isNaN(Number(item.quantity)))
          errors[`items.${index}.quantity`] = "Valid quantity is required";
      });
      return errors;
    },
  });

  const fields = form.values.items.map((_, index) => (
    <div key={index} style={{ position: "relative", marginBottom: 20 }}>
      {index > 0 && (
        <Button
          variant="light"
          color="red"
          size="sm"
          style={{ position: "absolute", top: -10, right: 0 }}
          onClick={() => form.removeListItem("items", index)}
        >
          Remove
        </Button>
      )}
      <Title order={4} mt={index > 0 ? "xl" : "md"} mb="sm">
        Item {index + 1}
      </Title>
      <TextInput
        label="Name"
        required
        placeholder="Enter item name"
        {...form.getInputProps(`items.${index}.name`)}
      />
      <Textarea
        label="Description"
        required
        placeholder="Item description"
        mt="sm"
        {...form.getInputProps(`items.${index}.description`)}
      />
      <Flex gap="md" mt="sm">
        <TextInput
          label="Unit"
          required
          placeholder="e.g., pcs, kg"
          {...form.getInputProps(`items.${index}.unit`)}
        />
        <TextInput
          label="Price Per Unit"
          required
          type="number"
          placeholder="0.00"
          {...form.getInputProps(`items.${index}.price_per_unit`)}
        />
        <TextInput
          label="Quantity"
          required
          type="number"
          placeholder="0"
          {...form.getInputProps(`items.${index}.quantity`)}
        />
      </Flex>
      <FileInput
        label="Item Document (Optional)"
        mt="sm"
        {...form.getInputProps(`items.${index}.docs`)}
      />
      <Divider mt="xl" />
    </div>
  ));

  return (
    <Container>
      <Paper
        radius="md"
        px="lg"
        pb="xl"
        style={{
          width: isMobile ? "90vw" : "35vw",
          boxShadow: "none",
          paddingRight: isMobile ? "132px" : "0",
        }}
      >
        <Flex direction="column" gap="lg">
          <Title size={isMobile ? "22px" : "26px"} weight={700} pt="sm">
            Create New Proposal
          </Title>
          <form
            onSubmit={form.onSubmit((values) => {
              if (!values.designation.includes("|")) {
                alert(
                  "Invalid designation format! It should be 'Role|Username'.",
                );
                return;
              }

              const payload = {
                ...values,
                items: values.items.map((item) => ({
                  ...item,
                  docs: item.docs || "",
                })),
                supporting_documents: values.supporting_documents || "",
              };

              console.log(payload);
              if (form.validate(values)) {
                HandleProposalSubmission({
                  setIsLoading,
                  setIsSuccess,
                  submitter,
                  form,
                  proposalType,
                });
              }
            })}
          >
            <TextInput
              label="ID"
              required
              placeholder="Enter ID"
              {...form.getInputProps("id")}
              disabled
            />

            {fields}

            <Button
              variant="outline"
              fullWidth
              mt="md"
              onClick={() =>
                form.insertListItem("items", {
                  name: "",
                  description: "",
                  unit: "",
                  price_per_unit: "",
                  quantity: "",
                  docs: null,
                })
              }
            >
              Add Item
            </Button>
            <FileInput
              label="Supporting Documents (Optional)"
              placeholder="Choose a file"
              color="black"
              my="sm"
              {...form.getInputProps("supporting_documents")}
            />
            <Flex direction="column" gap="xs" justify="flex-start">
              <Select
                mt="md"
                comboboxProps={{ withinPortal: true }}
                data={designationsList}
                placeholder="Director(Dir)"
                label="Designation"
                classNames={classes}
                key={form.key("designation")}
                {...form.getInputProps("designation")}
                required
              />
            </Flex>
            <Flex gap="xs" mt="xl" direction={isMobile ? "column" : "row"}>
              <Button
                size="sm"
                variant="filled"
                color="blue"
                type="submit"
                style={{
                  width: isMobile ? "100%" : "100px",
                  borderRadius: "10px",
                  backgroundColor: "#1E90FF",
                  color: "white",
                }}
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <Center>
                    <Loader color="white" size="xs" />
                  </Center>
                ) : isSuccess ? (
                  <Center>
                    <span style={{ color: "white" }}>Success</span>
                  </Center>
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                size="sm"
                variant="light"
                color="gray"
                onClick={onBack}
                style={{
                  width: isMobile ? "100%" : "auto",
                  borderRadius: "20px",
                }}
                disabled={isLoading || isSuccess}
              >
                Back
              </Button>
            </Flex>
          </form>
        </Flex>
      </Paper>
    </Container>
  );
}

CreateProposalForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  request_id: PropTypes.number.isRequired,
  submitter: PropTypes.func.isRequired,
  proposalType: PropTypes.string.isRequired,
};

export default CreateProposalForm;
