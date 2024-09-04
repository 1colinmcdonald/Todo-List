import todoDatabase from "./todoStorageInterface";

class Todo {
    constructor(title, description, dueDate, priority, list) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.dateCreated = Date.now();
        this.list = list;
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
    todoDatabase.todoLists;
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
    const task = new Todo(title, description, dueDate, priority, listIndex);
    task.index = todoLists[listIndex].todos.length;
    todoLists[listIndex].todos.push(task);
    todoDatabase.todoLists = todoLists;
    return task
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

export function editTask(oldListIndex, newListIndex, taskIndex, newTitle, newDescription, newDueDate, newPriority) {
    const todoLists = todoDatabase.todoLists;
    oldListIndex = Number(oldListIndex)
    newListIndex = Number(newListIndex)
    taskIndex = Number(taskIndex);
    if (newListIndex !== oldListIndex) {
        todoLists[oldListIndex].todos.splice(taskIndex, 1);
        const task = new Todo(newTitle, newDescription, newDueDate, newPriority, newListIndex);
        task.index = todoLists[newListIndex].todos.length;
        todoLists[newListIndex].todos.push(task);
    } else {
        todoLists[oldListIndex].todos[taskIndex].title = newTitle;
        todoLists[oldListIndex].todos[taskIndex].description = newDescription;
        todoLists[oldListIndex].todos[taskIndex].dueDate = newDueDate;
        todoLists[oldListIndex].todos[taskIndex].priority = newPriority;
    }
    todoDatabase.todoLists = todoLists;
}

export function getTask(listIndex, taskIndex) {
    console.log(`listIndex: ${listIndex}`);
    console.log(`taskIndex: ${taskIndex}`);
    console.log(todoDatabase.todoLists[listIndex].todos);
    return todoDatabase.todoLists[listIndex].todos[taskIndex];
}