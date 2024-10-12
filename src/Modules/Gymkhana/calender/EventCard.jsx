import React from "react";
import { Card, Paper, Text } from "@mantine/core";

function EventCard({ events }) {
  if (!events || events.length === 0) {
    return <Text>No events for the selected date.</Text>;
  }
  console.log(events);
  return (
    <div>
      {events.map((event, index) => (
        <Paper w="300px">
          <Card key={index} shadow="sm" padding="xs" mb="sm">
            <Text weight={500} size="lg">
              {event.name}
            </Text>
            <Text>Club: {event.club}</Text>
            <Text>Time: {event.time}</Text>
            {/* <Text>Date: {event.date}</Text> */}
            <Text>Description: {event.details}</Text>
          </Card>
        </Paper>
      ))}
    </div>
  );
}

export default EventCard;
