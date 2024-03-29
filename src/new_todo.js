import { format } from 'date-fns';

class ToDo {
  constructor(title, description, dueDate, priority, notes = [], checklist = []) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.isComplete = false;
  }

  addChecklistItem(itemDescription, completed = false) {
    this.checklist.push({ description: itemDescription, completed });
  }

  markChecklistItemCompleted(index) {
    if (index >= 0 && index < this.checklist.length) {
      this.checklist[index].completed = true;
    }
  }

  updatePriority(newPriority) {
    this.priority = newPriority;
  }

  getFormattedDueDate() {
    return format(this.dueDate, 'PPP');
  }
}

export default ToDo;
