import React, { useEffect } from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { ImStatsDots } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { useQuestions } from "../../context/QuestionsProvider";
import {
  MdKeyboardArrowRight,
  MdEdit,
  MdDelete,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import CalendarComp from "../components/CalendarComp";
import { useState } from "react";
import { useEditModal } from "../../context/EditModalProvider.jsx";
import { useContext } from "react";
import { AuthDataContext } from "../../context/AuthContext";
import CreateButton from "../components/CreateButton";
import ViewButton from "../components/ViewButton";
import DifficultyChart from "../components/DifficultyChart";
import Analytics from "../components/Analytics";
import axios from "axios";
import Banner from "../components/Banner.jsx";

const Dashboard = () => {
  const { openModal } = useEditModal();
  const [buttonClicked, setbuttonClicked] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'
  const { userData, setUserData, serverUrl } = useContext(AuthDataContext);
  const [clicked, setClicked] = useState(false);
  const [todayQuestionSolved, settodayQuestionSolved] = useState([]);
  const { bannerclicked, setbannerclicked } = useQuestions();
  const {
    questions,
    loading,
    error,
    deleteQuestion,
    streak,
    handleStreak,
    fetchQuestions,
    fetchStreak,
    handleRevisionHeat,
  } = useQuestions();
  const isLoggedIn = userData && userData.name;

  const navigate = useNavigate();
  const getRandomColor = () => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FECA57",
      "#FF9FF3",
      "#54A0FF",
      "#5F27CD",
      "#00D2D3",
      "#FF9F43",
      "#C44569",
      "#F8B500",
      "#6C5CE7",
      "#A29BFE",
      "#FD79A8",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Check if user is logged in

  const handleLogout = async () => {
    try {
      await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setUserData(null);
      localStorage.removeItem("reminders");
      navigate("/login");
    } catch (error) {
      console.log("Logout error ", error.message);
    }
  };
  useEffect(() => {
    const getTodaySolved = async () => {
      try {
        const res = await axios.get(
          serverUrl + "/api/questions/stats/revisionHistory",
          {
            withCredentials: true,
          }
        );
        console.log("API Response:", res.data[0].count);

        // Safe access with fallback
        if (
          res.data &&
          res.data.length > 0 &&
          res.data[0].count !== undefined
        ) {
          let today = res.data[0].count;
          settodayQuestionSolved(today);
        } else {
          settodayQuestionSolved(0);
        }
      } catch (error) {
        console.error("Error fetching today's solved questions:", error);
        settodayQuestionSolved(0);
      }
    };
    getTodaySolved();
  }, []);
  console.log(todayQuestionSolved);

  useEffect(() => {
    fetchQuestions();
    fetchStreak();
  }, []);

  // Add loading state if userData is not available
  if (!userData) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Toggle row expansion
  const toggleRowExpansion = (questionId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedRows(newExpanded);
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "hard":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "solved":
        return "text-green-600 bg-green-100";
      case "attempted":
        return "text-yellow-600 bg-yellow-100";
      case "unsolved":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  // Format topics array
  const formatTopics = (topics) => {
    if (!topics || topics.length === 0) return "N/A";
    if (Array.isArray(topics)) {
      return topics.join(", ");
    }
    return topics;
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      await deleteQuestion(questionId);
    } catch (err) {
      alert("Failed to delete question");
    }
  };

  return (
    <div className="w-screen h-screen  relative">
      <div className="z-[9999]">
        <Banner />
      </div>
      {/* Fixed Sidebar */}
      <div
        className={`w-[22%] bg-white ${
          !bannerclicked && `mt-[50px]`
        }  h-full flex flex-col items-start justify-start fixed left-0 top-0  `}
        id="Sidebar"
      >
        <div className="mb-4 mx-9 mt-4 ">
          <div className="flex items-center justify-between w-full gap-14">
            <div>
              <button onClick={() => navigate("/")}>
                <h1 className="md:text-[19px] text-sm  ">DSA Revision</h1>
              </button>
            </div>

            <div>
              <div className="relative">
                <button
                  className="border-[1px] border-gray-300 p-[5px] rounded-full hover:bg-gray-300 shadow-inner"
                  onClick={() => setClicked(!clicked)}
                >
                  {isLoggedIn ? (
                    <div
                      className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      {userData.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <CgProfile className="text-[30px]" />
                  )}
                </button>
                {userData && clicked && (
                  <div className="h-[3em] w-[7em] bg-[white] rounded-lg border-[1px] border-gray-300 absolute top-11 flex items-center justify-center left-0 ">
                    <button
                      onClick={handleLogout}
                      className="hover:bg-slate-200 w-full h-full"
                    >
                      logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-10 items-center ">
            <p className="text-[#7a7a7a]">v1.0</p>
            <p className="bg-green-100 text-green-600 border-[1px] border-green-600 text-[10px] px-[5px] font-bold py-[1px] rounded-full animate-bounce">
              Beta
            </p>
          </div>
        </div>
        <div className="w-full">
          <ul className="px-3 w-full flex-col justify-center items-center flex gap-5">
            <li className="w-[80%] flex items-center  px-4 py-2 hover:bg-[#dbdbdbe1] ml-8 rounded-full">
              <a
                href="#Dashboard"
                className=" flex items-center select-none gap-4 "
              >
                <MdHomeFilled className="text-[24px]" />
                <div>Dashboard</div>
              </a>
            </li>
            <li className="w-[80%] flex items-center select-none gap-4 px-4 py-2 hover:bg-[#dbdbdbe1] ml-8 rounded-full">
              <a
                href="#Manage-Questions"
                className=" flex items-center select-none gap-4 "
              >
                <FaRegQuestionCircle className="text-[24px]" />
                <div>Questions</div>
              </a>
            </li>
            <li className="w-[80%] flex items-center select-none gap-4 px-4 py-2 hover:bg-[#dbdbdbe1] ml-8 rounded-full">
              <a
                href="#Calendar"
                className=" flex items-center select-none gap-4 "
              >
                <IoCalendarNumberOutline className="text-[24px]" />
                <div>Calendar</div>
              </a>
            </li>
            <li className="w-[80%] flex items-center select-none gap-4 px-4 py-2 hover:bg-[#dbdbdbe1] ml-8 rounded-full">
              <a
                href="#Analytics"
                className=" flex items-center select-none gap-4 "
              >
                <ImStatsDots className="text-[24px]" />
                <div>Analytics</div>
              </a>
            </li>
            <li className="w-[80%] px-4 py-2 hover:bg-[#dbdbdbe1] ml-8 rounded-full">
              <button
                className="flex items-center select-none gap-4 "
                onClick={() => navigate("/settings")}
              >
                <IoSettingsOutline className="text-[24px]" />
                <div>Settings</div>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content with left margin to account for fixed sidebar */}
      <div
        className="w-[75%]  bg-white  min-h-screen py-8 flex flex-col gap-40 ml-[25%] overflow-y-auto mt-[50px] z-[8888]"
        id="Main-Content"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Dashboard Section */}
        <section id="Dashboard" className="w-full flex flex-col gap-8">
          <div id="header">
            <h1 className="text-[32px] font-semibold">Dashboard</h1>
            <p className="text-[gray] text-[16px]">
              Welcome back{" "}
              <span className="text-gray-600">{userData?.name || "User"}</span>!
              Ready to boost DSA skills
            </p>
          </div>
          <div id="quick-actions">
            <h1 className="text-[24px] font-semibold mb-5">Quick actions</h1>
            <div className="flex">
              <CreateButton />
              <ViewButton />
            </div>
          </div>
          <div id="daily-revision-stats">
            <h1 className="text-[24px] font-semibold mb-5">
              Daily Revision Stats
            </h1>
            <div className="flex gap-5">
              <div className="h-28 w-72 rounded-xl shadow-md border-[1px] border-slate-300 flex flex-col items-start justify-start px-10 py-8">
                <h1 className="text-[16px] font-medium">
                  Questions Solved Today
                </h1>
                <p className="font-bold text-[22px]">{todayQuestionSolved}</p>
              </div>
              <div className="h-28 w-72 rounded-xl shadow-md border-[1px] border-slate-300 flex flex-col items-start justify-start px-10 py-8">
                <h1 className="text-[16px] font-medium">Total Questions</h1>
                <p className="font-bold text-[22px]">{questions.length}</p>
              </div>
              <div className="h-28 w-72 rounded-xl shadow-md border-[1px] border-slate-300 flex flex-col items-start justify-start px-10 py-8">
                <h1 className="text-[16px] font-medium">Streak🔥</h1>
                <p className="font-bold text-[22px]">{streak}</p>
              </div>
            </div>
          </div>
        </section>
        <section id="Calendar">
          <h1 className="text-[24px] font-semibold mb-8">Revision Calendar</h1>
          <div className="flex gap-4">
            <CalendarComp />
          </div>
        </section>

        {/*--------------- ALL Questions Section --------------------*/}
        <section id="Manage-Questions">
          <h1 className="text-[32px] font-semibold">All Questions</h1>
          <div className="mt-8 space-y-4">
            <p className="text-gray-600">
              Manage and track your DSA questions and revision progress.
            </p>

            {/* View Mode Toggle */}
            <div className="flex gap-2 mb-4 justify-between w-[95%]">
              <div className="flex gap-4">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    viewMode === "table"
                      ? "bg-slate-800 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    viewMode === "cards"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Card View
                </button>
              </div>
              <div className="flex gap-5">
                <CreateButton />
                <ViewButton />
              </div>
            </div>

            <div className="h-auto py-8 bg-white border-[1px] border-[#9a9a9a] shadow w-[95%] rounded-lg flex flex-col items-center justify-start px-6 overflow-hidden">
              <div className="w-full">
                <button
                  className="text-gray-500 text-[24px] flex items-center hover:text-gray-700 transition-colors"
                  onClick={() => setbuttonClicked(!buttonClicked)}
                >
                  <span
                    className={`transform transition-transform duration-300 ease-in-out ${
                      buttonClicked ? "rotate-90" : ""
                    }`}
                  >
                    <MdKeyboardArrowRight />
                  </span>
                  All Questions ({questions.length})
                </button>
              </div>

              <div
                className={`w-full mt-4 transition-all duration-500 ease-in-out overflow-hidden ${
                  buttonClicked
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center items-center py-8">
                    <div className="text-gray-500">Loading questions...</div>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                    Error: {error}
                  </div>
                )}

                {/* Card View */}
                {!loading &&
                  !error &&
                  questions.length > 0 &&
                  viewMode === "cards" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {questions.slice(0, 4).map((question) => (
                        <div
                          key={question._id}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <a
                                href={question.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline font-semibold text-lg mb-2 block"
                                title={question.title}
                                onClick={() => {
                                  handleRevisionHeat(question._id);
                                  handleStreak();
                                }}
                              >
                                {question.title}
                              </a>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                  {question.site || "N/A"}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                                    question.difficulty
                                  )}`}
                                >
                                  {question.difficulty || "N/A"}
                                </span>
                                <span
                                  className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                    question.status
                                  )}`}
                                >
                                  {question.status || "N/A"}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                title="Edit Question"
                                onClick={() => openModal(question)}
                              >
                                <MdEdit size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteQuestion(question._id)
                                }
                                className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                title="Delete Question"
                              >
                                <MdDelete size={16} />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Topics:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {Array.isArray(question.topic) ? (
                                  question.topic.map((topic, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                    >
                                      {topic}
                                    </span>
                                  ))
                                ) : (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                    {question.topic || "N/A"}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">
                                  Last Revised:
                                </span>
                                <div className="font-medium">
                                  {formatDate(question.lastRevised)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-500">
                                  Next Revision:
                                </span>
                                <div className="font-medium">
                                  {formatDate(question.nextRevision)}
                                </div>
                              </div>
                            </div>

                            {question.notes && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-1">
                                  Notes:
                                </h4>
                                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                  {question.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {questions.length > 5 && (
                        <div className="mt-4 p-4 text-center w-[100%] text-gray-500 bg-gray-50 rounded-lg border">
                          Showing 5 of {questions.length} questions.
                          <button
                            onClick={() => navigate("/view")}
                            className="text-blue-600 hover:text-blue-800 ml-1"
                          >
                            View all →
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                {/* Enhanced Table View */}
                {!loading &&
                  !error &&
                  questions.length > 0 &&
                  viewMode === "table" && (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[200px]">
                              Title
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Site
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[150px]">
                              Topics
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Difficulty
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Status
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Dates
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700 min-w-[200px]">
                              Notes
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {questions.slice(0, 5).map((question, index) => (
                            <React.Fragment key={question._id}>
                              <tr
                                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-25"
                                }`}
                              >
                                <td className="py-3 px-4">
                                  <a
                                    href={question.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                    title={question.title}
                                    onMouseDown={() => {
                                      handleRevisionHeat(question._id);
                                      handleStreak();
                                    }}
                                  >
                                    {question.title}
                                  </a>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                    {question.site || "N/A"}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex flex-wrap gap-1">
                                    {Array.isArray(question.topic) ? (
                                      question.topic
                                        .slice(0, 2)
                                        .map((topic, idx) => (
                                          <span
                                            key={idx}
                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                          >
                                            {topic}
                                          </span>
                                        ))
                                    ) : (
                                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                        {question.topic || "N/A"}
                                      </span>
                                    )}
                                    {Array.isArray(question.topic) &&
                                      question.topic.length > 2 && (
                                        <button
                                          onClick={() =>
                                            toggleRowExpansion(question._id)
                                          }
                                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200"
                                        >
                                          +{question.topic.length - 2} more
                                        </button>
                                      )}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                                      question.difficulty
                                    )}`}
                                  >
                                    {question.difficulty || "N/A"}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span
                                    className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                      question.status
                                    )}`}
                                  >
                                    {question.status || "N/A"}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="text-sm">
                                    <div className="text-gray-500">
                                      Last: {formatDate(question.lastRevised)}
                                    </div>
                                    <div className="text-gray-500">
                                      Next: {formatDate(question.nextRevision)}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="text-sm text-gray-600">
                                    {question.notes ? (
                                      <div>
                                        <div
                                          className={`${
                                            expandedRows.has(question._id)
                                              ? ""
                                              : "line-clamp-2"
                                          }`}
                                        >
                                          {question.notes}
                                        </div>
                                        {question.notes.length > 100 && (
                                          <button
                                            onClick={() =>
                                              toggleRowExpansion(question._id)
                                            }
                                            className="text-blue-600 hover:text-blue-800 text-xs mt-1"
                                          >
                                            {expandedRows.has(question._id)
                                              ? "Show less"
                                              : "Show more"}
                                          </button>
                                        )}
                                      </div>
                                    ) : (
                                      "No notes"
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <button
                                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                                      title="Edit Question"
                                      onClick={() => openModal(question)}
                                    >
                                      <MdEdit size={16} />
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleDeleteQuestion(question._id)
                                      }
                                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                      title="Delete Question"
                                    >
                                      <MdDelete size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>

                              {/* Expanded row content */}
                              {expandedRows.has(question._id) && (
                                <tr className="bg-gray-50 border-b border-gray-100">
                                  <td colSpan="8" className="py-4 px-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {Array.isArray(question.topic) &&
                                        question.topic.length > 2 && (
                                          <div>
                                            <h4 className="font-medium text-gray-700 mb-2">
                                              All Topics:
                                            </h4>
                                            <div className="flex flex-wrap gap-1">
                                              {question.topic.map(
                                                (topic, idx) => (
                                                  <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                                  >
                                                    {topic}
                                                  </span>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                        {questions.length > 5 && (
                          <tfoot>
                            <tr>
                              <td
                                colSpan="8"
                                className="py-3 px-4 text-center text-gray-500 bg-gray-50"
                              >
                                Showing 5 of {questions.length} questions.
                                <button
                                  onClick={() => navigate("/view")}
                                  className="text-blue-600 hover:text-blue-800 ml-1"
                                >
                                  View all →
                                </button>
                              </td>
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>
                  )}

                {/* Empty State */}
                {!loading &&
                  !error &&
                  questions.length === 0 &&
                  buttonClicked && (
                    <div className="text-center py-12">
                      <div className="text-gray-500 text-lg mb-4">
                        No questions found
                      </div>
                      <p className="text-gray-400">
                        Start by creating your first question!
                      </p>
                      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                        Add Question
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>

        <section id="Analytics">
          <Analytics />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
