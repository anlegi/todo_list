import { format, parseISO} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

class ToDo {
  constructor(title, description, dueDate, priority, projectId) {
    this.id = uuidv4(); // assign a unique ID
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
    this.projectId = projectId;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  getFormattedDueDate() {
    // Check if dueDate is truthy to avoid errors with empty or undefined values
    return this.dueDate ? format(parseISO(this.dueDate), 'd. MMM. y') : 'No due date';
  }

  markTodoAsComplete() {
    this.isComplete = true
  }

  changeTodoPriority(newPriority) {
    this.priority = newPriority
  }

  // Method to create a project instance from a plain object
  static fromPlainObject(obj) {
    const todo = new ToDo(obj.title, obj.description, obj.dueDate, obj.priority, obj.projectId);
    return todo;
  }
}

export default ToDo;
