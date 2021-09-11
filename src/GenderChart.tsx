import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const colors: any = ["#80B27A", "#406E3B"];

export default function GenderChart(props: any) {
  console.log(props);
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="count"
        isAnimationActive={false}
        data={props.data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        nameKey="gender"
      >
        {/* {props.data.map((entry: any, index: any) => (
          <Cell key={`cell-${index}`} fill={colors[index]} />
        ))} */}
      </Pie>

      <Tooltip />
    </PieChart>
  );
}
