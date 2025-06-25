import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
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

  useEffect(() => {
    const fetchRevisionStats = async () => {
      const res = await axios.get(
        serverUrl + "/api/questions/stats/revisionHistory",
        { withCredentials: true }
      );

      const start = new Date();
      const end = new Date();
      start.setDate(end.getDate() - 13);
      console.log("Raw response from backend:", res.data);
      const filled = fillMissingDates(res.data, start, end);
      setChartData(filled);
    };
    fetchRevisionStats();
  }, []);
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            label={{
              value: "Date ->",
              position: "insideBottom",
              offset: -5,
              fontSize: 14,
            }}
          />
          <YAxis
            allowDecimals={false}
            label={{
              value: "Count ->",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              fontSize: 14,
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevisionLine;
