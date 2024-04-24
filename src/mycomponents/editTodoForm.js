import { useState } from 'react';
import { Status } from "./status";

//*******************************************edittodoform***********************************
export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);
    const [status, setStatus] = useState("En cours");
  
    const handleSubmit = (e) => {
      // prevent default action
      e.preventDefault();
      // edit todo
      editTodo(value, task.id, status);
    };
  
    const handleStatusChange = (selectedStatus) => {
      setStatus(selectedStatus);
    };
  
    return (
      <form onSubmit={handleSubmit} className="TodoForm">
        <input type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          className="todo-input" 
          placeholder='Update task'
        />
        <button type="submit" className='todo-btn'>Modify</button>
        <Status initialStatus={status} onChange={handleStatusChange} />
      </form>
    )
  }
  
  
  
  