import { format, parseISO} from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

class ToDo {
  constructor(title, description, dueDate, priority) {
    this.id = uuidv4(); // assign a unique ID
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  getFormattedDueDate() {
    // Check if dueDate is truthy to avoid errors with empty or undefined values
    return this.dueDate ? format(parseISO(this.dueDate), 'PPP') : 'No due date';
  }

  markTodoAsComplete() {
    this.isComplete = true
  }

  changeTodoPriority(newPriority) {
    this.priority = newPriority
  }
}

export default ToDo;
