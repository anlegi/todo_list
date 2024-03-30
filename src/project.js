import ToDo from "./new_todo.js";

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
}


export default Project