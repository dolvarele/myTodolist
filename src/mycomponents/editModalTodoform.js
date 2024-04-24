import { useState } from 'react';

/*******************************************editModaltodoform***********************************/
export const EditModalTodoForm = ({editTodoFromModal, task, closeModal }) => {
 
    const [description, setDescription] = useState(task.description);
    const [duration, setDuration] = useState(task.duration);
  
    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleDurationChange = (e) => {
      setDuration(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      editTodoFromModal(task.id, description, duration);
      closeModal();
    };
  
    const handleEditModal = () => {
      handleSubmit();
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Détails de la tâche</h2>
  
          <div className="descrip">
            <textarea
              className="todo-textarea"
              placeholder="Description of task"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
  
            <input
              type="number"
              placeholder="Time"
              className="input-time"
              value={duration}
              onChange={handleDurationChange}
            />
          </div>
          <input
            type="text"
            className="todo-input"
            placeholder="Creation date"
            value={task.creationDate}
            readOnly
          />
  
          <div className="button-container">
            <button className="edit-btn" onClick={handleEditModal}>
              Modifier
            </button>
          </div>
        </div>
      </div>
    );
  };
  //****************************************************Modal******************************** */
  
  
 