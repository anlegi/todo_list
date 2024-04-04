import { displayProjects, displayTodos } from "./display";
import {saveProjectsToLocalStorage, loadProjectsFromLocalStorage} from "./storage";
import Project from "./project";
import ToDo from "./new_todo";
import './style.css';
import { projects } from "./project_arr";



// Stores all of our projects
// const myTaskProject = new Project("My Tasks");
// let projects = [myTaskProject];




// loadProjects(projects);
// saveProjects(projects);

// document.addEventListener('DOMContentLoaded', displayProjects(projects));

document.addEventListener('DOMContentLoaded', () => {
  loadProjectsFromLocalStorage();
  displayProjects(projects);
});

document.getElementById('addProject').addEventListener('click', function() {
  const projectName = document.getElementById('newProjectName').value;
  console.log("Project name: ", projectName);
  if (projectName) {
    const newProject = new Project(projectName);
    projects.push(newProject);
    displayProjects(projects);
    document.getElementById('newProjectName').value = '';
  }
  saveProjectsToLocalStorage();
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
  const selectedProject = projects.find(project => project.name === selectedProjectName);

  if (selectedProject) {
    const newTodo = new ToDo(todoTitle, description, dueDate, priority, selectedProject);
    selectedProject.addTodo(newTodo);
    displayTodos(selectedProject);

    // Close dialog and reset form
    document.getElementById('todoDialog').close();
    event.target.reset();
  } else {
    console.error('Selected project not found');
  }

  saveProjectsToLocalStorage();
});






// document.getElementById('project').addEventListener('change', function() {
//   const selectedProjectName = this.value;
//   const selectedProject = projects.find(project => project.name === selectedProjectName);
//   if (selectedProject) {
//     displayTodos(selectedProject);
//   }
// });
