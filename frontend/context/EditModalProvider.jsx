import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthDataContext } from "./AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const EditModalContext = createContext();

export const useEditModal = () => useContext(EditModalContext);

export const EditModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    site: "",
    difficulty: "",
    notes: "",
  });

  const { serverUrl } = useContext(AuthDataContext);

  // Add useEffect to debug state changes
  useEffect(() => {
    console.log("Modal isOpen state changed:", isOpen);
    console.log("Question data:", question);
  }, [isOpen, question]);

  const openModal = (questionData) => {
    console.log("openModal was hit", questionData);
    setQuestion(questionData);
    setFormData({
      title: questionData.title || "",
      link: questionData.link || "",
      site: questionData.site || "",
      difficulty: questionData.difficulty || "",
      notes: questionData.notes || "",
    });
    setIsOpen(true);
    console.log("Modal should be open now");
  };

  const closeModal = () => {
    console.log("Closing modal");
    setIsOpen(false);
    setQuestion(null);
    setFormData({
      title: "",
      link: "",
      site: "",
      difficulty: "",
      notes: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.patch(
        `${serverUrl}/api/questions/${question._id}`,
        formData,
        { withCredentials: true }
      );

      closeModal();
      toast.success("Successfully updated!");
    } catch (err) {
      console.error("❌ Update failed:", err.response?.data || err.message);
      toast.error("Failed to update!");
    }
  };

  return (
    <EditModalContext.Provider
      value={{
        openModal,
        closeModal,
        isOpen,
        formData,
        handleChange,
        handleSave,
      }}
    >
      {children}

      {/* Enhanced Modal UI */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={(e) => {
            // Close modal when clicking backdrop
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              width: "90%",
              maxWidth: "500px",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
              transform: "scale(1)",
              animation: "slideUp 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ marginBottom: "28px", textAlign: "center" }}>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  color: "#1f2937",
                  margin: "0 0 8px 0",
                  letterSpacing: "-0.025em",
                }}
              >
                Edit Question
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Update your question details below
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Title Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Question Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter question title"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Link Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Question Link
                </label>
                <input
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://example.com/question"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Site and Difficulty Row */}
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "6px",
                    }}
                  >
                    Site
                  </label>
                  <input
                    name="site"
                    value={formData.site}
                    onChange={handleChange}
                    placeholder="LeetCode, HackerRank, etc."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "10px",
                      fontSize: "14px",
                      transition:
                        "border-color 0.2s ease, box-shadow 0.2s ease",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3b82f6";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e5e7eb";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Difficulty
                  </label>
                  <div
                    style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                  >
                    {["Easy", "Medium", "Hard", "Unknown"].map((level) => {
                      const isSelected = formData.difficulty === level;
                      const colors = {
                        Easy: {
                          bg: "#dcfce7",
                          text: "#15803d",
                          border: "#4ade80",
                        },
                        Medium: {
                          bg: "#fef3c7",
                          text: "#a16207",
                          border: "#facc15",
                        },
                        Hard: {
                          bg: "#fee2e2",
                          text: "#dc2626",
                          border: "#f87171",
                        },
                        Unknown: {
                          bg: "#f3f4f6",
                          text: "#374151",
                          border: "#9ca3af",
                        },
                      };

                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              difficulty: level,
                            }))
                          }
                          style={{
                            padding: "6px 12px",
                            fontSize: "13px",
                            fontWeight: "600",
                            backgroundColor: isSelected
                              ? colors[level].bg
                              : "#ffffff",
                            color: isSelected ? colors[level].text : "#6b7280",
                            border: `2px solid ${
                              isSelected ? colors[level].border : "#e5e7eb"
                            }`,
                            borderRadius: "20px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            outline: "none",
                            minWidth: "60px",
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.target.style.backgroundColor = colors[level].bg;
                              e.target.style.color = colors[level].text;
                              e.target.style.borderColor = colors[level].border;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.target.style.backgroundColor = "#ffffff";
                              e.target.style.color = "#6b7280";
                              e.target.style.borderColor = "#e5e7eb";
                            }
                          }}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Notes Field */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "6px",
                  }}
                >
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any additional notes or comments..."
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "14px",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    outline: "none",
                    resize: "vertical",
                    minHeight: "100px",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(59, 130, 246, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6b7280",
                    backgroundColor: "#f9fafb",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#f3f4f6";
                    e.target.style.borderColor = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#f9fafb";
                    e.target.style.borderColor = "#e5e7eb";
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#ffffff",
                    backgroundColor: "#1f2937",
                    border: "2px solid #1f2937",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#111827";
                    e.target.style.borderColor = "#111827";
                    e.target.style.transform = "translateY(-1px)";
                    e.target.style.boxShadow =
                      "0 4px 12px rgba(31, 41, 55, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#1f2937";
                    e.target.style.borderColor = "#1f2937";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* CSS Animations */}
          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </EditModalContext.Provider>
  );
};
