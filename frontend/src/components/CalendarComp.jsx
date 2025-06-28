import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthDataContext } from "../../context/AuthContext";

function CalendarComp() {
  const [value, onChange] = useState(new Date());
  const [reminders, setReminders] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [reminderText, setReminderText] = useState("");
  const [color, setcolor] = useState("");
  const { serverUrl } = useContext(AuthDataContext);

  const handleDayClick = (date) => {
    const isSame =
      selectedDate && selectedDate.toDateString() === date.toDateString();

    if (isSame) {
      setSelectedDate(null);
      setShowForm(false);
    } else {
      setSelectedDate(date);
      setShowForm(true);
      setReminderText("");
      setcolor("");
    }
  };

  const addReminder = async () => {
    if (!reminderText || !color || !selectedDate) {
      toast.error("Please fill in all fields");
      return;
    }

    const dateKey = selectedDate.toISOString().split("T")[0];

    try {
      const res = await axios.post(
        `${serverUrl}/api/calendar`,
        {
          date: dateKey,
          text: reminderText,
          color,
        },
        { withCredentials: true }
      );

      const newReminder = res.data;

      setReminders((prev) => ({
        ...prev,
        [dateKey]: prev[dateKey]
          ? [...prev[dateKey], newReminder]
          : [newReminder],
      }));

      setShowForm(false);
      setSelectedDate(null);
      setReminderText("");
      setcolor("");
      toast.success("Reminder saved!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add reminder");
    }
  };

  const deleteReminder = async (dateKey, index) => {
    const reminderToDelete = reminders[dateKey][index];

    try {
      await axios.delete(`${serverUrl}/api/calendar/${reminderToDelete._id}`, {
        withCredentials: true,
      });

      setReminders((prev) => {
        const updatedList = [...prev[dateKey]];
        updatedList.splice(index, 1);

        const updated =
          updatedList.length === 0
            ? Object.fromEntries(
                Object.entries(prev).filter(([k]) => k !== dateKey)
              )
            : { ...prev, [dateKey]: updatedList };

        return updated;
      });

      toast.success("Reminder deleted!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete reminder");
    }
  };

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/calendar`, {
          withCredentials: true,
        });

        const formatted = {};
        res.data.forEach(({ date, text, color, _id }) => {
          if (!formatted[date]) formatted[date] = [];
          formatted[date].push({ text, color, _id });
        });

        setReminders(formatted);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load reminders");
      }
    };

    fetchReminders();
  }, [serverUrl]);

  return (
    <div className="w-full max-w-md">
      <style>{`
.custom-calendar {
width: 100%;
background: white;
border: 1px solid #e2e8f0;
border-radius: 12px;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
font-family: inherit;
padding: 16px;
}

.custom-calendar .react-calendar__navigation {
display: flex;
height: 44px;
margin-bottom: 16px;
}

.custom-calendar .react-calendar__navigation button {
min-width: 44px;
background: none;
border: none;
font-size: 16px;
font-weight: 600;
color: #374151;
cursor: pointer;
padding: 8px 12px;
border-radius: 8px;
transition: all 0.2s;
}

.custom-calendar .react-calendar__navigation button:hover {
background-color: #f3f4f6;
color: #1f2937;
}

.custom-calendar .react-calendar__navigation button:disabled {
background-color: transparent;
color: #9ca3af;
cursor: not-allowed;
}

.custom-calendar .react-calendar__month-view__weekdays {
text-align: center;
text-transform: uppercase;
font-weight: 600;
font-size: 12px;
color: #6b7280;
margin-bottom: 8px;
}

.custom-calendar .react-calendar__month-view__weekdays__weekday {
padding: 8px 0;
}

.custom-calendar .react-calendar__month-view__days__day {
position: relative;
background: none;
border: none;
color: #374151;
font-size: 14px;
font-weight: 500;
height: 40px;
width: 40px;
margin: 2px;
border-radius: 8px;
cursor: pointer;
transition: all 0.2s;
display: flex;
align-items: center;
justify-content: center;
}

.custom-calendar .react-calendar__month-view__days__day:hover {
background-color: #eff6ff;
color: #2563eb;
}

.custom-calendar .react-calendar__month-view__days__day--active {
background-color: #2563eb !important;
color: white !important;
}

.custom-calendar
.react-calendar__month-view__days__day--neighboringMonth {
color: #d1d5db;
}

.custom-calendar .react-calendar__month-view__days__day--weekend {
color: #ef4444;
}

.custom-calendar .react-calendar__tile--now {
background-color: #fef3c7;
color: #d97706;
font-weight: 600;
}

.custom-calendar .react-calendar__tile--now:hover {
background-color: #fed7aa;
color: #ea580c;
}

.custom-calendar
.react-calendar__tile--active.react-calendar__tile--now {
background-color: #2563eb !important;
color: white !important;
}

`}</style>

      <Calendar
        onClickDay={handleDayClick}
        tileClassName={({ date }) => {
          const isActive =
            selectedDate && date.toDateString() === selectedDate.toDateString();
          return isActive ? "selected-tile" : "";
        }}
        tileContent={({ date }) => {
          const key = date.toISOString().split("T")[0];
          const items = reminders[key];
          if (!items || items.length === 0) return null;
          const dotColor = items[0].color || "text-blue-500";
          return (
            <span className={`${dotColor} text-2xl absolute top-0 right-2`}>
              •
            </span>
          );
        }}
        className="custom-calendar"
      />

      {showForm && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Add Reminder for {selectedDate.toDateString()}
          </h2>
          <input
            type="text"
            value={reminderText}
            onChange={(e) => setReminderText(e.target.value)}
            placeholder="Enter reminder"
            className="w-full border px-3 py-2 rounded mb-2"
          />
          <div className="flex flex-wrap gap-2 mb-2">
            {[
              { name: "red", class: "text-red-500 border-red-500 bg-red-100" },
              {
                name: "blue",
                class: "text-blue-500 border-blue-500 bg-blue-100",
              },
              {
                name: "yellow",
                class: "text-yellow-500 border-yellow-500 bg-yellow-100",
              },
              {
                name: "green",
                class: "text-green-500 border-green-500 bg-green-100",
              },
            ].map(({ name, class: btnClass }) => {
              const isSelected = color === `text-${name}-500`;
              return (
                <button
                  key={name}
                  className={`px-2 py-1 w-16 rounded-md border ${btnClass} transition duration-200 ${
                    isSelected
                      ? "ring-2 ring-offset-1 ring-current scale-105"
                      : ""
                  }`}
                  onClick={() => setcolor(`text-${name}-500`)}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <button
            onClick={addReminder}
            className="bg-blue-500 text-white px-4 py-2 rounded my-7"
          >
            Save Reminder
          </button>

          {selectedDate &&
            reminders[selectedDate.toISOString().split("T")[0]] && (
              <div className="mt-2 space-y-1">
                <h3 className="font-semibold my-6 text-gray-700">
                  Existing Reminders:
                </h3>
                {reminders[selectedDate.toISOString().split("T")[0]].map(
                  (r, i) => (
                    <div
                      key={r._id || i}
                      className="flex justify-between items-center px-2 py-1 rounded"
                    >
                      <span className={`${r.color}`}>• {r.text}</span>
                      <button
                        onClick={() =>
                          deleteReminder(
                            selectedDate.toISOString().split("T")[0],
                            i
                          )
                        }
                        className="text-sm text-red-500 w-16 border-[1px] border-red-500 bg-red-100 hover:bg-red-500 hover:text-white rounded-xl px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default CalendarComp;
