import { Box, Button, Typography } from "@mui/material";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const FoodCalendar = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode];
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          mb: 2,
          mt: 1,
        }}
      >
        <Button
          sx={{
            height: 25,
            fontSize: "1rem",
            textTransform: "none",
            backgroundColor: "#6d76fa",
            borderRadius: 0,
            color: "white",
            "&:hover ": {
              backgroundColor: "#9a9ff1",
            },
          }}
        >
          {"<"}
        </Button>
        <Typography variant="h4" fontWeight="bold">
          Sep 19
        </Typography>
        <Button
          sx={{
            height: 25,
            fontSize: "1rem",
            textTransform: "none",
            backgroundColor: "#6d76fa",
            borderRadius: 0,
            color: "white",
            "&:hover ": {
              backgroundColor: "#9a9ff1",
            },
          }}
        >
          {">"}
        </Button>
      </Box>
      <Calendar onChange={onChange} value={date} />
    </Box>
  );
};

export default FoodCalendar;
