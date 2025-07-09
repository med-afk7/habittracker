import React ,{useState , useEffect}from 'react'
import MonthHabitCard  from "../components/Monthlycard"
import '../components/habitCard.css'
import { getAllHabits } from '../api'; // make sure this function exists



const MonthHabits = () => {
const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const data = await getAllHabits();
      setHabits(data);
    } catch (err) {
      console.error('Failed to fetch habits:', err.message);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  return (
    <div>
{habits.map((habit) => (
  <MonthHabitCard
    key={habit._id}
    _id={habit._id}
    name={habit.name}
    tracking={habit.tracking}
    onDelete={() => fetchHabits()} // or your delete logic
  />
))}

    </div>
  )
}

export default MonthHabits