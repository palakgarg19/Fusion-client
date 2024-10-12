import { useEffect, useState } from "react";
import { Tooltip } from "@mantine/core";
import dayjs from "dayjs";

function EventCalendar({ selectedDate, selectedClub }) {
  const [daysInMonth, setDaysInMonth] = useState([]);

  // Darker dummy events for demonstration with club tags and assigned colors
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

  useEffect(() => {
    // Calculate the correct number of days in the selected month
    const daysArray = [];
    const date = dayjs(selectedDate);
    const daysInSelectedMonth = date.daysInMonth();
    const startOfMonth = date.startOf("month").day();

    // Add padding days for the start of the month
    for (let i = 0; i < startOfMonth; i += 1) {
      daysArray.push({ date: null });
    }

    for (let i = 1; i <= daysInSelectedMonth; i += 1) {
      daysArray.push({ date: date.date(i) });
    }

    setDaysInMonth(daysArray);
  }, [selectedDate]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "5px",
      }}
    >
      {daysInMonth.map((day, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            minHeight: "110px", // Increase height
            minWidth: "110px", // Increase width
            backgroundColor: "white", // Set background color to white
            borderRadius: "5px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)", // Optional: add shadow for better visibility
          }}
        >
          {day.date && (
            <div style={{ fontWeight: "bold", fontSize: "16px" }}>
              {day.date.date()}
            </div>
          )}
          {day.date &&
            events
              .filter(
                (event) =>
                  day.date.isSame(event.date, "day") &&
                  (selectedClub === "All Clubs" || event.club === selectedClub),
              )
              .map((event, idx) => (
                <Tooltip
                  key={idx}
                  label={`${event.name}: ${event.details}`}
                  withArrow
                  transition="pop"
                  transitionDuration={200}
                >
                  <div
                    style={{
                      backgroundColor: event.color,
                      padding: "5px 10px",
                      margin: "5px 0",
                      color: "#fff",
                      borderRadius: "3px",
                      fontSize: "14px", // Font size for event card
                    }}
                  >
                    {event.time} {event.name}
                  </div>
                </Tooltip>
              ))}
        </div>
      ))}
    </div>
  );
}

export default EventCalendar;
