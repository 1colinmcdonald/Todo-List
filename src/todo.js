import todoDatabase from "./todoStorageInterface";

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.dateCreated = Date.now();
    }
}

class TodoList {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }
}

if (todoDatabase.todoLists.length === 0) {
    todoDatabase.todoLists = [new TodoList("Default Todo List")]
}

export function addList(name) {
    const todoLists = todoDatabase.todoLists;
    todoLists.push(new TodoList(name));
    todoDatabase.todoLists = todoLists;
}

export function removeList(listIndex) {
    const todoLists = todoDatabase.todoLists;
    if (listIndex >= 0 && listIndex < todoLists.length) {
        todoLists.splice(listIndex, 1);
        todoDatabase.todoLists = todoLists;
    }
}

export function addTask(listIndex, title, description, dueDate, priority) {
    const todoLists = todoDatabase.todoLists;
    const task = new Todo(title, description, dueDate, priority);
    task.index = todoLists[listIndex].todos.length;
    todoLists[listIndex].todos.push(task);
    todoDatabase.todoLists = todoLists;
}

export function removeTask(listIndex, taskIndex) {
    const todoLists = todoDatabase.todoLists;
    if (listIndex >= 0 && listIndex < todoLists.length && taskIndex >= 0 && taskIndex < todoLists[listIndex].todos.length) {
        todoLists[listIndex].todos.splice(taskIndex, 1);
        todoDatabase.todoLists = todoLists;
    }
}

export function getTasksFromList(listIndex) {
    return todoDatabase.todoLists[listIndex].todos;
}

export function getTodoLists() {
    return todoDatabase.todoLists;
}

export function renameList(index, newName) {
    const newVersion = todoDatabase.todoLists
    console.log(`index: ${index}`);
    newVersion[index].name = newName;
    todoDatabase.todoLists = newVersion;
}