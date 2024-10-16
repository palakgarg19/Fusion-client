import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const token = localStorage.getItem("authToken");

// club details from here can be inferred from here
export const useGetData = (clubName) => {
  return useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/gymkhana/club_detail/",
          { club_name: clubName },
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
export const useGetUpcomingEvents = () => {
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
export const useGetPastEvents = () => {
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
export const useGetClubMembers = (clubName) => {
  return useQuery({
    queryKey: ["clubMemebersData"],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/gymkhana/api/members_records/",
          { club_name: clubName },
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

export const useGetClubAcheivement = (clubName) => {
  return useQuery({
    queryKey: ["clubAcheivements"],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/gymkhana/api/show_achievement/",
          { club_name: clubName },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data");
      }
    },
  });
};
