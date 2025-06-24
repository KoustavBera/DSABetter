import { useState } from "react";
import Calendar from "react-calendar";

function CalendarComp2() {
  const [value, onChange] = useState(new Date());

  // Get next month's date
  const getNextMonth = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth;
  };

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
        onChange={onChange}
        value={value}
        className="custom-calendar"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        activeStartDate={getNextMonth()}
      />
    </div>
  );
}

export default CalendarComp2;
