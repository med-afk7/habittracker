export async function getAllHabits(){
    const res = await fetch ('/api/habits');
    if(!res.ok) throw new Error("failed to fetch habits");
    return res.json();
}

export const createHabit = async (habit) => {
  try {
    const response = await fetch('/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(habit),
    });

    if (!response.ok) {
      throw new Error('Failed to create habit');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating habit:', error);
    throw error;
  }
};


export const deleteHabit = async (id) =>{
  const res = await fetch(`/api/habits/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete habit');
}
export const updateHabitTracking = async (id, week, trackingArray) => {
  const res = await fetch(`/api/habits/${id}/tracking`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ week, trackingArray }),
  });

  if (!res.ok) throw new Error('Failed to update tracking');
  return res.json();
};
