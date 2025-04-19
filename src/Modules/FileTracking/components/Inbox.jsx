import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  ActionIcon,
  Tooltip,
  TextInput,
  Group,
  Modal,
  Text,
  Button,
  Pagination,
} from "@mantine/core";
import {
  Archive,
  Eye,
  CaretUp,
  CaretDown,
  ArrowsDownUp,
} from "@phosphor-icons/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import View from "./ViewFile";
import {
  getFilesRoute,
  createArchiveRoute,
} from "../../../routes/filetrackingRoutes";

export default function Inboxfunc() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem("authToken");
  const role = useSelector((state) => state.user.role);
  const username = useSelector((state) => state.user.roll_no);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const itemsPerPage = 7;
  let current_module = useSelector((state) => state.module.current_module);
  current_module = current_module.split(" ").join("").toLowerCase();

  // New state for archive confirmation modal
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [selectedArchiveFile, setSelectedArchiveFile] = useState(null);

  // Helper function to convert dates
  const convertDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  // Fetch files on component mount
  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get(`${getFilesRoute}`, {
          params: {
            username,
            designation: role,
            src_module: current_module,
          },
          withCredentials: true,
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Inbox: ", response.data);
        setFiles(response.data);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };

    getFiles();
  }, [username, role, current_module, token]);

  const handleArchive = async (fileID) => {
    try {
      await axios.post(
        `${createArchiveRoute}`,
        { file_id: fileID },
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
      const updatedFiles = files.filter((file) => file.id !== fileID);
      setFiles(updatedFiles);
      notifications.show({
        title: "File archived",
        message: "The file has been successfully archived",
        color: "green",
      });
    } catch (err) {
      console.error("Error archiving file:", err);
    }
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  const sortedFiles = [...files].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const direction = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.key] > b[sortConfig.key] ? direction : -direction;
  });

  const filteredFiles = sortedFiles.filter((file) => {
    const idString = `${file.branch}-${new Date(file.upload_date).getFullYear()}-${(new Date(file.upload_date).getMonth() + 1).toString().padStart(2, "0")}-#${file.id}`;
    return (
      file.uploader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.sent_by_user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idString.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      convertDate(file.upload_date)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      file.sent_by_designation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePageJump = (e) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(pageInput, 10);
      const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
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
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredFiles.length);

  // Using e.currentTarget ensures the style is applied to the ActionIcon element
  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = e.currentTarget.dataset.hoverColor;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor =
      e.currentTarget.dataset.defaultColor;
  };

  // Archive modal functions
  const openArchiveModal = (file) => {
    setSelectedArchiveFile(file);
    setShowArchiveModal(true);
  };

  const confirmArchive = () => {
    if (selectedArchiveFile) {
      handleArchive(selectedArchiveFile.id);
      setShowArchiveModal(false);
      setSelectedArchiveFile(null);
    }
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
        height: "70vh",
        width: "90vw",
        display: "flex",
        flexDirection: "column",
        overflowY: "hidden",
      }}
    >
      {!selectedFile && (
        <Group position="apart" mb="md">
          <Title
            order={2}
            mb="md"
            style={{
              fontSize: "24px",
            }}
          >
            Inbox
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
        <div style={{ overflowY: "auto", height: "100%" }}>
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
            height: "calc(57vh - 20px)",
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
                  <th style={{ padding: "6px", width: "8.5%", height: "36px" }}>
                    Archive
                  </th>
                  {[
                    "File ID",
                    "Uploader",
                    "Sent By",
                    "Sender's Designation",
                    "Subject",
                    "Date",
                  ].map((key) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      style={{
                        cursor: "pointer",
                        padding: "6px",
                        width: "15.5%",
                        border: "1px solid #0000",
                        alignItems: "center",
                        gap: "5px",
                        height: "36px",
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
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
                  <th
                    style={{
                      padding: "6px",
                      width: "8.5%",
                      border: "1px solid #ddd",
                      height: "36px",
                    }}
                  >
                    View File
                  </th>
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
                      <td
                        style={{
                          padding: "9px",
                          textAlign: "center",
                          border: "1px solid #ddd",
                          height: "36px",
                        }}
                      >
                        <Tooltip label="Archive file" position="top" withArrow>
                          <ActionIcon
                            variant="light"
                            color="blue"
                            className="archive-icon"
                            data-default-color="transparent"
                            data-hover-color="#ffebee"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => openArchiveModal(file)}
                            disabled={file.uploader !== username}
                          >
                            <Archive size="1.5rem" />
                          </ActionIcon>
                        </Tooltip>
                      </td>
                      <td
                        style={{
                          padding: "6px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                          height: "36px",
                        }}
                      >
                        {`${file.branch}-${new Date(file.upload_date).getFullYear()}-${(new Date(file.upload_date).getMonth() + 1).toString().padStart(2, "0")}-#${file.id}`}
                      </td>
                      <td
                        style={{
                          padding: "6px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                          height: "36px",
                        }}
                      >
                        {file.uploader}
                      </td>
                      <td
                        style={{
                          padding: "6px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                          height: "36px",
                        }}
                      >
                        {file.sent_by_user}
                      </td>
                      <td
                        style={{
                          padding: "6px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                          height: "36px",
                        }}
                      >
                        {file.sent_by_designation}
                      </td>
                      <td
                        style={{
                          padding: "6px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                          height: "36px",
                        }}
                      >
                        {file.subject}
                      </td>
                      <td
                        style={{
                          padding: "6px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                          height: "36px",
                        }}
                      >
                        {convertDate(file.upload_date)}
                      </td>
                      <td
                        style={{
                          padding: "6px",
                          textAlign: "center",
                          border: "1px solid #ddd",
                          height: "36px",
                        }}
                      >
                        <Tooltip label="View File" position="top" withArrow>
                          <ActionIcon
                            variant="light"
                            color="black"
                            style={{
                              transition: "background-color 0.3s",
                              width: "2rem",
                              height: "2rem",
                            }}
                            onClick={() => setSelectedFile(file)}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#E3F2FD";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                            }}
                          >
                            <Eye size="1rem" />
                          </ActionIcon>
                        </Tooltip>
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
              minHeight: "20px",
              display: "flex",
              alignItems: "center",
              height: "58px",
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
                  onKeyPress={handlePageJump}
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
                onChange={(page) => {
                  setCurrentPage(page);
                  setPageInput("");
                }}
                size="sm"
                boundaries={1}
                siblings={1}
                withEdges
              />
            </div>
          </Group>
        </Box>
      )}
      {/* Archive Confirmation Modal */}
      <Modal
        opened={showArchiveModal}
        onClose={() => setShowArchiveModal(false)}
        title={
          <Text align="center" weight={600} size="lg">
            Confirm Archive
          </Text>
        }
        centered
      >
        <Text weight={600} mb="md">
          Are you sure you want to archive this file?
        </Text>
        {selectedArchiveFile && (
          <>
            <Text mb="ls">Subject: {selectedArchiveFile.subject}</Text>
            <Text mb="md">
              File ID:{" "}
              {`${selectedArchiveFile.branch}-${new Date(selectedArchiveFile.upload_date).getFullYear()}-${(new Date(selectedArchiveFile.upload_date).getMonth() + 1).toString().padStart(2, "0")}-#${selectedArchiveFile.id}`}
            </Text>
          </>
        )}
        <Group justify="center" gap="xl" style={{ width: "100%" }}>
          <Button
            onClick={confirmArchive}
            color="blue"
            style={{ width: "120px" }}
          >
            Confirm
          </Button>
          <Button
            onClick={() => setShowArchiveModal(false)}
            variant="outline"
            style={{ width: "120px" }}
          >
            Cancel
          </Button>
        </Group>
      </Modal>
    </Card>
  );
}
