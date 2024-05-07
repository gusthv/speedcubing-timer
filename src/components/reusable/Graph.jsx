import { useContext } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
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
      <ResponsiveContainer width={values.width} height={values.height}>
        <LineChart width="100%" height="100%" data={values.solves}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type={values.type}
            dataKey="time"
            stroke={!darkMode ? "#6BCEF2" : "#6BCEF2"}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Graph;
