
import React, {useState, useEffect} from 'react';

//uuidv4();

function App() {
    return (
      <div className="App">
        <TodoWrapperLocalStorage  />
      </div>
    );
  }
  
  export default App;

  //*************************************TodoWrapperLocalStorage******************************************
  export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]);
     const id = crypto.randomUUID();
  
    useEffect(() => {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(savedTodos);
    }, []);
  
    const addTodo = (todo, status) => {
      const newTodos = [
        ...todos,
        {
          id: id,
          task: todo,
          completed: false,
          isEditing: false,
          status: status,
        },
      ];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    };
  
    const toggleComplete = (id) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    };
  
    const deleteTodo = (id) => {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    };
  
    const editTodo = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    };
  
    const editTask = (task, id , status) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, task,status, isEditing: !todo.isEditing } : todo
      );
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    };
  
    const changeStatus = (status, id) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      );
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    };
  
    const filterByDay = (day) => {
      const filteredTodos = todos.filter((todo) => {
        const todoDate = new Date(todo.day);
        return todoDate.getDay() === day;
      });
      return filteredTodos;
    };
  
    return (
      <div className="TodoWrapper">
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={addTodo} />
        <DatePicker filterByDay={filterByDay} /> {/* Nouveau composant pour sélectionner les jours */}
        {todos.map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo
              task={todo}
              key={index}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              changeStatus={changeStatus} // Nouvelle fonction pour changer le statut
            />
          )
        )}
      </div>
    );
  };
  
  
  //************************************* */ todo******************************************
  export const Todo = ({task,   deleteTodo, editTodo, toggleComplete}) => {
    return (
      <div className="Todo">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>
          {task.task}
        </p>
        <div>
          <button className="edit-btn"  onClick={() => editTodo(task.id)} > Edit</button>
          <button className="delete-btn"  onClick={() => deleteTodo(task.id)} >Delete</button>
          <span className="status-btn"> {task.status}</span> {/* Affichage du statut de la tâche */}
        </div>
      </div>
    )
  }

  //*****************************************todoform*****************************************
  export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState("En cours");

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value.trim() !== '' && status.trim() !== '') {
          // add todo
          addTodo(value, status);
          // clear form after submission
          setValue('');
          setStatus("en cours");
        }
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
        placeholder='What is the task today?'
      />
      <button type="submit" className='todo-btn'>Add Task</button>
      <Status initialStatus={status} onChange={handleStatusChange} />
    </form>
  )
}

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
      <button type="submit" className='todo-btn'>Add Task</button>
      <Status initialStatus={status} onChange={handleStatusChange} />
    </form>
  )
}

//**********************************************status********************************************************** */
const Status = ({ initialStatus, onChange }) => {
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


//*************************************************DatePicker************************************************ */

export const DatePicker = ({ filterByDay }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDaySelection = (e) => {
    const selectedDay = e.target.value;
    setSelectedDay(selectedDay);
    if (selectedDay) {
      const day = new Date(selectedDay).getDay();
      filterByDay(day);
    }
  };

  return (
    <div className="DatePicker">
      <label htmlFor="dayPicker" className="date-label">Select a day:</label>
      <select className="selectdate-btn" id="dayPicker" onChange={handleDaySelection}>
        <option value="">All</option>
        <option value={new Date().toISOString()}>Today</option>
        <option value={new Date(Date.now() + 86400000).toISOString()}>Tomorrow</option>
        <option value='Monday'>Monday</option>
        <option value='Tuesday'>Tuesday</option>
        <option value='Wednesday'>Wednesday</option>
        <option value='Thursday'>Thursday</option>
        <option value='Friday'>Friday</option>
        <option value='Saturday'>Saturday</option>
        <option value='Sunday'>Sunday</option>
        {/* Add more options for different days */}
      </select>
    </div>
  );
};