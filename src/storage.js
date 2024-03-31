import Project from "./project";
import ToDo from "./new_todo";

function saveProjects(projects) {
  const projectsData = projects.map(project => { // create new array of project objects w map
    return {
      name: project.name,
      todos: project.todos.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          priority: todo.priority,
          isComplete: todo.isComplete
        };
      })
    };
  });

  localStorage.setItem('projects', JSON.stringify(projectsData)); // setItem(keyName, keyValue)
}


function loadProjects(projects) {
  const projectsData = JSON.parse(localStorage.getItem('projects'));
  if (!projectsData) return;

   // Clear existing projects before loading
  projects.length = 0;

  projectsData.forEach(projectData => {
    const project = new Project(projectData.name);
    projectData.todos.forEach(todoData => {
      const todo = new ToDo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
      );
      todo.id = todoData.id;
      todo.isComplete = todoData.isComplete;
      project.addTodo(todo);
    });
    projects.push(project);
  });
}

export { saveProjects, loadProjects };
