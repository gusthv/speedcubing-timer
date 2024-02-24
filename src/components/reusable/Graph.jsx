import { useContext } from "react";
import { CartesianGrid, LineChart, Line, Tooltip } from "recharts";
import { Time } from "../../components";
import { Context } from "../../App";

const CustomTooltip = ({ active, payload }) => {
  const [darkMode] = useContext(Context);
  if (active && payload && payload.length) {
    return (
      <p
        className={`bg-transparent ${
          !darkMode ? "text-accent_light" : "text-accent_light"
        }`}
      >
        <Time value={payload[0].value} />
      </p>
    );
  }
};

const Graph = (values) => {
  const [darkMode] = useContext(Context);
  return (
    <>
      <LineChart
        width={values.width}
        height={values.height}
        data={values.solves}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="time"
          stroke={!darkMode ? "#C2BFF8" : "#7C5CFF"}
        />
      </LineChart>
    </>
  );
};

export default Graph;
