import { useState } from 'react';
import { Status } from "./status";

export const TaskList = ({ todos }) => {
  const [sortedTodos, setSortedTodos] = useState(todos);

  const handleStatusChange = (status) => {
    const sortedByStatus = todos.filter((todo) => todo.status === status);
    setSortedTodos(sortedByStatus);
  };

  return (
    <div>
      <Status initialStatus="all" onChange={handleStatusChange} />
      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  );
};