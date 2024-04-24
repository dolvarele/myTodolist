import React, {useState, useEffect} from 'react';

import { Status } from "./status";
import { DatePicker } from "./mydate";
import { TaskList } from './taskList';
import { Todo } from './todo';
import { TodoForm } from './todoform';
import { EditTodoForm } from './editTodoForm';
//import { EditModalTodoForm } from "./modal";
//import { Status } from "./status";



  //*************************************TodoWrapperLocalStorage******************************************
  export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [showFilteredTodos, setShowFilteredTodos] = useState(false); // Ajout d'une variable de contrôle
    const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);


    const id = crypto.randomUUID();
  
    useEffect(() => {
      const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(savedTodos);
    }, []);
  
    const addTodo = (todo, status, description, duration) => {
      const newTodos = [
        ...todos,
        {
          id: id,
          task: todo,
          completed: false,
          isEditing: false,
          status: status,
          day: new Date().toISOString().split("T")[0],
          description: description,
          duration: duration,
        },
      ];
      console.log(newTodos);

      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));

      setSelectedTaskDetails({
        id: id,
        description: description,
        duration: duration,
        creationDate: new Date().toLocaleDateString(),
      });
      

      setShowFilteredTodos(false); // Réinitialise la variable de contrôle lors de l'ajout d'une nouvelle tâche
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

    const closeModal = () => {
      setShowFilteredTodos(false);
      setSelectedTaskDetails(null);
    };
  
    const editTodoFromModal = (id,newDescription, newDuration) => {
      // Implementation to edit a task from the modal
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo,  description:newDescription, duration:newDuration };
        }
        return todo;
      });
      setTodos(updatedTodos);
    };
  
    const deleteTodoFromModal = (id) => {
      // Implementation to delete a task from the modal
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    };

 
    const handleStatusChange = (status) => {
      // Votre logique de gestion du changement de statut ici
      console.log('Nouveau statut sélectionné :', status);
    };

    return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />

      <div className="myfilter">
        <DatePicker filterByDay={filterByDay} />
        <label className="status-sort">Select a status:</label>
        <Status initialStatus="all" onChange={handleStatusChange} />
      </div>
      
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
              selectedTaskDetails={selectedTaskDetails} 
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

  
 
 
  