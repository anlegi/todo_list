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
    const projectRow = document.createElement("div")
    const projectElement = document.createElement('div');
    projectRow.classList.add("project-row")
    projectElement.textContent = project.name;
    projectElement.classList.add('project-item');

    projectRow.appendChild(projectElement);
    projectList.appendChild(projectRow)

    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    deleteBtn.classList.add("delete-project")
    projectRow.appendChild(deleteBtn)
    projectList.appendChild(projectRow)

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

      console.log("displayProject:", )
      displayTodos(getOneProjectFromLocalStorage(project.id)); // Display todos associated with this project
    });


    deleteBtn.addEventListener("click", () => {
      Project.removeProject(project.name)

      displayProjects(JSON.parse(localStorage.getItem('projects')) || []);
      displayTodos(getOneProjectFromLocalStorage(project.id) || []); // update the display to reflect the removal
    })
  });
}


function displayTodos(selectedProject) {
  selectedProject = Project.fromPlainObject(selectedProject);

  const todoList = document.getElementById('todoList');
  todoList.innerHTML = ''; // Clear existing todos

  // Display the project name as a header above the todos
  const projectNameHeader = document.createElement('h2');
  projectNameHeader.classList.add("project-header")
  projectNameHeader.textContent = selectedProject.name;
  todoList.appendChild(projectNameHeader);

  // Loop through todos in the selected project and create elements for each
  selectedProject.todos.forEach(todo => {
    const todoObject = ToDo.fromPlainObject(todo);
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    // Create a flex container for content and buttons
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('todo-flex-container');

    // Checkbox and content
    const content = document.createElement('div');
    content.classList.add('todo-content');
    content.innerHTML = `
        <label><input type="checkbox" class="todo-done-checkbox" ${todoObject.isComplete ? "checked" : ""}></label>
        <h3>${todoObject.title}</h3>
        <p><i class="fa-regular fa-calendar"></i> ${todoObject.getFormattedDueDate()}</p>
    `;

    // Buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('todo-buttons');
    buttonsContainer.innerHTML = `
      <button class="details"><i class="fas fa-info-circle"></i></button>
      <button class="delete-todo"><i class="fas fa-trash"></i></button>
    `;

    // Append content and buttons to the flex container
    flexContainer.appendChild(content);
    flexContainer.appendChild(buttonsContainer);

    // Append the flex container to the todo item
    todoItem.appendChild(flexContainer);

    // Existing event listeners and logic for details, delete, and checkbox
    // ...

    todoItem.querySelector('.details').addEventListener("click", () => {
      const dialog = document.createElement("dialog");
      dialog.classList.add("dialog-details")
      dialog.innerHTML = `
        <h3>${todoObject.title}</h3>
        <p>Description: ${todoObject.description}</p>
        <p>Due Date: ${todoObject.getFormattedDueDate()}</p>
        <p>Priority: ${todoObject.priority}</p>

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

    // Delete todo
    todoItem.querySelector('.delete-todo').addEventListener('click', () => {
      //selectedProject.removeTodo(todo.id);
      selectedProject.removeTodo(todo.id)
      displayTodos(getOneProjectFromLocalStorage(selectedProject.id)); // Refresh the todo list for the current project
    });

    todoList.appendChild(todoItem);
  });
}


export { displayProjects, displayTodos }
