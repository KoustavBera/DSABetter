import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthDataContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const defaultForm = {
  title: "",
  link: "",
  site: "Custom",
  difficulty: "Unknown",
  topic: [],
  status: "Unsolved",
  notes: "",
  lastRevised: "",
  nextRevision: "",
};

const difficulties = ["Easy", "Medium", "Hard", "Unknown"];
const statuses = ["Unsolved", "Solved", "Marked for Revision"];

// Site configuration with logos and colors
const siteOptions = [
  {
    id: "leetcode",
    name: "LeetCode",
    color: "text-orange-600",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
  },
  {
    id: "geeksforgeeks",
    name: "GeeksforGeeks (GFG)",
    color: "text-green-700",
    logo: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/gfg_200x200-min.png",
  },
  {
    id: "codeforces",
    name: "Codeforces",
    color: "text-purple-700",
    logo: "https://codeforces.org/s/0/favicon-96x96.png",
  },
  {
    id: "codechef",
    name: "CodeChef",
    color: "text-yellow-600",
    logo: "https://img.icons8.com/?size=100&id=vAtJFm3hwtQw&format=png&color=000000",
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    color: "text-green-600",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
  },
  {
    id: "hackerearth",
    name: "HackerEarth",
    color: "text-blue-700",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/HackerEarth_logo.png",
  },
  {
    id: "striver",
    name: "Striver",
    color: "text-pink-600",
    logo: "https://yt3.googleusercontent.com/ytc/AIdro_mdPFTT7VuJHQkvzW9gjJxvSV3bBDpEVNw8dWOmHjTT5g=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    id: "codingninjas",
    name: "Coding Ninjas",
    color: "text-red-600",
    logo: "https://files.codingninjas.in/pl-ninja-16706.svg",
  },
  {
    id: "prepbytes",
    name: "PrepBytes",
    color: "text-indigo-700",
    logo: "https://images.yourstory.com/cs/images/companies/14eccc4a39b0-logoPrepBytesMbl-1616482824963.jpg?fm=auto&ar=1%3A1&mode=fill&fill=solid&fill-color=fff&format=auto&w=384&q=75",
  },
];

const CreateQuestion = () => {
  const [formData, setFormData] = useState(defaultForm);
  const [topicsInput, setTopicsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [customSiteInput, setCustomSiteInput] = useState("");
  const [useCustomSite, setUseCustomSite] = useState(false);

  const { serverUrl } = useContext(AuthDataContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSiteSelect = (site) => {
    setSelectedSite(site);
    setFormData((prev) => ({ ...prev, site: site.name }));
    setIsDropdownOpen(false);
    setUseCustomSite(false);
  };

  const handleCustomSiteToggle = () => {
    setUseCustomSite(true);
    setSelectedSite(null);
    setIsDropdownOpen(false);
  };

  const handleCustomSiteChange = (e) => {
    const value = e.target.value;
    setCustomSiteInput(value);
    setFormData((prev) => ({ ...prev, site: value }));
  };

  const handleTopics = () => {
    const topics = topicsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);
    setFormData((prev) => ({ ...prev, topic: topics }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.link || formData.topic.length === 0) {
      toast.error("Title/Link/Topic are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(serverUrl + "/api/questions/", formData, {
        withCredentials: true,
      });
      setMessage({ type: "success", text: "Question added successfully!" });
      toast.success("Question added successfully!");
      setFormData(defaultForm);
      setTopicsInput("");
      setSelectedSite(null);
      setCustomSiteInput("");
      setUseCustomSite(false);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save question." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="h-[3rem] w-[3rem] flex items-center justify-center bg-blue-500 text-[white] rounded-full absolute top-5 left-5 "
        onClick={() => navigate("/dashboard")}
      >
        <FaCircleChevronLeft className="text-[2.9rem]" />
      </button>
      <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg ">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Add New Question
        </h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700">
              Title <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Link */}
          <div>
            <label className="block font-medium text-gray-700">
              Link <span className="text-[red]">*</span>
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Site - Custom Dropdown */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Site</label>

            {!useCustomSite ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="block w-full px-4 py-2 text-left text-gray-700 bg-[#ffffff] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                  <div className="flex items-center justify-between bg-[white]">
                    <div className="flex items-center space-x-3 ">
                      {selectedSite ? (
                        <>
                          <img
                            src={selectedSite.logo}
                            alt={selectedSite.name}
                            className="h-6 w-6 object-contain"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <span className={`font-bold ${selectedSite.color}`}>
                            {selectedSite.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-500">
                          Select a platform...
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {siteOptions.map((site) => (
                      <button
                        key={site.id}
                        type="button"
                        onClick={() => handleSiteSelect(site)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={site.logo}
                            alt={site.name}
                            className="h-6 w-6 object-contain"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <span className={`font-bold ${site.color}`}>
                            {site.name}
                          </span>
                        </div>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleCustomSiteToggle}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-t border-gray-200 last:rounded-b-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-6 w-6 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-600">
                            +
                          </span>
                        </div>
                        <span className="text-gray-600 font-medium">
                          Custom Site
                        </span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Custom Site</span>
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomSite(false);
                      setCustomSiteInput("");
                      setFormData((prev) => ({ ...prev, site: "Custom" }));
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Choose from list
                  </button>
                </div>
                <input
                  type="text"
                  value={customSiteInput}
                  onChange={handleCustomSiteChange}
                  placeholder="Enter custom site name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <div className="flex gap-2">
              {difficulties.map((diff) => {
                const colorMap = {
                  Easy: "bg-green-100 text-green-700 border-green-400",
                  Medium: "bg-yellow-100 text-yellow-700 border-yellow-400",
                  Hard: "bg-red-100 text-red-700 border-red-400",
                  Unknown: "bg-gray-100 text-gray-700 border-gray-400",
                };

                const isSelected = formData.difficulty === diff;
                const baseClasses =
                  "px-3 py-1 rounded-full border text-sm font-semibold cursor-pointer transition";

                return (
                  <span
                    key={diff}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, difficulty: diff }))
                    }
                    className={`${baseClasses} ${
                      isSelected
                        ? colorMap[diff]
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {diff}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Topics */}
          <div>
            <label className="block font-medium text-gray-700">
              Topics <span className="text-[red]">*</span>
            </label>
            <input
              type="text"
              value={topicsInput}
              onChange={(e) => setTopicsInput(e.target.value)}
              onBlur={handleTopics}
              placeholder="e.g. Arrays, DP, Greedy"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate topics with commas.
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-medium text-gray-700">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Last Revised */}
          <div>
            <label className="block font-medium text-gray-700">
              Last Revised
            </label>
            <input
              type="date"
              name="lastRevised"
              value={formData.lastRevised}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Next Revision */}
          <div>
            <label className="block font-medium text-gray-700">
              Next Revision
            </label>
            <input
              type="date"
              name="nextRevision"
              value={formData.nextRevision}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Question"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
