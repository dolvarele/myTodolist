
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
    const [todos, setTodos] = useState([])
    const id = crypto.randomUUID();
  
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(savedTodos);
    }, []);
  
    const addTodo = todo => {
        const newTodos = [...todos, {id, task: todo, completed: false, isEditing: false}];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  
    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  
    const deleteTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  
    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }
  
    const editTask = (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
  return (
    <div className='TodoWrapper'>
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            )
            
        ))}
         
    </div>
  )
  }
  
  //************************************* */ todo******************************************
  export const Todo = ({task, deleteTodo, editTodo, toggleComplete}) => {
    return (
      <div className="Todo">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>
          {task.task}
        </p>
        <div>
          <button className="edit-icon"  onClick={() => editTodo(task.id)} > edit</button>
          <button className="delete-icon"  onClick={() => deleteTodo(task.id)} >Delete</button>
        </div>
      </div>
    )
  }

  //*****************************************todoform*****************************************
  export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          // add todo
          addTodo(value);
          // clear form after submission
          setValue('');
        }
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
    </form>
  )
}

//*******************************************edittodoform***********************************
export const EditTodoForm = ({editTodo, task}) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editTodo(value, task.id);
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
    </form>
  )
}






