import { TooltipProps } from "recharts";
import { Time } from "../../../components";

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{ value?: number }> | null;
  active?: boolean;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0]?.value;

    return (
      <p className="bg-transparent font-semibold">
        {value !== undefined ? <Time value={value} /> : null}
      </p>
    );
  }
  return null;
};

export default CustomTooltip;
