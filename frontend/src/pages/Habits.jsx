import React from 'react'
import HabitCard from '../components/HabitCard'
import { useEffect, useState } from "react";
import { getAllHabits } from "../api";
import '../components/habitCard.css'


const Habits = () => {

const [habits,setHabits] = useState([]);

useEffect(() => {
    getAllHabits()
    .then((data) => setHabits(data))
    .catch((err) => console.error(err));
},[]);

  return (
    <div className='habits-grid'>
      
{habits.map(habit => (
 
  
  <HabitCard key={habit._id} {...habit}    onDelete={() => setHabits(habits.filter(h => h._id !== habit._id))}/>
  
 
))}


    </div>
  )
}

export default Habits