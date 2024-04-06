// import { projects } from "./project_arr"
import { v4 as uuidv4 } from 'uuid';

class Project {
  // "null" is the default value of "id" if id not specified during
  // instanciation; same for todos
  constructor(name, id = null, todos = []) {
    this.id = id || uuidv4();
    this.name = name;
    this.todos = todos;
  }

  addTodo(todo) {
    todo.projectId = this.id;
    this.todos.push(todo)
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId)
  }

  getTodo(todoId) {
    return this.todos.find(todo => todo.id === todoId)
  }


  static removeProject(projectName) {
    const projectData = localStorage.getItem("projects")
    if (projectData) {
      const projects = JSON.parse(projectData)
      // if there is a project, then turn the project string into json format
      const updatedProjects = projects.filter(project => project.name !== projectName)

      localStorage.setItem("projects", JSON.stringify(updatedProjects))
    }
  }

  // Method to create a project instance from a plain object
  static fromPlainObject(obj) {
    const project = new Project(obj.name, obj.id, obj.todos);
    return project;
  }
}


export default Project;
