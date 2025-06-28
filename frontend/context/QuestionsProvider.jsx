// context/QuestionsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthDataContext } from "./AuthContext";
import toast from "react-hot-toast";

const QuestionsContext = createContext();

export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
};

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streak, setStreak] = useState(0);
  const [bannerclicked, setbannerclicked] = useState(false);

  const { serverUrl } = useContext(AuthDataContext);
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${serverUrl}/api/questions`, {
        withCredentials: true,
      });
      setQuestions(res.data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching questions", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStreak = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/questions/streak`, {
        withCredentials: true,
      });
      if (res) {
        setStreak(res.data.streak);
      }
    } catch (err) {
      console.log("streak error");
    }
  };
  const handleStreak = async () => {
    try {
      await axios.get(`${serverUrl}/api/questions/streak`, {
        withCredentials: true,
      });
    } catch (error) {
      toast.error("cannot handle streak");
    }
  };
  const deleteQuestion = async (questionId) => {
    try {
      await axios.delete(`${serverUrl}/api/questions/${questionId}`, {
        withCredentials: true,
      });
      setQuestions(questions.filter((q) => q._id !== questionId));
      return true;
    } catch (err) {
      console.error("Error deleting question:", err);
      throw err;
    }
  };

  const addQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (updatedQuestion) => {
    setQuestions(
      questions.map((q) =>
        q._id === updatedQuestion._id ? updatedQuestion : q
      )
    );
  };
  //revision
  const handleRevisionHeat = async (questionsId) => {
    try {
      await axios.get(
        serverUrl + `/api/questions/stats/revision/${questionsId}`,
        { withCredentials: true }
      );
    } catch (error) {
      console.log(
        `Error in [@QuestionProvider.jsx line 80-90] ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchQuestions();
    fetchStreak();
  }, [serverUrl]);

  const value = {
    questions,
    loading,
    error,
    streak,
    deleteQuestion,
    addQuestion,
    updateQuestion,
    fetchQuestions,
    fetchStreak,
    handleRevisionHeat,
    handleStreak,
    bannerclicked,
    setbannerclicked,
  };

  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
};
