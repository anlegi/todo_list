function displayUnassignedTodos(unassignedTodos) {
  const todoList = document.getElementById('todoList')
  todoList.innerHTML = '';

  unassignedTodos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Due Date: ${todo.getFormattedDueDate()}</p>
      <p>Priority: ${todo.priority}</p>
      <button class="delete-todo">Delete</button>
    `;

    todoList.appendChild(todoItem);
  });
}

export default displayUnassignedTodos
