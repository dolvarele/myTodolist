
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
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [showFilteredTodos, setShowFilteredTodos] = useState(false); // Ajout d'une variable de contrôle

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
          day: new Date().toISOString().split("T")[0], // Ajouter la propriété "day" avec la date actuelle
        },
      ];
      //console.log(newTodos);
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));

      setShowFilteredTodos(false); // Réinitialise la variable de contrôle lors de l'ajout d'une nouvelle tâche
    };

    /*const addTodo = (todo, status) => {
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
    };*/
    

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
      //console.log(deleteTodo);
    };
  
    const editTodo = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
      //console.log(editTodo);
      setShowFilteredTodos(false); // Réinitialise la variable de contrôle lors de la modification d'une nouvelle tâche
    };
  
    /*const editTask = (task, id, status) => {
      const newTodos = todos.map((todo) =>
        todo.id === id
          ? { ...todo, task, status, day: new Date().toISOString().split("T")[0] } // Mettre à jour "day" avec la date actuelle
          : todo
      );
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
    };*/

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
  
    /*const filterByDay = (day) => {
      if (day === "") {
        setFilteredTodos(todos);
      } else {
        const filteredTodos = todos.filter((todo) => todo.day === day);
        setFilteredTodos(filteredTodos);
      }
    };*/

    const filterByDay = (day) => {
      if (day === "") {
        setFilteredTodos(todos);
      } else if (day === "Today") {
        const today = new Date().toISOString().split("T")[0];
        const filteredTodos = todos.filter((todo) => todo.day === today);
        setFilteredTodos(filteredTodos);
      } else if (day === "Yesterday") {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const filteredTodos = todos.filter((todo) => todo.day === yesterday);
        setFilteredTodos(filteredTodos);
      } else {
        const filteredTodos = todos.filter((todo) => todo.day === day);
        setFilteredTodos(filteredTodos);
      }
    
      setShowFilteredTodos(true); // Active la variable de contrôle lors de la sélection d'un jour
    };
    return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      <DatePicker filterByDay={filterByDay} />

      {showFilteredTodos ? (
        filteredTodos.map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo
              task={todo}
              key={index}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              changeStatus={changeStatus}
            />
          )
        )
      ) : (
        todos.map((todo, index) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo
              task={todo}
              key={index}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              changeStatus={changeStatus}
            />
          )
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
      <button type="submit" className='todo-btn'>Modify</button>
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
  const [selectedDay, setSelectedDay] = useState();

  const dayValues = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

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