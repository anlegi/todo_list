import Project from "./project";
import ToDo from "./new_todo";

export const defaultLocalStorage = [new Project("My Tasks")];

function initializeLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(defaultLocalStorage));
}

function getProjectsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("projects"))
}

function saveProjectToLocalStorage(project){
  const projectData = localStorage.getItem("projects")
  const projects = JSON.parse(projectData)
  projects.push(project)
  localStorage.setItem("projects", JSON.stringify(projects));
}


function loadProjectsFromLocalStorage() {
  const projectsData = localStorage.getItem('projects');
  if (projectsData) {
    const projectsArray = JSON.parse(projectsData);

    // Convert plain objects back into Project and ToDo instances
    const projects = projectsArray.map(projData => {
      const project = new Project(projData.name);
      project.id = projData.id; // Assuming IDs are saved and loaded correctly
      project.todos = projData.todos.map(todoData => {
        return new ToDo(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.projectId);
      });
      return project;
    });

    return projects;
  }
  return defaultLocalStorage;
}



export {initializeLocalStorage, loadProjectsFromLocalStorage, saveProjectToLocalStorage, getProjectsFromLocalStorage}
