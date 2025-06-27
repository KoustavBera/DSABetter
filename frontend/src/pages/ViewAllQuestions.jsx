import React, { useState, useEffect, useContext } from "react";
import { MdEdit, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaSearch, FaFilter } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../../context/AuthContext";
import CreateButton from "../components/CreateButton";
import { useQuestions } from "../../context/QuestionsProvider";
import { useEditModal } from "../../context/EditModalProvider";

const ViewAllQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'cards'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSite, setFilterSite] = useState("all");
  const { serverUrl } = useContext(AuthDataContext);
  const { handleRevisionHeat } = useQuestions();
  const { openModal } = useEditModal();
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

  // Delete question function
  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      await axios.delete(`${serverUrl}/api/questions/${questionId}`, {
        withCredentials: true,
      });

      // Remove question from local state
      setQuestions(questions.filter((q) => q._id !== questionId));
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Failed to delete question");
    }
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

  const getRevisionHeat = (revision) => {
    if (revision === 0) return "text-red-600 bg-red-100";
    if (revision === 1) return "text-red-600 bg-red-100";
    if (revision === 2) return "text-yellow-600 bg-yellow-100";
    if (revision === 3) return "text-green-600 bg-green-100";
    else return "text-purple-600 bg-purple-100";
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

  // Filter and search questions
  const getFilteredQuestions = () => {
    return questions.filter((question) => {
      const matchesSearch =
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(question.topic)
          ? question.topic.some((topic) =>
              topic.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : question.topic?.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDifficulty =
        filterDifficulty === "all" ||
        question.difficulty?.toLowerCase() === filterDifficulty.toLowerCase();

      const matchesStatus =
        filterStatus === "all" ||
        question.status?.toLowerCase() === filterStatus.toLowerCase();

      const matchesSite =
        filterSite === "all" ||
        question.site?.toLowerCase() === filterSite.toLowerCase();

      return matchesSearch && matchesDifficulty && matchesStatus && matchesSite;
    });
  };

  // Get unique values for filters
  const getUniqueValues = (field) => {
    const values = questions.map((q) => q[field]).filter(Boolean);
    return [...new Set(values)];
  };

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get(serverUrl + "/api/questions", {
          withCredentials: true,
        });
        console.log(res);
        setQuestions(res.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching questions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [serverUrl]);

  const filteredQuestions = getFilteredQuestions();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
              >
                <IoIosArrowBack size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  All Questions
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage and track your DSA questions (
                  {filteredQuestions.length} of {questions.length})
                </p>
              </div>
            </div>
            <CreateButton />
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <FaSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search questions or topics..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Difficulty Filter */}
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {/* Status Filter */}
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="solved">Solved</option>
                <option value="attempted">Attempted</option>
                <option value="unsolved">Unsolved</option>
              </select>

              {/* Site Filter */}
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={filterSite}
                onChange={(e) => setFilterSite(e.target.value)}
              >
                <option value="all">All Sites</option>
                {getUniqueValues("site").map((site) => (
                  <option key={site} value={site}>
                    {site}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm ||
              filterDifficulty !== "all" ||
              filterStatus !== "all" ||
              filterSite !== "all") && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterDifficulty("all");
                    setFilterStatus("all");
                    setFilterSite("all");
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode("table")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "cards"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
            >
              Card View
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500">Loading questions...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="m-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              Error: {error}
            </div>
          )}

          {/* Card View */}
          {!loading &&
            !error &&
            filteredQuestions.length > 0 &&
            viewMode === "cards" && (
              <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredQuestions.map((question) => (
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
                          onClick={() => handleRevisionHeat(question._id)}
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
                          onClick={() => handleDeleteQuestion(question._id)}
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
                          <span className="text-gray-500">Last Revised:</span>
                          <div className="font-medium">
                            {formatDate(question.lastRevised)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Next Revision:</span>
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
              </div>
            )}

          {/* Table View */}
          {!loading &&
            !error &&
            filteredQuestions.length > 0 &&
            viewMode === "table" && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 min-w-[200px]">
                        Title
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Site
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 min-w-[150px]">
                        Topics
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Difficulty
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Revision
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Dates
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 min-w-[200px]">
                        Notes
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.map((question, index) => (
                      <React.Fragment key={question._id}>
                        <tr
                          className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-25"
                          }`}
                        >
                          <td className="py-4 px-6">
                            <a
                              href={question.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                              title={question.title}
                              onClick={() => handleRevisionHeat(question._id)}
                            >
                              {question.title}
                            </a>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {question.site || "N/A"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1">
                              {Array.isArray(question.topic) ? (
                                question.topic.slice(0, 2).map((topic, idx) => (
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
                          <td className="py-4 px-6">
                            <span
                              className={`px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                                question.difficulty
                              )}`}
                            >
                              {question.difficulty || "N/A"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-2 py-1 rounded-full text-sm font-medium ${getRevisionHeat(
                                question.revision
                              )}`}
                            >
                              {question.revision || "0"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                question.status
                              )}`}
                            >
                              {question.status || "N/A"}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm">
                              <div className="text-gray-500">
                                Last: {formatDate(question.lastRevised)}
                              </div>
                              <div className="text-gray-500">
                                Next: {formatDate(question.nextRevision)}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
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
                          <td className="py-4 px-6">
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
                            <td colSpan="8" className="py-4 px-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Array.isArray(question.topic) &&
                                  question.topic.length > 2 && (
                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-2">
                                        All Topics:
                                      </h4>
                                      <div className="flex flex-wrap gap-1">
                                        {question.topic.map((topic, idx) => (
                                          <span
                                            key={idx}
                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                                          >
                                            {topic}
                                          </span>
                                        ))}
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
                </table>
              </div>
            )}

          {/* Empty State */}
          {!loading && !error && filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                {questions.length === 0
                  ? "No questions found"
                  : "No questions match your filters"}
              </div>
              <p className="text-gray-400 mb-6">
                {questions.length === 0
                  ? "Start by creating your first question!"
                  : "Try adjusting your search or filters"}
              </p>
              {questions.length === 0 && <CreateButton />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllQuestions;
