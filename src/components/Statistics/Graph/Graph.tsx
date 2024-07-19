import { useContext } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "../../../components";
import { Context } from "../../../App";

type CurveType =
  | "basis"
  | "basisClosed"
  | "basisOpen"
  | "linear"
  | "linearClosed"
  | "natural"
  | "monotone"
  | "monotoneX"
  | "monotoneY"
  | "step"
  | "stepBefore"
  | "stepAfter";

type Solve = {
  name: string;
  time: number | null;
};

type GraphProps = {
  width: number;
  height: number;
  solves: Solve[];
  type: CurveType;
};

const Graph: React.FC<GraphProps> = (values) => {
  const { darkMode } = useContext(Context);

  return (
    <ResponsiveContainer width={values.width} height={values.height}>
      <LineChart
        width={values.width}
        height={values.height}
        data={values.solves}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type={values.type}
          dataKey="time"
          stroke={!darkMode ? "#000000" : "#ffffff"}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
