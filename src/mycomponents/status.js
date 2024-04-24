
import React, {useState} from 'react'
//**********************************************status********************************************************** */
export const Status = ({ initialStatus, onChange }) => {
    const [status, setStatus] = useState(initialStatus);
  
    const handleStatusChange = (e) => {
      setStatus(e.target.value);
      onChange(e.target.value);
    };
  
    return (
      <select className ="status-btn" value={status} onChange={handleStatusChange}>
        <option value="en cours">En cours</option>
        <option value="bloqué">Bloqué</option>
        <option value="terminé">Terminé</option>
      </select>
    );
  };

  /*export const selectedStatus = ({ initialStatus, onChange }) => {
    //const [status, setStatus] = useState(initialStatus);
  
    const handleStatusChange = (e) => {
      setStatus(e.target.value);
      onChange(e.target.value);
    };
  
    return (
      <select className ="status-btn" value={status} onChange={handleStatusChange}>
        <option value="en cours">En cours</option>
        <option value="bloqué">Bloqué</option>
        <option value="terminé">Terminé</option>
      </select>
    );
  };*/