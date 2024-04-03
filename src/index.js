import { displayProjects, displayTodos } from "./display";
import { saveProjects, loadProjects } from "./storage";
import Project from "./project";
import ToDo from "./new_todo";
import './style.css';



// Stores all of our projects
const myTaskProject = new Project("My Tasks");
let projects = [myTaskProject];

// loadProjects(projects);
// saveProjects(projects);

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
  const selectedProjectName = document.getElementById("project").value;
  const selectedProject = projects.find(project => project.name === selectedProjectName);

  const newTodo = new ToDo(todoTitle, description, dueDate, priority, selectedProject)

  console.log("Selected project name:", selectedProjectName);

  if (selectedProject) {
    selectedProject.addTodo(newTodo);
    displayTodos(selectedProject);
  } else {
    console.error('Selected project not found');
  }

  // selectedProject.addTodo(todoItem);
  displayTodos(selectedProject);

  // Reset input fields
  document.getElementById("newTodoTitle").value = '';
  document.getElementById("description").value = '';
  document.getElementById("date").value = '';
  document.getElementById("newTodoPriority").value = 'Priority';
});




document.getElementById('project').addEventListener('change', function() {
  const selectedProjectName = this.value;
  const selectedProject = projects.find(project => project.name === selectedProjectName);
  if (selectedProject) {
    displayTodos(selectedProject);
  }
});
