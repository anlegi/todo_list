import { displayProjects, displayTodos } from "./display";
import {initializeLocalStorage, loadProjectsFromLocalStorage, saveProjectToLocalStorage, getProjectsFromLocalStorage} from "./storage";
import { defaultLocalStorage } from "./storage";
import Project from "./project";
import ToDo from "./new_todo";
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  initializeLocalStorage();
  displayProjects(defaultLocalStorage);
  loadProjectsFromLocalStorage()
});


document.getElementById('addProject').addEventListener('click', function() {
  const projectName = document.getElementById('newProjectName').value;
  console.log("Project name: ", projectName);
  if (projectName) {
    const newProject = new Project(projectName);
    saveProjectToLocalStorage(newProject);
    displayProjects(getProjectsFromLocalStorage());
    document.getElementById('newProjectName').value = '';
  }
  // saveProjectsToLocalStorage();
});


document.getElementById('openTodoDialog').addEventListener('click', function() {
  document.getElementById('todoDialog').showModal();
});

document.getElementById('cancelTodo').addEventListener('click', function() {
  document.getElementById('todoDialog').close();
});

document.querySelector('#todoDialog form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting in the traditional way

  const todoTitle = document.getElementById("newTodoTitle").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("date").value;
  const priority = document.getElementById("newTodoPriority").value;
  const selectedProjectName = document.getElementById("project").value;

  const projects = getProjectsFromLocalStorage();
  const selectedProject = projects.find(project => project.name === selectedProjectName);
  const selectedProjectWithMethod = Project.fromPlainObject(selectedProject)
  console.log(selectedProjectWithMethod)

  if (selectedProjectWithMethod) {
    const newTodo = new ToDo(todoTitle, description, dueDate, priority, selectedProject.id);
    selectedProjectWithMethod.addTodo(newTodo);
    // saveProjectToLocalStorage(selectedProjectWithMethod);
    displayTodos(selectedProjectWithMethod);
    // Close dialog and reset form
    document.getElementById('todoDialog').close();
    event.target.reset();
  } else {
    console.error('Selected project not found');
  }
});






// document.getElementById('project').addEventListener('change', function() {
//   const selectedProjectName = this.value;
//   const selectedProject = projects.find(project => project.name === selectedProjectName);
//   if (selectedProject) {
//     displayTodos(selectedProject);
//   }
// });
