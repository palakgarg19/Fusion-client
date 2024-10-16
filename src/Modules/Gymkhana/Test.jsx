import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const token = localStorage.getItem("authToken");

// club details from here can be inferred from here
const useGetData = () => {
  return useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/gymkhana/club_detail/",
          { club_name: "BitByte" },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        return data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data");
      }
    },
  });
};

// upcoming global events
const useGetUpcomingEvents = () => {
  return useQuery({
    queryKey: ["UpcomingEventsData"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/gymkhana/upcoming_events/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        return data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data");
      }
    },
  });
};

// past global events
const useGetPastEvents = () => {
  return useQuery({
    queryKey: ["PastEventsData"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/gymkhana/past_events/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        return data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data");
      }
    },
  });
};

// get club Memebers , here we will get all data over here and then we need to filter
const useGetClubMembers = () => {
  return useQuery({
    queryKey: ["clubMemebersData"],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/gymkhana/api/members_records/",
          { club_name: "BitByte" },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        return data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data");
      }
    },
  });
};

// Main Test component to display data from all functions
function Test() {
  const { data: clubDetail } = useGetData();
  const { data: upcomingEvents } = useGetUpcomingEvents();
  const { data: pastEvents } = useGetPastEvents();
  const { data: clubMembers } = useGetClubMembers();

  console.log("Club Detail Data:", clubDetail);
  console.log("Upcoming Events Data:", upcomingEvents);

  console.log("Past Events Data:", pastEvents);
  console.log("Club Members Data:", clubMembers);

  return (
    <div>
      <h1>Fetched Data</h1>

      {/* Club Details */}
      <div>
        <h2>Club Details</h2>
        {clubDetail ? (
          <div>{clubDetail.co_ordinator}</div>
        ) : (
          <div>Loading club details...</div>
        )}
      </div>

      {/* Upcoming Events */}
      <div>
        <h2>Upcoming Events</h2>
        <ul>
          {upcomingEvents ? (
            upcomingEvents.map((event) => (
              <li key={event.id}>{event.event_name}</li>
            ))
          ) : (
            <li>Loading upcoming events...</li>
          )}
        </ul>
      </div>

      {/* Past Events */}
      <div>
        <h2>Past Events</h2>
        <ul>
          {pastEvents ? (
            pastEvents.map((event) => (
              <li key={event.id}>{event.event_name}</li>
            ))
          ) : (
            <li>Loading past events...</li>
          )}
        </ul>
      </div>

      {/* Club Members */}
      <div>
        <h2>Club Members</h2>
        <ul>
          {clubMembers ? (
            clubMembers.map((member) => <li key={member.id}>{member.name}</li>)
          ) : (
            <li>Loading club members...</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Test;
