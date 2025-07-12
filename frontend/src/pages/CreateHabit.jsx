import React, { useState } from 'react';
import './createHabit.css';
import { createHabit } from '../api';
import { useNavigate } from 'react-router-dom';
import {motion } from 'framer-motion';

const CreateHabit = () => {
  const navigate = useNavigate();
  const [newHabit, setNewHabit] = useState({ name: '' });

  const handleChange = (e) => {
    setNewHabit({ ...newHabit, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // <-- Important to prevent page reload
    if (!newHabit.name.trim()) return;

    try {
      const res = await createHabit(newHabit);
      console.log('Habit created:', res.data);
      setNewHabit({ name: '' });
      navigate('/');
    } catch (error) {
      console.error('Failed to create habit:', error.message);
    }
  };

  return (
    <>
    <motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.6 }}
			
		>
      <h1 className="title">Habits</h1>

      <form onSubmit={handleSubmit}>
        <label>Enter a habit</label>
        <input
          type="text"
          placeholder="Enter the habit"
          value={newHabit.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Habit</button>
      </form>
      </motion.div>
    </>
  );
};

export default CreateHabit;
