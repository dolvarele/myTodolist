import { useState } from 'react';
import { TodoDetailsModal } from './todoDetailsModal.js';

 //************************************* */todo******************************************
 export const Todo = ({ task, deleteTodo, editTodo, toggleComplete, changeStatus }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

    const openModal = () => {
      if (showModal) {
          setShowModal(false);
      }
      setSelectedTaskDetails({
          id: task.id,
          task: task.task,
          status: task.status,
          description: task.description,
          duration: task.duration,
          creationDate: task.day,
      });
      setShowModal(true);
  };
  
    /*const openModal = () => {
      setShowModal(true);
      setSelectedTaskDetails({
        id: task.id,
        task: task.task,
        status: task.status,
        description: task.description,
        duration: task.duration,
        creationDate: task.day,
      });
    };*/
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const handleEditTodo = () => {
      editTodo(task.id, task.task, task.status);
    };
  
    const handleDeleteTodo = () => {
      deleteTodo(task.id);
    };
  
    return (
      <>
        {/*<button className="status-btn">{task.status}</button>*/}
        {!showModal && (
         
          <div className="Todo">
            <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>
              {task.task}
            </p>
            <div>
          
              <button className="status-btn" onClick={() => changeStatus(task.id, task.status)}>
                {task.status}
              </button>
              <button className="descript-btn" onClick={openModal}>Détails</button>
              <button className="edit-btn" onClick={handleEditTodo}>
                Modifier
              </button>
              <button className="delete-btn" onClick={handleDeleteTodo}>
                Supprimer
              </button>
        
            </div>
          </div>
          
        )}
        {showModal && (
        <TodoDetailsModal
          closeModal={closeModal}
          selectedTaskDetails={selectedTaskDetails}
          editTodoFromModal={editTodo}
          deleteTodoFromModal={deleteTodo}
        />
      )}
    </>
    );
  };