import React, { PureComponent, useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Sector,
} from "recharts";
// import { useTheme } from "@material-ui/core";
// import { green, grey, red } from "@material-ui/core/colors";

const UPVOTES = "upvotes";
const DOWNVOTES = "downvotes";

export default function MovieRatingChart(props: any) {
  console.log("**********");
  console.log(props.data.docs[0]);
  const data01 = [
    {
      name: props.data.docs[0].name,
      score: props.data.docs[0].rottenTomatoesScore,
    },
    {
      name: DOWNVOTES,
      score: 100 - props.data.docs[0].rottenTomatoesScore,
    },
  ];
  console.log(data01);
  return (
    <div style={{ fontSize: 30 }}>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            // style={{ fontSize: 50, fill: COLORS[0] }}
          ></text>
          <Pie
            data={data01}
            dataKey="score"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            startAngle={180}
            endAngle={0}
            labelLine={false}
            // activeIndex={this.state.activeIndex}
            // activeShape={renderActiveShape(this.state.activeIndex)}
            // onMouseEnter={this.onPieEnter}
          >
            {/* {data01.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={
                    this.state.activeIndex === index ? COLORS[index] : grey[200]
                  }
                  radius={50}
                />
              ))} */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// function responseRate(numResponses1: number, numResponses2: number): number {
//   return Math.round(
//     (data01[numResponses1].value /
//       (data01[numResponses1].value + data01[numResponses2].value)) *
//       100
//   );
// }
// interface Props {
//   active?: boolean;
//   payload?: Array<any>;
// }
// const CustomTooltip = ({ active, payload }: Props) => {
//   const theme = useTheme();

//   if (active && payload?.length) {
//     return (
//       <div className="custom-tooltip" style={{ display: "inline-flex" }}>
//         <p
//           className="desc"
//           style={{ color: theme.palette.primary.main }}
//         >{`# of ${payload[0].name}: `}</p>
//         <p
//           className="desc"
//           style={{ paddingLeft: theme.spacing(1) }}
//         >{`${payload[0].value}`}</p>
//       </div>
//     );
//   }

//   return null;
// };

// const COLORS = [green[500], red[300]];

// const renderActiveShape = (activeIndex: number) => (props: any) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 10) * cos;
//   const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text
//         x={cx + 2}
//         y={cy + 6}
//         dy={8}
//         textAnchor="middle"
//         fill={fill}
//         fontSize={40}
//       >
//         {(percent * 100).toFixed(0)}%
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//         cornerRadius={4}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 9}
//         outerRadius={outerRadius + 10}
//         fill={grey[300]}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={grey[300]}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={grey[300]} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         fill={grey[600]}
//         fontSize={18}
//       >{`${value} ${payload.payload.name}`}</text>
//     </g>
//   );
// };

// type ExamplePieProps = {};

// interface MyProps {
//   someProps?: any;
// }
// interface MyState {
//   activeIndex?: any;
// }
// export default class ExamplePie extends PureComponent<MyProps, MyState> {
//   constructor(props: any) {
//     super(props);
//     this.state = { activeIndex: 0 };
//   }

//   onPieEnter = (_: any, index: any) => {
//     this.setState({
//       activeIndex: index,
//     });
//   };

//   render() {
//     return (
//       <div style={{ fontSize: 30 }}>
//         <ResponsiveContainer width="100%" height={250}>
//           <PieChart>
//             <text
//               x="50%"
//               y="50%"
//               textAnchor="middle"
//               dominantBaseline="middle"
//               style={{ fontSize: 50, fill: COLORS[0] }}
//             ></text>
//             <Pie
//               data={data01}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={60}
//               outerRadius={80}
//               startAngle={180}
//               endAngle={0}
//               labelLine={false}
//               activeIndex={this.state.activeIndex}
//               activeShape={renderActiveShape(this.state.activeIndex)}
//               onMouseEnter={this.onPieEnter}
//             >
//               {data01.map((entry, index) => (
//                 <Cell
//                   key={`cell-${entry.name}`}
//                   fill={
//                     this.state.activeIndex === index ? COLORS[index] : grey[200]
//                   }
//                   radius={50}
//                 />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
// }
