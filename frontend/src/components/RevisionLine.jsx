import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useContext } from "react";
import { AuthDataContext } from "../../context/AuthContext";

const RevisionLine = () => {
  const [chartData, setChartData] = useState([]);
  const [lineMessage, setLineMessage] = useState(null);
  const { serverUrl } = useContext(AuthDataContext);

  function generateDateRange(startDate, endDate) {
    const dateList = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dateList.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dateList;
  }

  function fillMissingDates(rawData, start, end) {
    const map = new Map();
    rawData.forEach((item) => {
      map.set(item._id, item.count);
    });
    const allDates = generateDateRange(start, end);
    //Fill missing date with count 0
    const filled = allDates.map((date) => {
      const dateStr = date.toISOString().split("T")[0];
      return {
        date: dateStr,
        count: map.get(dateStr) || 0,
      };
    });
    return filled;
  }

  const fetchDailyGrowth = async () => {
    const res = await axios.get(serverUrl + "/api/questions/stats/growth", {
      withCredentials: true,
    });
    console.log(res.data);
    setLineMessage(res.data);
  };
  useEffect(() => {
    const fetchRevisionStats = async () => {
      const res = await axios.get(
        serverUrl + "/api/questions/stats/revisionHistory",
        { withCredentials: true }
      );
      const start = new Date();
      const end = new Date();
      start.setDate(end.getDate() - 13);
      const filled = fillMissingDates(res.data, start, end);
      setChartData(filled);
    };
    fetchRevisionStats();
    fetchDailyGrowth();
  }, []);

  return (
    <div className="bg-white rounded-lg p-6 w-1/2 h-[30rem] border-[1px] border-slate-300">
      <div className="mb-4">
        <h1 className="text-md font-semibold text-black">
          Question Solved Per Day
        </h1>
        <p className="text-[2rem] font-bold text-black">
          {chartData[13] ? chartData[13].count : "Loading..."}
        </p>
        <p className="mb-3">
          <span className="text-[gray] text-sm">Last Day</span>{" "}
          <span
            className={`${
              lineMessage ? lineMessage.color : "text-red-500"
            } text-sm`}
          >
            {lineMessage?.growth || "Loading..."}
          </span>
        </p>
      </div>
      <div className="h-[calc(100%-8rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 20, bottom: 40 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2e2e2e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#c2c2c2" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#6B7280" }}
              tickLine={{ stroke: "#6B7280" }}
              label={{
                value: "Date ->",
                position: "insideBottom",
                offset: -1,
                fontSize: 14,
                fill: "#00000",
              }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#6B7280" }}
              tickLine={{ stroke: "#6B7280" }}
              label={{
                value: "Count ->",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fontSize: 14,
                fill: "#00000",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
              }}
              itemStyle={{
                color: "#F9FAFB", // Count value
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#2e2e2e"
              strokeWidth={3}
              fill="url(#colorUv)"
              dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevisionLine;
