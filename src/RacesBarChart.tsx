import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PRIMARY_COLOR } from "./theme";

export default function RacesBarChart(props: any) {
  return (
    <ResponsiveContainer width="100%" height={800}>
      <BarChart data={props.data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="count" type="number" />
        <YAxis
          dataKey="race"
          type="category"
          width={120}
          height={6}
          interval={0}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={PRIMARY_COLOR} />
      </BarChart>
    </ResponsiveContainer>
  );
}
