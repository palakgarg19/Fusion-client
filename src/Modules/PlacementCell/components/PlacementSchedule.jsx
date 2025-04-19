import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Pagination,
  Grid,
  Modal,
  Button,
  Title,
  Tabs,
} from "@mantine/core";
import dayjs from "dayjs";
import axios from "axios";
import { useSelector } from "react-redux";
import AddPlacementEventForm from "./AddPlacementEventForm";
import PlacementScheduleCard from "./PlacementScheduleCard";
import { fetchPlacementScheduleRoute } from "../../../routes/placementCellRoutes";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop().split(";").shift();
};

const csrfToken = getCookie("csrftoken");

function PlacementScheduleGrid({ data, itemsPerPage, cardsPerRow }) {
  const [activePage, setActivePage] = useState(1);

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const totalRows = Math.ceil(currentItems.length / cardsPerRow);
  const paddedItems = [...currentItems];
  const remainingCards = totalRows * cardsPerRow - currentItems.length;

  Array.from({ length: remainingCards }).forEach(() => paddedItems.push(null));
  return (
    <Container fluid>
      <Grid gutter="md">
        {paddedItems.map((item, index) => (
          <Grid.Col key={index} span="content">
            {item ? (
              <PlacementScheduleCard
                jobId={item.id}
                jobId2={item.jobID}
                companyName={item.company_name}
                location={item.location}
                position={item.role_st}
                jobType={item.placement_type}
                postedTime={item.schedule_at}
                deadline={item.placement_date}
                description={item.description}
                salary={item.ctc}
                check={item.check}
              />
            ) : (
              <div />
            )}
          </Grid.Col>
        ))}
      </Grid>
      <Pagination
        page={activePage}
        onChange={setActivePage}
        total={Math.ceil(data.length / itemsPerPage)}
        mt="xl"
        position="right"
        style={{ position: "fixed", bottom: 32 }}
      />
    </Container>
  );
}

PlacementScheduleGrid.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,

  itemsPerPage: PropTypes.number.isRequired,
  cardsPerRow: PropTypes.number.isRequired,
};

function PlacementSchedule() {
  const [placementData, setPlacementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await axios.get(fetchPlacementScheduleRoute, {
          headers: {
            Authorization: `Token ${token}`,
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
        });

        setPlacementData(response.data);
      } catch (err) {
        console.error(
          "Error details:",
          err.response ? err.response.data : err.message,
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const today = dayjs();

  const activeEvents = placementData.filter((item) =>
    dayjs(item.placement_date).isAfter(today, "day"),
  );
  const closedEvents = placementData.filter((item) =>
    dayjs(item.placement_date).isBefore(today, "day"),
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Container fluid mt={32}>
        <Container
          fluid
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          my={16}
        >
          <Title order={2}>Placement Events</Title>
          {role === "placement officer" && (
            <Button onClick={handleAddEvent} variant="outline">
              Add Placement Event
            </Button>
          )}
        </Container>
        <Tabs defaultValue="active" variant="pills" style={{ marginLeft: 16 }}>
          <Tabs.List>
            <Tabs.Tab value="active">Active</Tabs.Tab>
            {role !== "student" && <Tabs.Tab value="closed">Closed</Tabs.Tab>}
          </Tabs.List>

          <Tabs.Panel value="active" pt="md">
            <PlacementScheduleGrid
              data={activeEvents}
              itemsPerPage={10}
              cardsPerRow={2}
            />
          </Tabs.Panel>
          <Tabs.Panel value="closed" pt="md">
            <PlacementScheduleGrid
              data={closedEvents}
              itemsPerPage={10}
              cardsPerRow={5}
            />
          </Tabs.Panel>
        </Tabs>
      </Container>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="lg"
        centered
      >
        <AddPlacementEventForm
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default PlacementSchedule;
