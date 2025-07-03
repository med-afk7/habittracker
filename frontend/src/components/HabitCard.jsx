import React, { useState } from 'react';
import './habitCard.css';
import { deleteHabit, updateHabitTracking } from '../api';

const DAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const getCurrentWeekString = () => {

  const now = new Date();
  const jan1 = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now - jan1) / (24 * 60 * 60 * 1000));
  const week = Math.ceil((days + jan1.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;


};


const HabitCard = ({ _id, name, tracking = {}, onDelete }) => {
  const week = getCurrentWeekString();

  const [localTracking, setLocalTracking] = useState({
    ...tracking,
    [week]: tracking[week] || Array(7).fill(false),
  });

  const handleToggleDay = async (dayIndex) => {
    const updatedArray = [...(localTracking[week] || Array(7).fill(false))];
    updatedArray[dayIndex] = !updatedArray[dayIndex];

    const updatedTracking = {
      ...localTracking,
      [week]: updatedArray,
    };

    setLocalTracking(updatedTracking);

    try {
      await updateHabitTracking(_id, week, updatedArray);
    } catch (err) {
      console.error('Update failed:', err.message);
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
    <div className="habit-card">
      <h3>{name}</h3>

      <div className="days-container">
        {DAYS.map((day, idx) => (
          <div key={day} className="day-wrapper">
            <div className="day-label">{day}</div>
            <div
              className={`day-box ${localTracking[week]?.[idx] ? 'active' : ''}`}
              onClick={() => handleToggleDay(idx)}
            ></div>
          </div>
        ))}
      </div>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default HabitCard;
