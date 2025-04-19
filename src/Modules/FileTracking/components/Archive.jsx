import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  ActionIcon,
  Tooltip,
  Group,
  TextInput,
  Pagination,
  Text,
} from "@mantine/core";
import {
  ArrowArcLeft,
  Eye,
  CaretUp,
  CaretDown,
  ArrowsDownUp,
} from "@phosphor-icons/react";
import axios from "axios";
import { useSelector } from "react-redux";
import View from "./ViewFile";
import {
  getArchiveRoute,
  unArchiveRoute,
} from "../../../routes/filetrackingRoutes";

export default function ArchiveFiles() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 7;
  const token = localStorage.getItem("authToken");
  const role = useSelector((state) => state.user.role);
  const username = useSelector((state) => state.user.roll_no);
  let current_module = useSelector((state) => state.module.current_module);
  current_module = current_module.split(" ").join("").toLowerCase();
  const convertDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
  };
  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get(
          `${getArchiveRoute}`,

          {
            params: {
              username,
              designation: role,
              src_module: current_module,
            },
            withCredentials: true,
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setFiles(response.data);
        console.log("Archived Files: ", files);
        // Set the response data to the files state
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };

    // Call the getFiles function to fetch data on component mount
    getFiles();
  }, [role, username, token]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  const sortedFiles = [...files].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const direction = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.key] > b[sortConfig.key] ? direction : -direction;
  });

  const filteredFiles = sortedFiles.filter((file) => {
    const idString = `${file.branch}-${new Date(file.upload_date).getFullYear()}-${(new Date(file.upload_date).getMonth() + 1).toString().padStart(2, "0")}-#${file.id}`;
    return (
      idString.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.uploader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convertDate(file.upload_date)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredFiles.length);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleToggleArchive = async (fileID) => {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(
      `${unArchiveRoute}`,
      {
        file_id: fileID,
      },
      {
        params: {
          username,
          designation: role,
          src_module: current_module,
        },
        withCredentials: true,
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      },
    );
    const updatedFiles = files.filter((file) => file.id !== fileID);
    setFiles(updatedFiles); // Update state with the new file list
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  const tableStyles = {
    padding: "8px",
    textAlign: "center",
    border: "1px solid #ddd",
    height: "32px",
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        backgroundColor: "#F5F7F8",
        position: "absolute",
        height: "65vh",
        width: "90vw",
        display: "flex",
        flexDirection: "column",
        overflowY: selectedFile ? "auto" : "hidden",
      }}
    >
      {!selectedFile && (
        <Group position="apart" mb="md">
          <Title
            order={2}
            style={{
              fontSize: "24px",
            }}
          >
            Archived Files
          </Title>
          <TextInput
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={{ marginBottom: "10px", marginLeft: "auto" }}
          />
        </Group>
      )}

      {selectedFile ? (
        <div>
          <Title
            order={3}
            mb="md"
            style={{
              fontSize: "26px",
            }}
          >
            File Subject
          </Title>
          <View
            onBack={handleBack}
            fileID={selectedFile.id}
            updateFiles={() =>
              setFiles(files.filter((f) => f.id !== selectedFile.id))
            }
          />
        </div>
      ) : (
        <Box
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflowY: "hidden",
            height: "calc(53vh - 20px)",
            minHeight: "300px",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            marginBottom: 0,
          }}
        >
          <div style={{ flex: 1, overflowY: "hidden", marginBottom: "-1px" }}>
            <Table
              highlightOnHover
              style={{
                width: "100%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
                fontSize: "14px",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#fff",
                  zIndex: 1,
                }}
              >
                <tr style={{ backgroundColor: "#0000" }}>
                  <th style={{ ...tableStyles, width: "8%" }}>Unarchive</th>
                  {[
                    { key: "id", label: "File ID", width: "15%" },
                    { key: "uploader", label: "Uploader", width: "15%" },
                    { key: "subject", label: "Subject", width: "25%" },
                    { key: "upload_date", label: "Date", width: "15%" },
                  ].map(({ key, label, width }) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      style={{
                        cursor: "pointer",
                        ...tableStyles,
                        width,
                      }}
                    >
                      {label}
                      {sortConfig.key === key ? (
                        sortConfig.direction === "asc" ? (
                          <CaretUp size={16} />
                        ) : (
                          <CaretDown size={16} />
                        )
                      ) : (
                        <ArrowsDownUp size={16} opacity={0.6} />
                      )}
                    </th>
                  ))}
                  <th style={{ ...tableStyles, width: "7%" }}>View File</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage,
                  )
                  .map((file, index) => (
                    <tr key={index}>
                      <td style={tableStyles}>
                        <Tooltip
                          label={
                            file.archived ? "Unarchive file" : "Archive file"
                          }
                          position="top"
                          withArrow
                        >
                          <ActionIcon
                            variant="light"
                            color="blue"
                            onClick={() => handleToggleArchive(file.id)}
                            style={{ width: "1.5rem", height: "1.6rem" }}
                          >
                            <ArrowArcLeft size="1rem" />
                          </ActionIcon>
                        </Tooltip>
                      </td>
                      <td style={tableStyles}>
                        {" "}
                        {`${file.branch}-${new Date(file.upload_date).getFullYear()}-${(
                          new Date(file.upload_date).getMonth() + 1
                        )
                          .toString()
                          .padStart(2, "0")}-#${file.id}`}
                      </td>
                      <td style={tableStyles}>{file.uploader}</td>
                      <td style={tableStyles}>{file.subject}</td>
                      <td style={tableStyles}>
                        {convertDate(file.upload_date)}
                      </td>
                      <td style={tableStyles}>
                        <ActionIcon
                          variant="outline"
                          color="black"
                          onClick={() => handleViewFile(file)}
                          style={{ width: "1.5rem", height: "1.6rem" }}
                        >
                          <Eye size="1rem" />
                        </ActionIcon>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <Group
            position="right"
            style={{
              backgroundColor: "#fff",
              padding: "8px 16px",
              borderTop: "1px solid #ddd",
              marginTop: "auto",
              minHeight: "50px",
              display: "flex",
              alignItems: "center",
              height: "35px",
              gap: "16px",
            }}
          >
            <Text size="sm" color="dimmed">
              {`Showing ${filteredFiles.length > 0 ? startIndex + 1 : 0}-${endIndex} of ${filteredFiles.length} files`}
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                height: "36px",
                marginLeft: "auto",
              }}
            >
              <Tooltip
                label={`Enter page number (1-${Math.ceil(filteredFiles.length / itemsPerPage)})`}
                position="top"
              >
                <TextInput
                  placeholder="Page #"
                  value={pageInput}
                  onChange={(e) => {
                    setPageInput(e.target.value.replace(/[^0-9]/g, ""));
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      const pageNumber = parseInt(pageInput, 10);
                      const totalPages = Math.ceil(files.length / itemsPerPage);
                      if (
                        Number.isNaN(pageNumber) ||
                        pageNumber < 1 ||
                        pageNumber > totalPages
                      ) {
                        setPageInput("");
                        return;
                      }
                      setCurrentPage(pageNumber);
                      setPageInput("");
                    }
                  }}
                  style={{
                    width: "80px",
                    textAlign: "center",
                  }}
                  size="sm"
                  type="text"
                  maxLength={3}
                />
              </Tooltip>
              <Pagination
                total={Math.ceil(filteredFiles.length / itemsPerPage)}
                value={currentPage}
                size="sm"
                onChange={setCurrentPage}
                withEdges
              />
            </div>
          </Group>
        </Box>
      )}
    </Card>
  );
}
