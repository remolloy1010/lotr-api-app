import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

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
      />
      <Tooltip />
    </PieChart>
  );
}
