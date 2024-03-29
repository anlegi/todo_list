import changeTodoPriority from "./change_priority.js";
import ToDo from "./new_todo.js"
import markTodoAsComplete from "./update_todo.js"

const myToDo = new ToDo("Finish assignment", "Complete the JavaScript assignment by Friday", "2023-12-31", "High");

myToDo.addChecklistItem('Setup project structure', true);
myToDo.addChecklistItem('Implement feature X');

// console.log(myToDo.isComplete)
// markTodoAsComplete(myToDo)

// console.log(myToDo.isComplete)
changeTodoPriority(myToDo, "Low")
console.log(myToDo)

console.log(myToDo.getFormattedDueDate())
