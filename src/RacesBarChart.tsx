import { render } from "@testing-library/react";
import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// export const RacesBarChart = ({}: any) => {
function RacesBarChart(props: any) {
  console.log(props);
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={500}
      height={300}
      data={props.data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      {/* <Bar dataKey="uv" fill="#82ca9d" />{" "} */}
    </BarChart>
    // </ResponsiveContainer>
  );
}
export default RacesBarChart;
