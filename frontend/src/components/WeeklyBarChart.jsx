import { useContext, useEffect, useState } from "react";
import axios from "axios";
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
import { AuthDataContext } from "../../context/AuthContext";

const WeeklyBarChart = () => {
  const [chartData, setchartData] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  useEffect(() => {
    const fetchWeeklyStats = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/questions/stats/week", {
          withCredentials: true,
        });
        setchartData(res.data);
      } catch (error) {
        console.log("Error fetching weekly stats", error.message);
      }
    };
    fetchWeeklyStats();
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-gray-700 font-medium">{`Week: ${label}`}</p>
          <p className="text-blue-600 font-semibold">
            {`Questions: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-[500px] h-[500px]  border-[1px] border-slate-300 rounded-lg">
      {/* Card Container */}
      <div className="bg-white rounded-2xl  border border-gray-100 overflow-hidden">
        {/* Chart Container */}
        <div className="p-6">
          <div className="w-full h-80 relative">
            {/* Gradient Definitions */}
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="cocktailGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#00000" stopOpacity={0.9} />
                  <stop offset="50%" stopColor="#2e2e2e" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#ffff" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient
                  id="cocktailGradientHover"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff5252" stopOpacity={1} />
                  <stop offset="25%" stopColor="#26a69a" stopOpacity={0.9} />
                  <stop offset="50%" stopColor="#2196f3" stopOpacity={0.8} />
                  <stop offset="75%" stopColor="#66bb6a" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#ffca28" stopOpacity={1} />
                </linearGradient>
              </defs>
            </svg>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148, 163, 184, 0.3)"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="url(#cocktailGradient)"
                  radius={[8, 8, 0, 0]}
                  className="drop-shadow-sm hover:drop-shadow-md transition-all duration-300"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyBarChart;
