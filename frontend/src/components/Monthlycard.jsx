import React, { useState } from 'react';
import './Monthly.css'; // or use a new CSS file like 'monthHabitCard.css'
import { updateHabitTracking, deleteHabit } from '../api';

const getMonthString = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date)); // push copy
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const MonthHabitCard = ({ _id, name, tracking = {}, onDelete }) => {
  const now = new Date();
  const monthKey = getMonthString(now);
  const days = getDaysInMonth(now.getFullYear(), now.getMonth());

  const [localTracking, setLocalTracking] = useState(() => ({
    ...tracking,
    [monthKey]: tracking[monthKey] || Array(days.length).fill(false),
  }));

  const handleToggleDay = async (idx) => {
    const updated = [...localTracking[monthKey]];
    updated[idx] = !updated[idx];

    const updatedTracking = {
      ...localTracking,
      [monthKey]: updated,
    };

    setLocalTracking(updatedTracking);

    try {
      await updateHabitTracking(_id, monthKey, updated);
    } catch (err) {
      console.error('Failed to update habit:', err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteHabit(_id);
      onDelete();
    } catch (err) {
      console.error('Delete failed:', err.message);
    }
  };

 return (
  <div className="habit-card month-card">
    <h3 className="habit-name">{name}</h3>
    
    <div className="days-container grid-multi-row">
      {days.map((date, idx) => {
        const dayNumber = date.getDate();
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

        return (
          <div key={idx} className="day-wrapper">
            <div className="day-label">{weekday} {dayNumber}</div>
            <div
              className={`day-box small ${localTracking[monthKey][idx] ? 'active' : ''}`}
              onClick={() => handleToggleDay(idx)}
            />
          </div>
        );
      })}
    </div>

    <button className="delete-btn" onClick={handleDelete}>Delete</button>
  </div>
);

}

export default MonthHabitCard;
