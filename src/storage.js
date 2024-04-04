import Project from "./project";
import ToDo from "./new_todo";
import { projects } from "./project_arr";

function saveProjectsToLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjectsFromLocalStorage() {
  const projectsData = localStorage.getItem('projects');
  if (projectsData) {
    const projectsArray = JSON.parse(projectsData);
    // Clear the existing projects array
    // projects.length = 0;
    // Populate the projects array with loaded projects
    projectsArray.forEach(projectData => {
      let project = new Project(projectData.name);
      project.todos = projectData.todos.map(todoData => {
        let todo = new ToDo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
        todo.isComplete = todoData.isComplete;
        return todo;
      });
      projects.push(project);
    });
  }
}

export {saveProjectsToLocalStorage, loadProjectsFromLocalStorage }
