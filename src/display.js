import Project from "./project";
import ToDo from "./new_todo";
import { getOneProjectFromLocalStorage } from "./storage";

function displayProjects(projects) {
  const projectList = document.getElementById('projectList');
  const projectDropdown = document.getElementById("project")
  projectList.innerHTML = "";
  projectDropdown.innerHTML = "";

  // TODO add delete button on project item and call remove project function
  // Loop through all projects and create an element for each
  projects.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.textContent = project.name;
    projectElement.classList.add('project-item');
    projectList.appendChild(projectElement);

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("delete-project")
    projectList.appendChild(deleteBtn)

    const optionElement = document.createElement("option")
    optionElement.value = project.name
    optionElement.textContent = project.name
    projectDropdown.appendChild(optionElement)

    projectElement.addEventListener('click', () => {
      // Remove class from all project items
      document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('active-project');
      });

      // Add class to the clicked project
      projectElement.classList.add('active-project');

      displayTodos(getOneProjectFromLocalStorage(project.id)); // Display todos associated with this project
    });


    deleteBtn.addEventListener("click", () => {
      Project.removeProject(project.name)

      displayProjects(JSON.parse(localStorage.getItem('projects')) || []); // update the display to reflect the removal
    })
  });
}


function displayTodos(selectedProject) {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = ''; // Clear existing todos

  // Display the project name as a header above the todos
  const projectNameHeader = document.createElement('h2');
  projectNameHeader.textContent = selectedProject.name;
  todoList.appendChild(projectNameHeader);

  // Loop through todos in the selected project and create elements for each
  selectedProject.todos.forEach(todo => {
    const todoObject = ToDo.fromPlainObject(todo)
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
      <h3>${todoObject.title}</h3>
      <p>Description: ${todoObject.description}</p>
      <p>Due Date: ${todoObject.getFormattedDueDate()}</p>
      <p>Priority: ${todoObject.priority}</p>
      <label><input type="checkbox" class="todo-done-checkbox" ${todoObject.isComplete ? "checked" : ""}> Done</label>
      <button class="details">Details</button>
      <button class="delete-todo">Delete</button>
    `;

    todoItem.querySelector('.details').addEventListener("click", () => {
      const dialog = document.createElement("dialog");
      dialog.innerHTML = `
        <h3>${todoObject.title}</h3>
        <p>Du e Date: ${todoObject.getFormattedDueDate()}</p>
        <p>Description: ${todoObject.description}</p>
        <p>Priority: ${todoObject.priority}</p>
        <p>Done: ${todoObject.isComplete}</p>
        <button class="close-dialog">Close</button>
      `;
      document.body.appendChild(dialog);

      const checkbox = todoItem.querySelector('.todo-done-checkbox');
        checkbox.addEventListener('change', (e) => {
          todoObject.isComplete = e.target.checked;
        });

        // Close button inside the dialog
      dialog.querySelector('.close-dialog').addEventListener('click', () => {
      dialog.close();
      });

      dialog.showModal();
    })

    // Delete todo functionality (make sure this works as intended)
    todoItem.querySelector('.delete-todo').addEventListener('click', () => {
      //selectedProject.removeTodo(todo.id);
      displayTodos(selectedProject); // Refresh the todo list for the current project
    });

    todoList.appendChild(todoItem);
  });
}


export { displayProjects, displayTodos }
