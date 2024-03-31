import changeTodoPriority from "./change_priority.js";
import ToDo from "./new_todo.js"
import markTodoAsComplete from "./update_todo.js"
import { saveProjects, loadProjects } from "./storage";

let projects = [];


saveProjects(projects);
loadProjects(projects);

const myToDo = new ToDo("Finish assignment", "Complete the JavaScript assignment by Friday", "2023-12-31", "High");

myToDo.addChecklistItem('Setup project structure', true);
myToDo.addChecklistItem('Implement feature X');

// console.log(myToDo.isComplete)
// markTodoAsComplete(myToDo)

// console.log(myToDo.isComplete)
changeTodoPriority(myToDo, "Low")
console.log(myToDo)

console.log(myToDo.getFormattedDueDate())


import Project from './project';


const defaultProject = new Project('Default');
const personalProject = new Project('Personal');



const todo1 = new ToDo('Finish project', 'Complete by end of the week', '2024-03-31', 'High');
const todo2 = new ToDo('Buy groceries', 'Milk, Eggs, Bread', '2024-04-01', 'Medium');


defaultProject.addTodo(todo1);
personalProject.addTodo(todo2);
personalProject.addTodo(todo1);


console.log('Default Project Todos:', defaultProject.todos);
console.log('Personal Project Todos:', personalProject.todos);


defaultProject.removeTodo(todo1.id);
console.log('Default Project Todos after removal:', defaultProject.todos);
