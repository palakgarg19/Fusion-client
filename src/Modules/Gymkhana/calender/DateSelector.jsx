import { DatePicker } from "@mantine/dates";
import { Container } from "@mantine/core";
import PropTypes from "prop-types";

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

DateSelector.propTypes = {
  selectedDate: PropTypes.string,
  setSelectedDate: PropTypes.string,
};

export default DateSelector;
