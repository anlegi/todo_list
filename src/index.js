import { displayProjects, displayTodos } from "./display";
import { saveProjects, loadProjects } from "./storage";
import Project from "./project";
import ToDo from "./new_todo";
import displayUnassignedTodos from "./display_todo"


// Stores all of our projects
let projects = [];

loadProjects(projects);
saveProjects(projects);



document.addEventListener('DOMContentLoaded', displayProjects(projects));

document.getElementById('addProject').addEventListener('click', function() {
  const projectName = document.getElementById('newProjectName').value;
  console.log("Project name: ", projectName);
  if (projectName) {
    const newProject = new Project(projectName);
    projects.push(newProject);
    displayProjects(projects);
    document.getElementById('newProjectName').value = '';
  }
});

document.getElementById('addTodo').addEventListener('click', function() {
  const myTasks = document.querySelector("#todoList");
  const todoTitle = document.getElementById("newTodoTitle").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("date").value;
  const priority = document.getElementById("newTodoPriority").value;
  const newTodo = new ToDo(todoTitle, description, dueDate, priority);

  const todoItem = document.createElement('div');
  todoItem.classList.add('todo-item');
  todoItem.innerHTML = `
    <h3>${newTodo.title}</h3>
    <p>Due Date: ${newTodo.getFormattedDueDate()}</p>
    <label><input type="checkbox" class="todo-done-checkbox" ${newTodo.isComplete ? "checked" : ""}> Done</label>
    <button class="details">Details</button>
    <button class="delete-todo">Delete</button>
  `;

  // Attach a click event listener to the details button inside the todo item
  todoItem.querySelector('.details').addEventListener("click", () => {
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
      <h3>${newTodo.title}</h3>
      <p>Due Date: ${newTodo.getFormattedDueDate()}</p>
      <p>Description: ${newTodo.description}</p>
      <p>Priority: ${newTodo.priority}</p>
      <p>Done: ${newTodo.isComplete}</p>
      <button class="close-dialog">Close</button>
    `;

    document.body.appendChild(dialog);

    const checkbox = todoItem.querySelector('.todo-done-checkbox');
    checkbox.addEventListener('change', (e) => {
      newTodo.isComplete = e.target.checked;
    });

    // Close button inside the dialog
    dialog.querySelector('.close-dialog').addEventListener('click', () => {
      dialog.close();
    });

    dialog.showModal();
  });

  myTasks.appendChild(todoItem);

  // Reset input fields
  document.getElementById("newTodoTitle").value = '';
  document.getElementById("description").value = '';
  document.getElementById("date").value = '';
  document.getElementById("newTodoPriority").value = 'Priority';
});
