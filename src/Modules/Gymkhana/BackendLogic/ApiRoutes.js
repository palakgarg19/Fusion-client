import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// club details from here can be inferred from here
export const useGetData = (clubName, token) => {
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

export const useGetUpcomingEvents = (token) => {
  return useQuery({
    queryKey: ["UpcomingEventsData"],
    queryFn: async () => {
      console.log(token);
      try {
        const { data } = await axios.get(
          "http://localhost:8000/gymkhana/upcoming_events/",
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

// past global events

export const useGetPastEvents = (token) => {
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

export const useGetFests = (token) => {
  return useQuery({
    queryKey: ["FestsData"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/gymkhana/fest/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        // console.log("fetched data",data);
        return data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data");
      }
    },
  });
};

// get club Memebers , here we will get all data over here and then we need to filter

export const useGetClubMembers = (clubName, token) => {
  return useQuery({
    queryKey: ["clubMemebersData"],
    queryFn: async () => {
      console.log(token);
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

export const useGetClubAcheivement = (clubName, token) => {
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
// TODO: implement the comment functionality

export const useGetCommentsEventInfo = (EventId, token) => {
  console.log("EventId:", EventId);
  return useQuery({
    queryKey: ["commentsEventInfo", EventId],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/gymkhana/api/list_event_comments/",
          { event_id: EventId },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        console.log("Comments data", data);
        return data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data");
      }
    },
    enabled: !!EventId,
  });
};
// TODO handle Approve Button for Event form

export const approveFICEventButton = async (eventId, token) => {
  const response = axios.put(
    "http://localhost:8000/gymkhana/api/fic_approve_event/",
    { id: eventId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return (await response).data;
};

export const approveCounsellorEventButton = async (eventId, token) => {
  return axios.put(
    "http://localhost:8000/gymkhana/api/counsellor_approve_event/",
    { id: eventId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};

export const approveDeanEventButton = async (eventId, token) => {
  return axios.put(
    "http://localhost:8000/gymkhana/api/dean_approve_event/",
    { id: eventId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};

// API call for rejecting

export const rejectEventButton = async (eventId, token) => {
  return axios.put(
    "http://localhost:8000/gymkhana/api/reject_event/",
    { id: eventId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};

// API call for modifying
export const modifyEventButton = async (eventId, token) => {
  return axios.put(
    "http://localhost:8000/gymkhana/api/modify_event/",
    { id: eventId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};
export const useGetUpcomingBudgets = (token) => {
  return useQuery({
    queryKey: ["UpcomingBudgetData"],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/gymkhana/budget/",
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

// API call to get comments or details for a specific budget
export const useGetCommentsBudgetInfo = (budgetId, token) => {
  console.log("BudgetId:", budgetId);
  return useQuery({
    queryKey: ["commentsBudgetInfo", budgetId],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/gymkhana/api/list_budget_comments/",
          { budget_id: budgetId },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        console.log("Comments data", data);
        return data;
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch data");
      }
    },
    enabled: !!budgetId,
  });
};

// API call to approve budget by FIC
export const approveFICBudgetButton = async (budgetId, token) => {
  const response = axios.put(
    "http://localhost:8000/gymkhana/api/fic_approve_budget/",
    { id: budgetId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  return (await response).data;
};

// API call to approve budget by Counsellor
export const approveCounsellorBudgetButton = async (budgetId, token) => {
  return axios.put(
    "http://localhost:8000/gymkhana/api/counsellor_approve_budget/",
    { id: budgetId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};

// API call to approve budget by Dean
export const approveDeanBudgetButton = async (budgetId, token) => {
  return axios.put(
    "http://localhost:8000/gymkhana/api/dean_approve_budget/",
    { id: budgetId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};

// API call for rejecting budget
export const rejectBudgetButton = async (budgetId, token) => {
  return axios.put(
    "http://localhost:8000/gymkhana/api/reject_budget/",
    { id: budgetId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};

// API call for modifying budget
export const modifyBudgetButton = async (budgetId, token) => {
  return axios.put(
    "http://localhost:8000/gymkhana/api/modify_budget/",
    { id: budgetId },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
};

export const useGetCurrentLoginnedRoleRelatedClub = (InputName, token) => {
  return useQuery({
    queryKey: ["CurrentRoleRelatedTocLUB"],
    queryFn: async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/gymkhana/api/list_club_position/",
          { name: InputName },
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
