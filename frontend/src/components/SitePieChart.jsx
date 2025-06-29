import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useContext } from "react";
import { AuthDataContext } from "../../context/AuthContext";

const COLORS = [
  "url(#gradient0)",
  "url(#gradient1)",
  "url(#gradient2)",
  "url(#gradient3)",
  "url(#gradient4)",
  "url(#gradient5)",
];

const SitePieChart = () => {
  const [data, setData] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  useEffect(() => {
    const fetchSiteStats = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/questions/stats/site", {
          withCredentials: true,
        });

        const formatted = res.data.map((item) => ({
          name: item._id || "Custom",
          value: item.count,
        }));
        setData(formatted);
      } catch (error) {
        console.error("Site stats fetch error:", error.message);
      }
    };
    fetchSiteStats();
  }, [serverUrl]);

  return (
    <div className="w-1/3 h-[30rem] bg-white border-[1px] border-slate-300 rounded-xl p-4">
      <h2 className="text-md mb-4 font-semibold text-black text-center">
        Questions By Site
      </h2>
      <div className="h-[calc(100%-3rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <defs>
              <linearGradient
                id="gradient0"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff00cc" />
                <stop offset="100%" stopColor="#6600ff" />
              </linearGradient>
              <linearGradient
                id="gradient1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00ffcc" />
                <stop offset="100%" stopColor="#00ff99" />
              </linearGradient>
              <linearGradient
                id="gradient2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffcc00" />
                <stop offset="100%" stopColor="#ff9900" />
              </linearGradient>
              <linearGradient
                id="gradient3"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff0055" />
                <stop offset="100%" stopColor="#ff0000" />
              </linearGradient>
              <linearGradient
                id="gradient4"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="100%" stopColor="#00aaff" />
              </linearGradient>
              <linearGradient
                id="gradient5"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="100%" stopColor="#ff3333" />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#0dff00"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SitePieChart;
