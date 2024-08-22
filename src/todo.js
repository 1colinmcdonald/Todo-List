export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.dateCreated = Date.now();
    }


}

export class TodoList {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

