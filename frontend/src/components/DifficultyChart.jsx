import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AuthDataContext } from "../../context/AuthContext";
import axios from "axios";
const DifficultyChart = () => {
  const [data, setData] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);
  useEffect(() => {
    const fetchDifficultyStats = async () => {
      try {
        const res = await axios.get(
          serverUrl + "/api/questions/stats/difficulty",
          { withCredentials: true }
        );
        const labels = ["Easy", "Medium", "Hard", "Unknown"];

        const formatted = labels.map((label) => {
          const found = res.data.find((item) => item._id === label);
          return {
            difficulty: label,
            count: found ? found.count : 0,
          };
        });
        setData(formatted);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDifficultyStats();
  }, [serverUrl]);

  return (
    <div className="w-full h-[300px] bg-white shadow-md rounded-xl p-4">
      <h1 className="font-thin">Difficulty Of Questions</h1>
      <ResponsiveContainer width="9	0%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="difficulty" tick={{ fontSize: 14 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 14 }} />
          <Tooltip />
          <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00fc11" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#818cf8" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyChart;
