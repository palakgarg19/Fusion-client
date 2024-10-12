import { DatePicker } from "@mantine/dates";
import { Container } from "@mantine/core";

function DateSelector({ selectedDate, setSelectedDate }) {
  return (
    <Container style={{ width: "200px", paddingRight: "400px" }}>
      <DatePicker
        placeholder="Pick a date"
        value={selectedDate}
        onChange={setSelectedDate}
      />
    </Container>
  );
}

export default DateSelector;
