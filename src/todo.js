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
    console.log("hello");
    todoDatabase.todoLists = [new TodoList("Default Todo List")]
    todoDatabase.todoLists;
}

export function addList(name) {
    console.log("1");
    const todoLists = todoDatabase.todoLists;
    console.log("2");
    todoLists.push(new TodoList(name));
    todoDatabase.todoLists = todoLists;
    console.log(todoDatabase.todoLists);
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
    newVersion[index].name = newName;
    todoDatabase.todoLists = newVersion;
}