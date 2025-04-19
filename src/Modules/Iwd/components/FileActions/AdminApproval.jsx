import { useState, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Loader,
  Button,
  Flex,
  Center,
  FileInput,
  Textarea,
  Select,
  CheckIcon,
} from "@mantine/core";

import { DesignationsContext } from "../../helper/designationContext";
import classes from "../../iwd.module.css";
import { HandleAdminApproval } from "../../handlers/handlers";

function AdminApproval({ form, request, handleBackToList }) {
  console.log("In admin approval");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const role = useSelector((state) => state.user.role);
  const designations = useContext(DesignationsContext);
  const designationsList = useMemo(
    () =>
      designations.map(
        (designation) =>
          `${designation.designation.name}|${designation.username}`,
      ),
    [designations],
  );
  return (
    /* eslint-disable react/jsx-props-no-spreading */

    <form>
      <Flex gap="xs">
        <FileInput
          label="Upload your file"
          placeholder="Choose a file"
          key={form.key("file")}
          my="sm"
          {...form.getInputProps("file")}
        />
      </Flex>
      <Flex direction="column" gap="xl">
        <Textarea
          placeholder="Remarks"
          variant="filled"
          mt="sm"
          style={{ width: "100%" }}
          key={form.key("remarks")}
          {...form.getInputProps("remarks")}
          backgroundColor="#efefef"
          cols={50}
          rows={3}
        />
        <Flex direction="column" gap="xs" justify="flex-start">
          <Select
            mb="sm"
            comboboxProps={{ withinPortal: true }}
            data={designationsList}
            placeholder="IWD Admin"
            label="designation"
            classNames={classes}
            key={form.key("designation")}
            {...form.getInputProps("designation")}
            required
            searchable
            clearable
          />
        </Flex>
      </Flex>
      <Flex gap="xs" my="10px">
        <Button
          size="sm"
          variant="filled"
          color="black"
          type="submit"
          style={{
            width: "auto",
            backgroundColor: "#1E90FF",
            color: isSuccess ? "black" : "white",
            border: "none",
            borderRadius: "20px",
          }}
          disabled={isLoading || isSuccess}
          onClick={() => {
            HandleAdminApproval({
              form,
              request,
              setIsLoading,
              setIsSuccess,
              handleBackToList,
              action: "approve",
              role,
            });
          }}
        >
          {isLoading ? (
            <Center>
              <Loader color="black" size="xs" />
            </Center>
          ) : isSuccess ? (
            <Center>
              <CheckIcon size="16px" color="black" />
            </Center>
          ) : (
            "Approve File"
          )}
        </Button>
        <Button
          size="sm"
          variant="filled"
          color="black"
          type="submit"
          style={{
            width: "auto",
            backgroundColor: "#1E90FF",
            color: isSuccess ? "black" : "white",
            border: "none",
            borderRadius: "20px",
          }}
          disabled={isLoading || isSuccess}
          onClick={() => {
            HandleAdminApproval({
              form,
              request,
              setIsLoading,
              setIsSuccess,
              handleBackToList,
              action: "reject",
              role,
            });
          }}
        >
          {isLoading ? (
            <Center>
              <Loader color="black" size="xs" />
            </Center>
          ) : isSuccess ? (
            <Center>
              <CheckIcon size="16px" color="black" />
            </Center>
          ) : (
            "Reject File"
          )}
        </Button>
      </Flex>
    </form>
    /* eslint-enable react/jsx-props-no-spreading */
  );
}
AdminApproval.propTypes = {
  form: PropTypes.isRequired,
  handleBackToList: PropTypes.func.isRequired,
  request: PropTypes.isRequired,
};

export default AdminApproval;
