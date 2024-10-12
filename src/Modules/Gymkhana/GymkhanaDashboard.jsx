import { useState, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Group,
  Paper,
  Select,
  Tabs,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";

import ClubFilter from "./calender/ClubFilter";
import DateSelector from "./calender/DateSelector";
import EventCalendar from "./calender/EventCalender";
import EventCard from "./calender/EventCard";
import CustomTable from "./CustomTable";
import { festColumns, festData } from "./makeData";

const ClubViewComponent = lazy(() => import("./ClubViewComponent"));
const events = [
  {
    date: dayjs("2024-10-05"),
    name: "AFC Event 1",
    time: "10:00 AM",
    details: "Details about AFC Event 1",
    color: "#81c784",
    club: "AFC",
  }, // Darker Green
  {
    date: dayjs("2024-11-08"),
    name: "AFC Event 2",
    time: "1:00 PM",
    details: "Details about AFC Event 2",
    color: "#81c784",
    club: "AFC",
  },
  {
    date: dayjs("2024-10-11"),
    name: "AFC Event 3",
    time: "3:00 PM",
    details: "Details about AFC Event 3",
    color: "#81c784",
    club: "AFC",
  },
  {
    date: dayjs("2024-11-22"),
    name: "AFC Event 4",
    time: "5:00 PM",
    details: "Details about AFC Event 4",
    color: "#81c784",
    club: "AFC",
  },

  {
    date: dayjs("2024-10-08"),
    name: "TPC Event 1",
    time: "2:00 PM",
    details: "Details about TPC Event 1",
    color: "#64b5f6",
    club: "TPC",
  }, // Darker Blue
  {
    date: dayjs("2024-12-05"),
    name: "TPC Event 2",
    time: "11:00 AM",
    details: "Details about TPC Event 2",
    color: "#64b5f6",
    club: "TPC",
  },
  {
    date: dayjs("2024-10-13"),
    name: "TPC Event 3",
    time: "4:30 PM",
    details: "Details about TPC Event 3",
    color: "#64b5f6",
    club: "TPC",
  },
  {
    date: dayjs("2024-11-24"),
    name: "TPC Event 4",
    time: "9:00 AM",
    details: "Details about TPC Event 4",
    color: "#64b5f6",
    club: "TPC",
  },

  {
    date: dayjs("2024-10-18"),
    name: "BMC Event 1",
    time: "10:30 AM",
    details: "Details about BMC Event 1",
    color: "#ef5350",
    club: "BMC",
  }, // Darker Red
  {
    date: dayjs("2024-11-09"),
    name: "BMC Event 2",
    time: "12:30 PM",
    details: "Details about BMC Event 2",
    color: "#ef5350",
    club: "BMC",
  },
  {
    date: dayjs("2024-11-04"),
    name: "BMC Event 3",
    time: "1:00 PM",
    details: "Details about BMC Event 3",
    color: "#ef5350",
    club: "BMC",
  },
  {
    date: dayjs("2024-12-05"),
    name: "BMC Event 4",
    time: "3:00 PM",
    details: "Details about BMC Event 4",
    color: "#ef5350",
    club: "BMC",
  },

  {
    date: dayjs("2024-10-28"),
    name: "E-Cell Event 1",
    time: "4:00 PM",
    details: "Details about E-Cell Event 1",
    color: "#ba68c8",
    club: "E-Cell",
  }, // Darker Purple
  {
    date: dayjs("2024-10-30"),
    name: "E-Cell Event 2",
    time: "1:30 PM",
    details: "Details about E-Cell Event 2",
    color: "#ba68c8",
    club: "E-Cell",
  },
  {
    date: dayjs("2024-11-02"),
    name: "E-Cell Event 3",
    time: "2:00 PM",
    details: "Details about E-Cell Event 3",
    color: "#ba68c8",
    club: "E-Cell",
  },
  {
    date: dayjs("2024-11-16"),
    name: "E-Cell Event 4",
    time: "6:00 PM",
    details: "Details about E-Cell Event 4",
    color: "#ba68c8",
    club: "E-Cell",
  },
];
function GymkhanaDashboard() {
  const user = useSelector((state) => state.user);
  console.log("user", user);
  const [activeTab, setActiveTab] = useState("Clubs");
  const [value, setValue] = useState("Select a Club");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClub, setSelectedClub] = useState("All Clubs");
  return (
    <>
      <div>
        {user.username}s Gymkanaha dashboard , role is {user.role}
      </div>{" "}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="Clubs">Clubs</Tabs.Tab>
          <Tabs.Tab value="Calender">Calender</Tabs.Tab>
          <Tabs.Tab value="Fests">Fests</Tabs.Tab>
          <Tabs.Tab value="Events">Events</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Clubs" h="100vh">
          <Group justify="end" mt="5px">
            <Select
              data={["TPC", "AFC"]}
              value={value}
              placeholder="Select a Club"
              onChange={setValue}
              w="220px"
            />
          </Group>
          <Box mt="30px" mx="30px" px="30px" mb="xs" w="78vw">
            {value === "Select a Club" ? (
              <Paper shadow="md" p="xl" h="80vh" w="80vw" ml="20px">
                <Container>
                  <h4>Brief Information regarding Science</h4>
                  <Text mt="5px">
                    <span style={{ fontWeight: 900 }}>
                      Clubs Cultural Club:
                    </span>
                    The Institute has vibrant Cultural Clubs that provide a
                    platform for students to showcase their creativity and
                    talent. There are six clubs associated with our cultural
                    fraternity, namely: (i) Saaz (Music Club), (ii) Jazbaat
                    (Dramatics Society Club), (iii) Aavartan (Dance Club), (iv)
                    Abhivayakti (Arts & Craft Club), (v) Aakrti (The Film Making
                    & Photography Club), and (vi) Samvaad (Literature & Quizzing
                    Society Club). The activities of the cultural committee are
                    largely student-driven with proper guidance from faculty
                    members. These clubs are active throughout the year. Besides
                    helping students in honing their talent and skills, they
                    organize their respective annual festivals.
                  </Text>
                  <Text mt="5px">
                    <span style={{ fontWeight: 900 }}>
                      Science & Technology Club
                    </span>
                    :There are in all 7 different Science and Technology Clubs
                    which are mentored separately by Faculty Members. Since the
                    inception of the Institute, the technical fest “Abhikalpan”
                    held annually is a popular event among different colleges of
                    Jabalpur and the surrounding regions. Apart from that,
                    Hackathon, Racing, Programming, Electronics, 3D priniting,
                    Business and Management, Fabrication and Astronomy related
                    events are organized throughout the year.
                  </Text>
                  <Text mt="5px">
                    <span style={{ fontWeight: 900 }}>Sports Club:</span>Sports
                    and games play a major role in keeping a person fit and
                    fine. Sports in general inculcates, team work, mental
                    strength and physical fitness along with ethics, respect to
                    the opponent, fair play in real life aspects as well. Truly
                    said! At IIITDM Jabalpur, we provide facilities for students
                    to experience “above and beyond” academic experience, to
                    maintain their physical fitness and to excel as a bright
                    student. IIITDM Jabalpur has excellent infrastructure
                    facilities for both outdoor and indoor games and sports. The
                    outdoor games include Volley Ball, Foot Ball, and Cricket,
                    Lawn Tennis, Basket Ball and Athletic ground. A Flood light
                    facility is provided for outdoor games like volleyball, lawn
                    tennis, basketball and Football. The Indoor-Students
                    Activity Center (SAC) provides the following facilities:
                    Shuttle Badminton, Chess, Caroms and Table Tennis with
                    wooden flooring, and other multi-Gyms activities. We are
                    preparing students by organizing intramural and extramural
                    competitions. We encourage student participation in
                    inter-collegiate, inter-IIIT and other open tournaments
                    across the country.
                  </Text>
                </Container>
              </Paper>
            ) : (
              <Suspense fallback={<div>Loading .......</div>}>
                <ClubViewComponent
                  AboutClub={`${value} is the club we are talking about `}
                  clubName={value}
                  membersData={[
                    {
                      name: "John Doe",
                      role: "Coordinator",
                      rollNo: "22BCS178",
                    },
                    {
                      name: "Jane Smith",
                      role: "Co-Coordinator",
                      rollNo: "23BDS002",
                    },
                    {
                      name: "Emily Johnson",
                      role: "Core Member",
                      rollNo: "22BCS179",
                    },
                    {
                      name: "Michael Brown",
                      role: "Core Member",
                      rollNo: "22BCS180",
                    },
                    { name: "Sarah Davis", role: "Member", rollNo: "23BDS003" },
                    {
                      name: "David Wilson",
                      role: "Member",
                      rollNo: "23BDS004",
                    },
                    {
                      name: "Laura Martinez",
                      role: "Core Member",
                      rollNo: "22BCS181",
                    },
                    {
                      name: "James Garcia",
                      role: "Member",
                      rollNo: "23BDS005",
                    },
                    {
                      name: "Patricia Rodriguez",
                      role: "Core Member",
                      rollNo: "22BCS182",
                    },
                    { name: "Daniel Hall", role: "Member", rollNo: "23BDS006" },

                    // add more members here
                  ]}
                  achievementsData={[
                    { title: "First Place at Hackathon", year: "2022" },
                    { title: "Best Club Award", year: "2023" },
                    // add more achievements here
                  ]}
                  eventsData={[
                    { name: "Coding Bootcamp", date: "2024-01-15" },
                    { name: "Tech Fest", date: "2024-03-10" },
                    // add more events here
                  ]}
                  membersColumns={[
                    { accessorKey: "name", header: "Name" },
                    { accessorKey: "role", header: "Role" },
                  ]}
                  achievementsColumns={[
                    { accessorKey: "title", header: "Title" },
                    { accessorKey: "year", header: "Year" },
                  ]}
                  eventsColumns={[
                    { accessorKey: "name", header: "Event Name" },
                    { accessorKey: "date", header: "Date" },
                  ]}
                />
              </Suspense>
            )}
          </Box>
        </Tabs.Panel>

        <Tabs.Panel value="Calender" h="100vh">
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {/* Left Section */}
            <Container
              style={{
                // Adjust this to ensure it occupies only 1/3 of the width
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "50px",
                paddingTop: "35px",
                boxSizing: "border-box", // Ensures padding doesn’t add extra width
                // overflow: "hidden",
              }}
            >
              <DateSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
              <EventCard
                events={events.filter((event) =>
                  dayjs(event.date).isSame(selectedDate, "day"),
                )}
              />
            </Container>

            {/* Right Section */}
            <Container
              style={{
                // Takes up the remaining space
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  overflow: "auto", // Ensures no overflow from the calendar header
                }}
              >
                <h2>{dayjs(selectedDate).format("MMMM YYYY")}</h2>
                <ClubFilter
                  selectedClub={selectedClub}
                  setSelectedClub={setSelectedClub}
                />
              </div>
              <EventCalendar
                selectedDate={selectedDate}
                selectedClub={selectedClub}
              />
            </Container>
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="Fests" h="100vh">
          <Container mt="10px" mx="0" my="xs">
            <Suspense fallback={<div>Loading Fests Table...</div>}>
              <CustomTable data={festData} columns={festColumns} />
            </Suspense>
          </Container>
          {/* need to make page where we have previous Fests listed here in Table */}
        </Tabs.Panel>

        <Tabs.Panel value="Events" h="100vh">
          <Container mt="10px" mx="0" my="xs">
            <Suspense fallback={<div>Loading Fests Table...</div>}>
              <CustomTable data={festData} columns={festColumns} />
            </Suspense>
          </Container>
          {/* need to make a Table with previous Events in Campus */}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default GymkhanaDashboard;
