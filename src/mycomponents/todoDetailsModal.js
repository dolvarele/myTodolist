import { useState } from 'react';

export const TodoDetailsModal = ({ closeModal, selectedTaskDetails, editTodoFromModal, deleteTodoFromModal }) => {
    
    const handleEditModal = () => {
      editTodoFromModal(selectedTaskDetails.id, 
        selectedTaskDetails.description,
        selectedTaskDetails.duration
      );
      //closeModal();
    };
  
    const handleDeleteModal = () => {
      deleteTodoFromModal(selectedTaskDetails.id);
      closeModal();
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Détails de la tâche</h2>
  
          <div className="descrip">
            <textarea className="todo-textarea" 
              placeholder="Description of task"
              value={selectedTaskDetails.description}>
            </textarea>
            <input type="number" 
              placeholder="Time" 
              className="input-time"
              value={selectedTaskDetails.duration}
            />
          </div>
          <input type="text" 
            className="todo-input"
            placeholder='Creation date'
            value={selectedTaskDetails.creationDate}
          />
  
          <div className="button-container">
            <button className="edit-btn" onClick={handleEditModal}>
              Modifier
            </button>
            <button className="delete-btn" onClick={handleDeleteModal}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  };