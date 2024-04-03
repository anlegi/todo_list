
function displayProjects(projects) {
  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';

  // Loop through all projects and create an element for each
  projects.forEach(project => {
    const projectElement = document.createElement('li');
    projectElement.textContent = project.name;
    projectElement.classList.add('project-item');

    projectElement.addEventListener('click', () => {
      displayTodos(project)
    });

    projectList.appendChild(projectElement);
  });
}


function displayTodos(project) {
  const todoList = document.getElementById('todoList')
  todoList.innerHTML = ''

  project.todos.forEach(todo => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Due Date: ${todo.getFormattedDueDate()}</p>
      <p>Priority: ${todo.priority}</p>
      <button class="delete-todo">Delete</button>
    `;
    todoItem.querySelector('.delete-todo').addEventListener('click', () => {
      project.removeTodo(todo.id);
      displayTodos(project); // Refresh todo list
    });
    todoList.appendChild(todoItem);
  });
}

export { displayProjects, displayTodos }
