import React, {useState} from 'react'

//*************************************************DatePicker************************************************ */

export const DatePicker = ({ filterByDay }) => {
    const [selectedDay, setSelectedDay] = useState();
  
   const handleDaySelection = (e) => {
      const selectedDay = e.target.value;
      setSelectedDay(selectedDay);
      filterByDay(selectedDay);
    };
  
    /*const handleDaySelection = (e) => {
      const selectedDay = e.target.value;
      setSelectedDay(selectedDay);
      const dayValue = dayValues[selectedDay]; // Récupère la valeur numérique correspondante au jour sélectionné
      filterByDay(dayValue);
    };*/
  
    return (
      <div className="DatePicker">
        <label htmlFor="dayPicker" className="date-label">Select a day:</label>
        <select className="selectdate-btn" id="dayPicker" onChange={handleDaySelection}>
          <option value="">All</option>
          <option value={new Date().toISOString().split("T")[0]}>Today</option>
          <option value={new Date(Date.now() - 86400000).toISOString().split("T")[0]}>Yesterday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
          {/* Add more options for different days */}
        </select>
      </div>
    );
  };
  
  
  // *************************Fonction utilitaire pour formater la date*******************************
  const getFormattedDate = (dateString) => {
    const currentDate = new Date();
    const taskDate = new Date(dateString);
    const timeDiff = currentDate.getTime() - taskDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    if (daysDiff === 0) {
      return "Aujourd'hui";
    } else if (daysDiff === 1) {
      return "Hier";
    } else if (daysDiff === 2) {
      return "Il y a 2 jours";
    } else if (daysDiff >= 7) {
      return taskDate.toLocaleDateString();
    } else {
      return `Il y a ${daysDiff} jours`;
    }
  };
  
  