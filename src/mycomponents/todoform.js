import { useState } from 'react';
import { Status } from "./status";

//*****************************************todoform*****************************************
export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');
    const [status, setStatus] = useState("En cours");
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() !== '' && status.trim() !== '' ) {
            addTodo(value, status, description, duration);
            setValue('');
            setStatus("En cours");
            setDescription('');
            setDuration('');
            setShowModal(true);
        }
    };

    const handleStatusChange = (selectedStatus) => {
        setStatus(selectedStatus);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };
    
    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input type="text" 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                className="todo-input"
                placeholder='What is the task today?'
            />
            <Status initialStatus={status} onChange={handleStatusChange} />
            <div className="descrip">
                <textarea className="todo-textarea" 
                    placeholder="Description of task"
                    value={description}
                    onChange={handleDescriptionChange}
                >
                </textarea>
                <input type="number" placeholder="Time" className="input-time" 
                    value={duration}
                    onChange={handleDurationChange}
                />
            </div>
            <button type="submit" className='todo-btn'>Add Task</button>
        </form>
    )
}
