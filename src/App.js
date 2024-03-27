
import React, {useState, useEffect} from 'react';

//uuidv4();

function App() {
    return (
      <div className="App">
        <TodoWrapper  />
      </div>
    );
  }
  
  export default App;

  //*************************************todowrapper******************************************
  export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const id = crypto.randomUUID();
  
    const addTodo = (todo) => {
      setTodos([
        ...todos,
        { id, task: todo, completed: false, isEditing: false },
      ]);
    }
  
    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
  
    const toggleComplete = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  
    const editTodo = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    }
  
    const editTask = (task, id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    };
  
    return (
      <div className="TodoWrapper">
        <h1>Get Things Done !</h1>
        
        <TodoForm addTodo={addTodo} />
        {/* display todos */}
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )}
       {/* <TodoWrapperLocalStorage/> */}
       
      </div>
    );
  };

  
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

