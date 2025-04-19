import React, { useState, useEffect } from "react";
import { MantineProvider, Table, Button, Text, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { deleteIndentRoute, draftViewRoute } from "../../routes/purchaseRoutes";

function SavedIndentsTable() {
  const [indents, setIndents] = useState([]); // State for indents data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  const username = useSelector((state) => state.user.roll_no);
  const [department, setDepartment] = useState("");
  console.log(useSelector((state) => state.user));
  // console.log(useSelector((state) => state.user));
  const fetchIndents = async () => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage after login
      // const holdsDesignationId = localStorage.getItem("holdsDesignationId"); // Get the HoldsDesignation ID

      const response = await axios.get(
        draftViewRoute(username), // Use dynamic HoldsDesignation ID
        {
          headers: {
            Authorization: `Token ${token}`, // Add the token in Authorization header
          },
        },
      );
      setIndents(response.data.files); // Set the fetched data to indents state
      setDepartment(response.data.department);
      setLoading(false); // Stop loading once data is fetched
    } catch (err) {
      setError("Failed to fetch indents."); // Handle errors
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch indents from the server using HoldsDesignation ID from local storage

    fetchIndents(); // Call the function to fetch indents
  }, []); // Empty dependency array to run effect on mount
  console.log(indents);

  const remove_indent = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        deleteIndentRoute,
        {
          file_id: id,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      fetchIndents();
    } catch (err) {
      console.error(
        "Error removing indent:",
        err.response?.data || err.message,
      );
    }
  };

  if (loading) {
    return <Text>Loading...</Text>; // Display loading state
  }

  if (error) {
    return <Text color="red">{error}</Text>; // Display error message
  }

  return (
    <Box p="md" style={{ margin: 0 }}>
      <Box
        mb="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          size="26px"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#1881d9",
          }}
        >
          All Saved Indents
        </Text>
      </Box>
      <Table
        style={{
          backgroundColor: "#f3f9ff",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #E0E0E0",
        }}
      >
        <thead>
          <tr>
            <th style={{ backgroundColor: "white", padding: "12px" }}>
              Created By
            </th>
            <th style={{ backgroundColor: "white", padding: "12px" }}>
              File ID
            </th>
            <th style={{ backgroundColor: "white", padding: "12px" }}>
              Subject
            </th>
            <th style={{ backgroundColor: "white", padding: "12px" }}>Date</th>
            <th style={{ backgroundColor: "white", padding: "12px" }}>
              Features
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {indents.map((booking, index) =>
            index % 2 === 0 ? (
              <tr key={booking.id} style={{ backgroundColor: "#f8fafb" }}>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  <Text weight={500}>{booking.name}</Text>
                  <Text size="sm">
                    {booking.uploader} - {role}
                  </Text>
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {department}&nbsp;#{booking.id}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {booking.subject ? booking.subject : "None"}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {booking.upload_date}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  <Button
                    color="green"
                    style={{ marginRight: "8px" }}
                    onClick={() =>
                      navigate(`/purchase/viewsavedindent/${booking.id}`)
                    }
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => remove_indent(booking.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ) : (
              <tr key={booking.id} style={{ backgroundColor: "white" }}>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  <Text weight={500}>{booking.name}</Text>
                  <Text size="sm">
                    {booking.uploader} - {role}
                  </Text>
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {department}&nbsp;#{booking.id}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {booking.subject ? booking.subject : "None"}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {booking.upload_date}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  <Button
                    color="green"
                    style={{ marginRight: "8px" }}
                    onClick={() =>
                      navigate(`/purchase/viewsavedindent/${booking.id}`)
                    }
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => remove_indent(booking.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ),
          )} */}
          {indents && indents.length > 0 ? (
            indents.map((booking, index) => (
              <tr
                key={booking.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f8fafb" : "white",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  <Text weight={500}>{booking.name}</Text>
                  <Text size="sm">
                    {booking.uploader} - {role}
                  </Text>
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {department}&nbsp;#{booking.id}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {booking.subject ? booking.subject : "None"}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  {booking.upload_date}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #E0E0E0",
                    textAlign: "center",
                  }}
                >
                  <Button
                    color="green"
                    style={{ marginRight: "8px" }}
                    onClick={() =>
                      navigate(`/purchase/viewsavedindent/${booking.id}`)
                    }
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    color="red"
                    onClick={() => remove_indent(booking.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "24px",
                  color: "black",
                  fontSize: "16px",
                }}
              >
                <strong>No saved indents yet</strong>
                <div
                  style={{ marginTop: "4px", fontSize: "14px", color: "black" }}
                >
                  Start by creating one to see it listed here.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Box>
  );
}

function SavedIndents() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          overflow: "auto",
        }}
      >
        <Box
          style={{
            maxWidth: "1440px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <SavedIndentsTable />
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default SavedIndents;
