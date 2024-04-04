class Project {
  constructor(name) {
    this.name = name
    this.todos = []
  }

  addTodo(todo) {
    this.todos.push(todo)
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId)
  }

  getTodo(todoId) {
    return this.todos.find(todo => todo.id === todoId)
  }
  // TODO implement static remove project function
  removeProject() {
    localStorage.projects.forEach(project => {
      if (project.name == this.name) {
        localStorage.removeItem()
      }
    });
  }

}


export default Project;
